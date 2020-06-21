import { useState, useEffect } from 'react';
import IPublication from '../interfaces/IPublication';
import { firestore } from '../config/firebase';

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