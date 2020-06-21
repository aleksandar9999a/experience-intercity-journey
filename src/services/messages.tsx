import { auth, firestore } from "../config/firebase";
import uid from "uid";
import { submitError } from "./toast";
import { updateOneField } from "./database";

export function getChat(id: string) {
    return firestore.collection('chat').doc(id);
}

export function getMessages(id: string) {
    return firestore.collection('chat').doc(id).collection('messages').orderBy('created');
}

export function submitNewMessage(id: string, message: string) {
    const created = new Date();
    return Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { return Promise.reject(new Error('Unauthorized')) }
            const docId = uid();
            return firestore.doc(`chat/${id}/messages/${docId}`).set({ id: docId, creatorId: user.uid, message, created })
        })
        .then(res => {
            return updateOneField('chat', id, 'lastUpdate', created);
        })
        .catch(submitError)
}

function createNewChat(members: string[]) {
    return Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { return Promise.reject(new Error('Unauthorized')) };
            return { id: uid(), creatorId: user.uid, members, lastUpdate: new Date() }
        })
        .then(data => {
            return Promise.all([firestore.doc(`chat/${data.id}`).set(data), data]);
        })
        .then(([promise, data]) => {
            return data;
        })
        .catch(submitError)
}

export function openChatByMembers(members: string[]) {
    return firestore.collection('chat').where('members', 'in', [[members[0], members[1]], [members[1], members[0]]]).get()
        .then(shot => {
            if (shot.docs.length === 0) { return createNewChat(members); }
            return shot.docs[0].data();
        })
}