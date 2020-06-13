import { auth, firestore } from './../config/firebase';
import IRegistered from '../interfaces/IRegistered';
import { submitMessage } from './toast';

export function submitRegistered(data: IRegistered) {
    return auth.createUserWithEmailAndPassword(data.email, data.password).then((res) => {
        const userdata = {
            email: data.email,
            city: data.city,
            firstName: data.firstName,
            lastName: data.lastName
        }
        return firestore().collection('users').doc(res.user?.uid).set(userdata);
    }).catch(err => submitMessage(err.message));
}

export function submitLogin(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password).catch(err => submitMessage(err.message));
}

export function logOut() {
    return auth.signOut().catch(err => submitMessage(err.message));
}