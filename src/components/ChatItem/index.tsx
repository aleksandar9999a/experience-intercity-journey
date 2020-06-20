import React from 'react';
import { IonItem, IonAvatar, IonLabel } from '@ionic/react';
import assets from '../../config/assets';
import IChatMessage from '../../interfaces/IChatMessage';

const ChatItem: React.FC<IChatMessage> = ({ chat, user, slot }) => {
    return (
        <IonItem>
            <IonAvatar slot={slot}>
                <img src={user.image || assets.anonym} className="chat-img" alt="chat-img" />
            </IonAvatar>
            <IonLabel style={slot === 'start' ? { textAlign: 'left' } : { textAlign: 'right' }}>
                {slot === 'start' && <h5>{user.firstName} {user.lastName}</h5>}
                <h3>{chat.message}</h3>
            </IonLabel>
        </IonItem>
    );
};

export default ChatItem;
