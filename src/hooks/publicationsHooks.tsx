import { useState, useEffect } from 'react';
import IPublication from '../interfaces/IPublication';
import IGetPublications from '../interfaces/IGetPublications';
import { getPublications, getPublication } from '../services';
import IPublicationState from '../interfaces/IPublicationState';
import IUsePublication from '../interfaces/IUsePublication';
import IUseAllPublications from '../interfaces/IUseAllPublications';
import { auth } from '../config/firebase';

export function usePublication(id: string): IUsePublication {
    let [publication, setPublication] = useState<IPublication | null>(null);
    let [loading, setloading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) { setPublication(null); return; }
        setloading(true);
        getPublication(id).then(data => {
            if (!data) { return; }
            setPublication(data);
        }).finally(() => setloading(false));
    }, [id])

    function setParams(type: IPublicationState) {
        if (!publication) { return; }
        let data = { ...publication, ...type };
        setPublication(data)
    }

    return { publication, loading, setParams };
}

export function useAllPublications({ search = '', opStr = '>=', searchBy = 'to' }: IGetPublications): IUseAllPublications {
    const [publications, setPublication] = useState<IPublication[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchOp, setSearchOp] = useState<IGetPublications>({ search, opStr, searchBy });

    function changeOptions({ search = '', opStr = '>=', searchBy = 'to' }: IGetPublications) {
        setSearchOp({ search, opStr, searchBy })
    }

    useEffect(() => {
        setLoading(true);
        getPublications(searchOp)
            .then(data => {
                if (!data) { return; }
                setPublication(data);
            })
            .finally(() => setLoading(false));
    }, [searchOp])

    return { publications, loading, changeOptions };
}

export function useMyPublications() {
    const [publications, setPublication] = useState<IPublication[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) { return; }
        setLoading(true);
        getPublications({ searchBy: 'creatorId', opStr: '==', search: user.uid })
            .then(data => {
                if (!data) { return; }
                setPublication(data);
            })
            .finally(() => setLoading(false));
    }, [])

    return { publications, loading };
}