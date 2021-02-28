import { auth, firestore } from './../config/firebase';
import IRegistered from '../interfaces/IRegistered';
import IUser from '../interfaces/IUser';

export function submitRegistered(data: IRegistered): Promise<void> {
    return auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            const userdata = {
                uid: res.user?.uid,
                email: data.email,
                city: data.city,
                firstName: data.firstName,
                lastName: data.lastName,
                darkMode: false
            }
            return firestore.collection('users').doc(res.user?.uid).set(userdata);
        })
        .then(res => console.debug('Successful Registered!'))
        .catch(console.debug);
}

export function submitLogin(email: string, password: string): Promise<void | firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password).then(res => console.debug('Successful Login!')).catch(console.debug);
}

export function logOut(): Promise<void> {
    return auth.signOut().then(res => console.debug('Successful Logout!')).catch(console.debug);
}

export function getUserdata(id: string): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
    return firestore.collection('users').doc(id);
}

export function getMultiplyUserdata(users: string[]): Promise<void | IUser[]> {
    return Promise.all(users.map(getUserdata))
        .then(docs => Promise.all(docs.map(doc => doc.get())))
        .then(docs => Promise.all(docs.map(doc => doc.data() as IUser)))
        .catch(console.debug)
}
