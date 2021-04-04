import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

// Components
import { MessageItem } from '../components/MessageItem';
import {
    IonList,
    IonListHeader,
    IonPage,
    IonContent
} from '@ionic/react';

// Interfaces
import { IMessagesProps, IChatItem } from '../interfaces/interfaces';


export const Messages = observer(({ userService, chatService }: IMessagesProps) => {
    const [messages, setMessages] = useState<IChatItem[]>([]);

    useEffect(() => {
        if (!userService.user) {
            return;
        }

        chatService.getMessages()
            .then(items => {
                setMessages(items)
            })
    }, [userService.user])
    
    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <h2 className="chat-box-title">Messages</h2>
                    </IonListHeader>

                    <div>
                        {messages.map(chat => {
                            return <MessageItem key={chat.id} id={chat.id} members={chat.members} userService={userService} />
                        })}
                    </div>
                </IonList>
            </IonContent>
        </IonPage>
    );
})
