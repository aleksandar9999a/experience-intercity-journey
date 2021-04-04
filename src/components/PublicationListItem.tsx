import React, { useEffect, useState } from 'react';

// Components
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';

// Interfaces
import { IPublicationListItemProps, IPixabayImage } from '../interfaces/interfaces';


export const PublicationListItem: React.FC<IPublicationListItemProps> = ({ data, pixabayService }) => {
    const [image, setImage] = useState<IPixabayImage>();

    useEffect(() => {
        pixabayService.getImage({ q: data.to })
            .then((res) => {
                if (!res) {
                    return;
                }

                setImage(res.data.hits[0])
            })
    }, [data.to, data.date])

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

                <IonLabel>Date: {new Date(data.date).toLocaleDateString()}</IonLabel>
            </IonLabel>
        </IonItem>
    );
};
