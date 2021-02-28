import { firestore } from './../config/firebase';
import IUser from '../interfaces/IUser';


export function getUserdata(id: string): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
    return firestore.collection('users').doc(id);
}

export function getMultiplyUserdata(users: string[]): Promise<void | IUser[]> {
    return Promise.all(users.map(getUserdata))
        .then(docs => Promise.all(docs.map(doc => doc.get())))
        .then(docs => Promise.all(docs.map(doc => doc.data() as IUser)))
        .catch(console.debug)
}
