import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';
import IPublication from '../../interfaces/IPublication';
import { getImageByPlace } from '../../services';
import IPixabayImage from '../../interfaces/IPixabayImage';

const PublicationListItem: React.FC<{ data: IPublication }> = ({ data }) => {
    const [date, setDate] = useState<string>('');
    const [image, setImage] = useState<IPixabayImage>();

    useEffect(() => {
        setDate(new Date(data.date).toLocaleDateString());
    }, [data.date])

    useEffect(() => {
        getImageByPlace(data.to).then((res) => {
            if (!res) { return; }
            setImage(res.data.hits[0])
        })
    }, [data.to])

    return (
        <IonItem routerLink={`/details/${data.id}`}>
            <IonAvatar slot="start">
                {!!image && <img src={image.previewURL} alt="preview-img" />}
            </IonAvatar>
            <IonLabel>
                <IonLabel>From: {data.from}</IonLabel>
                <IonLabel>To: {data.to}</IonLabel>
            </IonLabel>
            <IonLabel>
                <IonLabel>Type: {data.type}</IonLabel>
                <IonLabel>Date: {date}</IonLabel>
            </IonLabel>
        </IonItem>
    );
};

export default PublicationListItem;
