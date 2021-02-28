import { auth, firestore } from "../config/firebase";
import uid from "uid";
import IChat from "../interfaces/IChat";

export function getMessages(id: string): firebase.firestore.Query<firebase.firestore.DocumentData> {
    return firestore.collection('chat').doc(id).collection('messages').orderBy('created');
}

export function submitNewMessage(id: string, message: string): Promise<void> {
    const created = new Date();
    return Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { return Promise.reject(new Error('Unauthorized')) }
            const docId = uid();
            return firestore.doc(`chat/${id}/messages/${docId}`).set({ id: docId, creatorId: user.uid, message, created })
        })
        .then(res => {
            // return updateOneField('chat', id, 'lastUpdate', created);
        })
        .catch(console.error)
}

function createNewChat(members: string[]): Promise<IChat | void> {
    return Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { return Promise.reject(new Error('Unauthorized')) };
            return { id: uid(), creatorId: user.uid, members, lastUpdate: new Date() }
        })
        .then(data => {
            return Promise.all([firestore.doc(`chat/${data.id}`).set(data), data]);
        })
        .then(([_, data]) => {
            return data;
        })
        .catch(console.error)
}

export function openChatByMembers(members: string[]): Promise<IChat | void> {
    return firestore.collection('chat').where('members', 'in', [[members[0], members[1]], [members[1], members[0]]]).get()
        .then(shot => {
            if (shot.docs.length === 0) { return createNewChat(members); }
            return shot.docs[0].data() as IChat;
        })
}