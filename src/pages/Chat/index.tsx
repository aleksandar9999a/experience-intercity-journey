import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { getChat, getMessages, submitNewMessage } from '../../services';
import IChatItem from '../../interfaces/IChatItem';
import IMessage from '../../interfaces/IMessage';
import { IonList, IonItem, IonInput, IonIcon, IonHeader, IonToolbar, IonTitle, IonPage, IonContent } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import ChatList from '../../containers/ChatList';
import ErrorPage from './../ErrorPage';
import LoadingPage from './../LoadingPage';
import './style.css';

const Chat: React.FC = () => {
    const { id } = useParams()
    const [chatInfo, loadingChatInfo, errChatInfo] = useDocumentData<IChatItem>(getChat(id))
    const [messages, loadingMessages, errMessages] = useCollectionData<IMessage>(getMessages(id));
    const [newMessage, setNewMessage] = useState<string>('');

    function handleNewMessage(e: any) { setNewMessage(e.target.value); }

    function sendMessage() {
        if (newMessage.length === 0) { return; }
        submitNewMessage(id, newMessage).then(() => setNewMessage(''));
    }

    if (loadingChatInfo || loadingMessages) {
        return <LoadingPage isOpen={loadingChatInfo || loadingMessages} />
    }

    if (errChatInfo || errMessages) {
        return <ErrorPage message={(errChatInfo || errMessages)?.message as string} />
    }

    return (
        <IonPage className="chat">
            <IonContent>
                <IonHeader className="chat-header" >
                    <IonToolbar>
                        <IonTitle className="chat-title">Chat Box</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList className="chat-list">
                    <ChatList messages={messages as IMessage[]} members={chatInfo?.members as string[]} />
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
