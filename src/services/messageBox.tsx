import { BehaviorSubject } from "rxjs";
import IMessageBoxState from "../interfaces/IMessageBoxState";
import uid from "uid";
import { auth, firestore } from './../config/firebase';
import { submitMessage } from "./toast";
import INewMessageBox from "../interfaces/INewMessageBox";

const messageBoxState = new BehaviorSubject<IMessageBoxState>({ isOpen: false, members: [], creatorId: '', id: '' });

export function getMessageBoxState() { return messageBoxState; }
export function closeMessageBox() { return messageBoxState.next({ isOpen: false, members: [], creatorId: '', id: '' }) }

function emitNewBox(data: INewMessageBox) { messageBoxState.next({ isOpen: true, ...data }); }

export function createNewChat(users: string[]) {
    if (!auth.currentUser) { return; }
    const creatorId = auth.currentUser.uid;
    const members = [creatorId, ...users];

    firestore.collection('chat').where('members', '==', members).get()
        .then(docs => {
            docs.forEach(doc => {
                if (doc.exists) {
                    const data = doc.data() as INewMessageBox;
                    emitNewBox(data);
                    return;
                }
                emitNewBox({ id: uid(), members, creatorId });
                return;
            })
        })
        .catch(err => submitMessage(err.message))
}

export function submitMessageBox({ id, members, creatorId, message }: { id: string, members: string[], creatorId: string, message: string }) {
    return firestore.doc(`chat/${id}`).set({ id, members, creatorId })
        .then((res) => {
            const docId = uid();
            return firestore.doc(`chat/${id}/messages/${docId}`).set({ id: docId, creatorId, message, created: new Date() });
        })
        .then(res => {
            submitMessage('Successful sended!');
            return res;
        })
        .catch(err => submitMessage(err.message))
}