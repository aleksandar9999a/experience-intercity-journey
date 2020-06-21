import React, { useEffect, useState } from 'react';
import { IonList, IonSpinner } from '@ionic/react';
import PublicationListItem from '../../components/PublicationListItem';
import IPublication from '../../interfaces/IPublication';
import './style.css';

const PublicationList: React.FC<{ publications: IPublication[], isLoading: boolean }> = ({ publications, isLoading }) => {
    const [list, setList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const newList = publications.map((x, i) => <PublicationListItem key={i} data={x} />);
        setList(newList);
    }, [publications])

    if(isLoading) { return <div className="loading-publications"><IonSpinner className="spinner" /></div>}
    return <IonList>{list}</IonList>;
};

export default PublicationList;
