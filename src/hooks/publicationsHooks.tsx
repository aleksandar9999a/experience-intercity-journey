import { useState, useEffect } from 'react';
import IPublication from '../interfaces/IPublication';
import { firestore } from '../config/firebase';
import IGetPublications from '../interfaces/IGetPublications';
import { submitError } from '../services/toast';

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
        firestore.collection('publications').doc(id).get().then(doc => {
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
    const [searchOp, setSearchOp] = useState<IGetPublications>({ search, opStr, searchBy });

    function changeOptions({ search = '', opStr = '>=', searchBy = 'to' }: IGetPublications) {
        setSearchOp({ search, opStr, searchBy })
    }

    useEffect(() => {
        firestore.collection('publications')
            .where(searchOp.searchBy as string, searchOp.opStr as any, searchOp.search as string)
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(doc => doc.data() as IPublication);
                setPublication(data);
            })
            .catch(submitError);
    }, [searchOp])

    return { publications, changeOptions };
}