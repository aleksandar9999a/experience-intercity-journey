import React, { useEffect, useState } from 'react';
import { IonItem, IonAvatar, IonLabel } from '@ionic/react';
import IChatItem from '../../interfaces/IChatItem';
import { getImageByPlace } from '../../services';


const ChatItem: React.FC<{ data: IChatItem }> = ({ data }) => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        if (!data) { return; }
        getImageByPlace(data.to).then(res => {
            if (!res) { return; }
            setImage(res.data.hits[0].previewURL);
        })
    }, [data])

    return (
        <IonItem routerLink={`/chat/${data.id}`}>
            <IonAvatar slot="start">
                {!!image && <img src={image} className="chat-img" alt="chat-img" />}
            </IonAvatar>
            <IonLabel>
                <h2>{data.firstName} {data.lastName}</h2>
                <h3>To: {data.to}</h3>
            </IonLabel>
        </IonItem>
    );
};

export default ChatItem;
