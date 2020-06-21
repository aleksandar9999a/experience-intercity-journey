import { useState, useEffect } from 'react';
import { auth, firestore } from '../config/firebase';
import IChatItem from '../interfaces/IChatItem';

export function useAllMessages() {
    const [messages, setMessages] = useState<IChatItem[] | null>();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) { setMessages(null); return; }
            firestore.collection('chat')
                .where('members', 'array-contains-any', [user.uid])
                .orderBy('lastUpdate', 'desc')
                .onSnapshot(snapshot => {
                    const newData = snapshot.docs.map(doc => doc.data() as IChatItem);
                    setMessages(newData);
                })
        })
    }, [])

    return messages
}