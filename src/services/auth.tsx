import { auth, firestore } from './../config/firebase';
import IRegistered from '../interfaces/IRegistered';
import { submitMessage, submitError } from './toast';
import IUser from '../interfaces/IUser';

export function submitRegistered(data: IRegistered) {
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
        .then(res => submitMessage('Successful Registered!'))
        .catch(submitError);
}

export function submitLogin(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password).then(res => submitMessage('Successful Login!')).catch(submitError);
}

export function logOut() {
    return auth.signOut().then(res => submitMessage('Successful Logout!')).catch(submitError);
}

export function getUserdata(id: string) {
    return firestore.collection('users').doc(id);
}

export function getMultiplyUserdata(users: string[]) {
    return Promise.all(users.map(getUserdata))
        .then(docs => Promise.all(docs.map(doc => doc.get())))
        .then(docs => Promise.all(docs.map(doc => doc.data() as IUser)))
        .catch(submitError)
}