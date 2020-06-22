import React, { useEffect, useState } from 'react';
import { IonList } from '@ionic/react';
import PublicationListItem from '../../components/PublicationListItem';
import IPublicationList from '../../interfaces/IPublicationList';

const PublicationList: React.FC<IPublicationList> = ({ publications }) => {
    const [list, setList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const newList = publications.map(x => <PublicationListItem key={x.id} data={x} />);
        setList(newList);
    }, [publications])

    return <IonList>{list}</IonList>;
};

export default PublicationList;
