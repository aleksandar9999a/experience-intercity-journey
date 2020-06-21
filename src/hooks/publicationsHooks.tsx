import { useState, useEffect } from 'react';
import IPublication from '../interfaces/IPublication';
import IGetPublications from '../interfaces/IGetPublications';
import { submitError } from '../services/toast';
import { getPublications, getPublication } from '../services';

interface IPublicationState {
    from?: string,
    to?: string,
    date?: string,
    time?: string,
    type?: string
}

export function usePublication(id: string) {
    let [publication, setPublication] = useState<IPublication | null>(null);
    let [loading, setloading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) { setPublication(null); return; }
        setloading(true);
        getPublication(id).then(doc => {
            if (!doc.exists) { setPublication(null); return; }
            const data = doc.data() as IPublication;
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

export function useAllPublications({ search = '', opStr = '>=', searchBy = 'to' }: IGetPublications) {
    const [publications, setPublication] = useState<IPublication[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchOp, setSearchOp] = useState<IGetPublications>({ search, opStr, searchBy });

    function changeOptions({ search = '', opStr = '>=', searchBy = 'to' }: IGetPublications) {
        setSearchOp({ search, opStr, searchBy })
    }

    useEffect(() => {
        setLoading(true);
        getPublications(searchOp)
            .then(snapshot => {
                const data = snapshot.docs.map(doc => doc.data() as IPublication);
                setPublication(data);
            })
            .catch(submitError)
            .finally(() => setLoading(false));
    }, [searchOp])

    return { publications, loading, changeOptions };
}