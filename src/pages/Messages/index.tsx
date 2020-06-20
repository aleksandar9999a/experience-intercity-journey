import React, { useEffect, useState } from 'react';
import { getAllMessages } from '../../services';
import { IonList, IonListHeader, IonPage, IonContent } from '@ionic/react';
import './style.css';
import MessageItem from '../../components/MessageItem';

const Messages: React.FC = () => {
    const [list, setList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const sub = getAllMessages.subscribe(chats => {
            const newList = chats.map(chat => <MessageItem key={chat.id} id={chat.id} members={chat.members} />);
            setList(newList)
        })
        return () => { sub.unsubscribe(); }
    }, [])

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <h2 className="chat-box-title">Messages</h2>
                    </IonListHeader>
                    {list}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Messages;
