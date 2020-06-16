import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import IPublication from '../../interfaces/IPublication';
import './style.css';
import { getImageByPlace } from '../../services';
import IPixabayImage from '../../interfaces/IPixabayImage';

const PublicationListItem: React.FC<{ data: IPublication }> = ({ data }) => {
    const [date, setDate] = useState<string>('');
    const [image, setImage] = useState<IPixabayImage>();

    useEffect(() => { setDate(new Date(data.date).toLocaleDateString()); }, [data.date])
    useEffect(() => {
        getImageByPlace(data.to).then((res) => {
            if (!res) { return; }
            setImage(res.data.hits[0])
        })
    }, [data.to])

    return (
        <IonItem routerLink={`/details/${data.id}`}>
            <div className="list-item-first">
                {!!image && <img src={image?.previewURL} className="list-item-preview-img" alt="preview-img" />}
            </div>
            <div className="list-item-second">
                <IonLabel>From: {data.from}</IonLabel>
                <IonLabel>To: {data.to}</IonLabel>
            </div>
            <div className="list-item-third">
                <IonLabel>Type: {data.type}</IonLabel>
                <IonLabel>Date: {date}</IonLabel>
            </div>
        </IonItem>
    );
};

export default PublicationListItem;
