import React from 'react';
import { IonItem, IonAvatar, IonLabel } from '@ionic/react';
import assets from '../../config/assets';
import IChatMessage from '../../interfaces/IChatMessage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';


const Message: React.FC<IChatMessage> = ({ chat, user }) => {
    const [iUser, loading, error] = useAuthState(auth);

    if (loading) { return <div className="error-page"> <h1>Loading...</h1> </div> }
    if (error) { return <div className="error-page"> <h1>{error.message}</h1> </div> }

    return (
        <IonItem>
            <IonAvatar slot={iUser?.uid !== user.uid ? 'start' : 'end'}>
                <img src={user.image || assets.anonym} className="chat-img" alt="chat-img" />
            </IonAvatar>
            <IonLabel style={iUser?.uid !== user.uid ? { textAlign: 'left' } : { textAlign: 'right' }}>
                {iUser?.uid !== user.uid && <h5>{user.firstName} {user.lastName}</h5>}
                <h3>{chat.message}</h3>
            </IonLabel>
        </IonItem>
    );
};

export default Message;
