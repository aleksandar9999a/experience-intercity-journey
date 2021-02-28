import React from 'react';

// Components
import MessagesList from '../containers/MessagesList';
import {
    IonList,
    IonListHeader,
    IonPage,
    IonContent
} from '@ionic/react';

// Hooks
import { useAllMessages } from '../hooks';


export const Messages: React.FC = () => {
    const messages = useAllMessages();

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <h2 className="chat-box-title">Messages</h2>
                    </IonListHeader>

                    <MessagesList messages={messages}/>
                </IonList>
            </IonContent>
        </IonPage>
    );
};
