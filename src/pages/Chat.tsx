import React, { useState } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';

// Hooks
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Interfaces
import { IChatProps, IChatMessage } from '../interfaces/interfaces';

// Components
import ChatList from '../containers/ChatList';
import { ErrorPage } from './ErrorPage';
import { LoadingPage } from './LoadingPage';
import {
    IonList,
    IonItem,
    IonInput,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent
} from '@ionic/react';

// Icons
import { sendOutline } from 'ionicons/icons';


export const Chat = observer(({ chatManager }: IChatProps) => {
    const { id } = useParams<any>()
    const [messages, loadingMessages, errMessages] = useCollectionData<IChatMessage>(chatManager.getChat(id));
    const [newMessage, setNewMessage] = useState<string>('');

    function handleNewMessage(e: any) {
        setNewMessage(e.target.value);
    }

    function sendMessage() {
        if (newMessage.length === 0) {
            return;
        }

        return chatManager.sendMessage(id, newMessage)
            .then(_ => {
                setNewMessage('');
            })
    }

    if (loadingMessages) {
        return <LoadingPage isOpen={loadingMessages} />
    }

    if (errMessages) {
        return <ErrorPage message={errMessages.message as string} />
    }

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle className="chat-title">Chat Box</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList className="chat-list">
                    <ChatList messages={messages as IChatMessage[]} />
                </IonList>

                <IonItem className="message-input" color="primary">
                    <IonInput type="text" placeholder="Write message!" value={newMessage} onIonChange={handleNewMessage} />

                    <IonIcon md={sendOutline} ios={sendOutline} onClick={sendMessage} />
                </IonItem>
            </IonContent>
        </IonPage>
    );
})
