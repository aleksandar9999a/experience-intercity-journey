import { BehaviorSubject } from "rxjs";
import IMessageBoxState from "../interfaces/IMessageBoxState";
import uid from "uid";
import { auth, firestore } from './../config/firebase';
import { submitMessage } from "./toast";
import IChatItem from "../interfaces/IChatItem";
import ISubmitMessage from "../interfaces/ISubmitMessage";
import IOpenMessageBox from "../interfaces/IOpenMessageBox";


const defaultState: IMessageBoxState = {
    isOpen: false,
    members: [],
    creatorId: '',
    id: '',
    firstName: '',
    lastName: '',
    to: ''
}

const messageBoxState = new BehaviorSubject<IMessageBoxState>(defaultState);

export function getMessageBoxState() { return messageBoxState; }
export function closeMessageBox() { return messageBoxState.next(defaultState) }

function submitChat(data: IChatItem) {
    messageBoxState.next({ ...data, isOpen: true });
}

export function openMessageBox(data: IOpenMessageBox) {
    if (!auth.currentUser) { return; }

    const creatorId = auth.currentUser.uid;
    const members = [creatorId, ...data.members];

    firestore.collection('chat').where('members', '==', members).get()
        .then(snapshot => {
            if (snapshot.docs.length === 0) {
                submitChat({ id: uid(), ...data, members, creatorId });
                return;
            }

            submitChat(snapshot.docs[0].data() as IChatItem);
            return;
        })
        .catch(err => submitMessage(err.message))
}

export function submitMessageBox({ id, members, creatorId, message, firstName, lastName, to }: ISubmitMessage) {
    return firestore.doc(`chat/${id}`).set({ id, members, creatorId, firstName, lastName, to })
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