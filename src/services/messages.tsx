import { auth, firestore } from "../config/firebase";
import { Observable } from "rxjs";
import IChatItem from "../interfaces/IChatItem";
import uid from "uid";
import { submitError } from "./toast";


export const getAllMessages = new Observable<IChatItem[]>(sub => {
    Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { Promise.reject(new Error('Unauthorized')); return; }
            firestore.collection('chat')
                .where('members', 'array-contains-any', [user.uid])
                .onSnapshot(snapshot => {
                    let newData = snapshot.docs.map(doc => doc.data() as IChatItem);
                    sub.next(newData);
                })
        })
        .catch(err => sub.error(err))
})

export function getChat(id: string) {
    return firestore.collection('chat').doc(id);
}

export function getMessages(id: string) {
    return firestore.collection('chat').doc(id).collection('messages').orderBy('created');
}

export function submitNewMessage(id: string, message: string) {
    return Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { return Promise.reject(new Error('Unauthorized')) }
            const docId = uid();
            return firestore.collection(`chat/${id}/messages`).doc(docId).set({ id: docId, creatorId: user.uid, message, created: new Date() })
        }).catch(submitError)
}
