import { auth, firestore } from './../config/firebase';
import IPublication from '../interfaces/IPublication';
import uid from 'uid';
import { submitMessage } from './toast';
import IGetPublications from '../interfaces/IGetPublications';

export function setPublication(data: IPublication) {
    let newData = { ...data };
    return Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { return Promise.reject(new Error('You must be registered to share posts!')); }
            if (newData.creatorId && user.uid !== newData.creatorId) { return Promise.reject(new Error('This is not your post!')); }
            if (!newData.id || !newData.creatorId) { newData.id = uid(); newData.creatorId = user.uid; }
            return firestore.collection('publications').doc(newData.id).set(newData);
        })
        .then(res => submitMessage('Successful created!'))
        .catch(err => submitMessage(err.message));
}

export function getPublications({ to = '' }: IGetPublications) {
    return firestore.collection('publications').where('to', ">=", to).get();
}