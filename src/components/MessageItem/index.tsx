import React, { useEffect, useState } from 'react';
import { IonItem, IonAvatar, IonLabel, IonSpinner } from '@ionic/react';
import { getUserdata } from '../../services';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { IUser } from '../../interfaces/interfaces';
import assets from '../../config/assets';
import IMessageItem from '../../interfaces/IMessageItem';

const MessageItem: React.FC<IMessageItem> = ({ id, members }) => {
    const [user, loading, error] = useAuthState(auth);
    const [userdata, setUserdate] = useState<IUser>();

    useEffect(() => {
        if (!user) { return; }
        const secondUser = members.find(member => member !== user.uid) as string;
        getUserdata(secondUser).onSnapshot(doc => {
            if (!doc.exists) { return; }
            const data = doc.data() as IUser;
            setUserdate(data);
        })
    }, [user, members])

    if (loading) { return <IonItem><IonSpinner /></IonItem> }
    if (error) { return <IonItem>{error.message}</IonItem> }

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

export default MessageItem;
