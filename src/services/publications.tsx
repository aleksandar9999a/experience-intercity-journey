import { auth, firestore } from './../config/firebase';
import IPublication from '../interfaces/IPublication';
import uid from 'uid';
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
        .then(res => console.debug('Successful submited!'))
        .catch(console.error);
}

export function deletePublication(id: string): Promise<void> {
    return firestore.collection('publications').doc(id).delete()
        .then(res => console.debug('Successfull deleted!'))
        .catch(console.error);
}

export function getPublications({ search = '', opStr = '>=', searchBy = 'to' }: IGetPublications): Promise<void | IPublication[]> {
    return firestore
        .collection('publications')
        .where(searchBy, opStr, search)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => doc.data() as IPublication);
        })
        .catch(console.error);
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
    .catch(console.error);
}