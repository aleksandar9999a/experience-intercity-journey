import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getMessages, submitNewMessage } from '../../services';
import IMessage from '../../interfaces/IMessage';
import { IonList, IonItem, IonInput, IonIcon, IonHeader, IonToolbar, IonTitle, IonPage, IonContent } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import ChatList from '../../containers/ChatList';
import ErrorPage from './../ErrorPage';
import LoadingPage from './../LoadingPage';
import './style.css';

const Chat: React.FC = () => {
    const { id } = useParams()
    const [messages, loadingMessages, errMessages] = useCollectionData<IMessage>(getMessages(id));
    const [newMessage, setNewMessage] = useState<string>('');

    function handleNewMessage(e: any) { setNewMessage(e.target.value); }

    function sendMessage() {
        if (newMessage.length === 0) { return; }
        submitNewMessage(id, newMessage).then(() => setNewMessage(''));
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
                    <ChatList messages={messages as IMessage[]} />
                </IonList>
                <IonItem className="message-input" color="primary">
                    <IonInput type="text" placeholder="Write message!" value={newMessage} onIonChange={handleNewMessage} />
                    <IonIcon md={sendOutline} ios={sendOutline} onClick={sendMessage} />
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Chat;
