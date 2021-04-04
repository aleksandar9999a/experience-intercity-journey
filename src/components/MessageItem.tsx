import React, { useEffect, useState } from 'react';

// Components
import { IonItem, IonAvatar, IonLabel } from '@ionic/react';

// Interfaces
import { IUser, IMessageItem } from '../interfaces/interfaces';

// Assets
import assets from '../config/assets';


export const MessageItem: React.FC<IMessageItem> = ({ id, members, userService }) => {
    const [userdata, setUserdate] = useState<IUser>();

    useEffect(() => {
        if (!userService.user) {
            return;
        }

        const secondUser = members.find(member => member !== userService.user!.uid) as string;

        userService.getUserdata(secondUser)
            .then(data => {
                setUserdate(data);
            })
    }, [userService.user, members])

    return (
        <IonItem routerLink={`/chat/${id}`}>
            <IonAvatar slot="start">
                {userdata && <img src={userdata.image || assets.anonym} className="chat-img" alt="chat-img" />}
            </IonAvatar>

            <IonLabel>
                {userdata && <h2>{userdata.firstName} {userdata.lastName}</h2>}
            </IonLabel>
        </IonItem>
    );
};
