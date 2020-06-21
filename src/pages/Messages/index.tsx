import React from 'react';
import { IonList, IonListHeader, IonPage, IonContent } from '@ionic/react';
import { useAllMessages } from '../../hooks';
import MessagesList from '../../containers/MessagesList';
import './style.css';

const Messages: React.FC = () => {
    const messages = useAllMessages();

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <h2 className="chat-box-title">Messages</h2>
                    </IonListHeader>
                    <MessagesList messages={messages || []}/>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Messages;
