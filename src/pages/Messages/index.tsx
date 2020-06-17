import React, { useEffect, useState } from 'react';
import { getAllMessages } from '../../services';
import { IonList, IonListHeader } from '@ionic/react';
import ChatItem from '../../components/ChatItem';
import './style.css';


const Messages: React.FC = () => {
    const [list, setList] = useState<JSX.Element[]>([]);
    useEffect(() => {
        const sub = getAllMessages.subscribe(chats => {
            const newList = chats.map(chat => <ChatItem key={chat.id} data={chat} />);
            setList(newList)
        })

        return () => { sub.unsubscribe(); }
    }, [])
    return (
        <IonList>
            <IonListHeader>
                <h2 className="chat-box-title">Chat Box</h2>
            </IonListHeader>
            {list}
        </IonList>
    );
};

export default Messages;
