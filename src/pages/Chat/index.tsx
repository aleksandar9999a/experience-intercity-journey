import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { getChat, getMessages, getMultiplyUserdata, submitNewMessage } from '../../services';
import IUser from '../../interfaces/IUser';
import IChatItem from '../../interfaces/IChatItem';
import IMessage from '../../interfaces/IMessage';
import { IonList, IonListHeader, IonLoading, IonItem, IonInput, IonIcon } from '@ionic/react';
import Message from '../../components/Message';
import './style.css';
import { sendOutline } from 'ionicons/icons';


const Chat: React.FC = () => {
    const { id } = useParams()
    const [chatInfo, loadingChatInfo, errChatInfo] = useDocumentData<IChatItem>(getChat(id))
    const [messages, loadingMessages, errMessages] = useCollectionData<IMessage>(getMessages(id));
    const [users, setUsers] = useState<IUser[]>([]);
    const [list, setList] = useState<JSX.Element[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        if (!chatInfo) { return; }
        getMultiplyUserdata(chatInfo.members).then(usersdata => {
            if (!usersdata) { return; }
            setUsers(usersdata)
        })
    }, [chatInfo])

    useEffect(() => {
        if (!messages || users.length < 2) { return; }
        const newList = messages.map(x => <Message key={x.id} chat={x} user={users.find(y => y.uid === x.creatorId) as IUser} />)
        setList(newList);
    }, [messages, users])

    function handleNewMessage(e: any) { setNewMessage(e.target.value); }

    function sendMessage() {
        if(newMessage.length === 0) { return; }
        submitNewMessage(id, newMessage).then(() => setNewMessage(''));
    }

    if (loadingChatInfo || loadingMessages) {
        return <IonLoading isOpen={loadingChatInfo || loadingMessages} message={'Please wait...'} />
    }

    if (errChatInfo || errMessages) {
        return <div className="error-page"> <h1>{(errChatInfo || errMessages)?.message}</h1> </div>
    }

    return (
        <IonList className="chat">
            <IonListHeader>
                <h2 className="chat-box-title">Chat</h2>
            </IonListHeader>
            <div>
                {list}
            </div>
            <IonItem className="message-input" color="primary">
                <IonInput type="text" placeholder="Write message!" value={newMessage} onIonChange={handleNewMessage} />
                <IonIcon md={sendOutline} ios={sendOutline} onClick={sendMessage}/>
            </IonItem>
        </IonList>
    );
};

export default Chat;
