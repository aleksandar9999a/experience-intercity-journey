import { auth, firestore } from './../config/firebase';
import IPublication from '../interfaces/IPublication';
import uid from 'uid';
import { submitMessage, submitError } from './toast';
import IGetPublications from '../interfaces/IGetPublications';

export function setPublication(data: IPublication): Promise<void> {
    let newData = { ...data };
    return Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { return Promise.reject(new Error('You must be registered to share posts!')); }
            if (newData.creatorId && user.uid !== newData.creatorId) { return Promise.reject(new Error('This is not your post!')); }
            if (!newData.id || !newData.creatorId) { newData.id = uid(); newData.creatorId = user.uid; }
            return firestore.collection('publications').doc(newData.id).set(newData);
        })
        .then(res => submitMessage('Successful submited!'))
        .catch(submitError);
}

export function deletePublication(id: string): Promise<void> {
    return firestore.collection('publications').doc(id).delete()
        .then(res => submitMessage('Successfull deleted!'))
        .catch(submitError);
}

export function getPublications({ search = '', opStr = '>=', searchBy = 'to' }: IGetPublications): Promise<void | IPublication[]> {
    return firestore
        .collection('publications')
        .where(searchBy, opStr, search)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => doc.data() as IPublication);
        })
        .catch(submitError);
}

export function getPublication(id: string): Promise<void | IPublication | null> {
    return firestore
    .collection('publications')
    .doc(id)
    .get()
    .then(doc => {
        if (!doc.exists) { return null; }
        return doc.data() as IPublication;
    })
    .catch(submitError);
}