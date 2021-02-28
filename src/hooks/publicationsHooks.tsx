import { useState, useEffect } from 'react';
import IPublication from '../interfaces/IPublication';
import { getPublication } from '../services';
import IPublicationState from '../interfaces/IPublicationState';
import IUsePublication from '../interfaces/IUsePublication';

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
