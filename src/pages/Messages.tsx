import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

// Components
import MessagesList from '../containers/MessagesList';
import {
    IonList,
    IonListHeader,
    IonPage,
    IonContent
} from '@ionic/react';

// Interfaces
import { IMessagesProps, IChatItem } from '../interfaces/interfaces';


export const Messages = observer(({ authManager, chatManager }: IMessagesProps) => {
    const [messages, setMessages] = useState<IChatItem[]>([]);

    useEffect(() => {
        if (!authManager.user) {
            return;
        }

        chatManager.getMessages()
            .then(items => {
                setMessages(items)
            })
    }, [authManager.user])
    
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
})
