import fb from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const fbConfig = {
    apiKey: 'AIzaSyAMEvdXlDDLzzI4IJi60tDv4QFHj6mHf3s',
    authDomain: 'experience-intercity-jouney.firebaseapp.com',
    databaseURL: 'https://experience-intercity-jouney.firebaseio.com',
    projectId: 'experience-intercity-jouney',
    storageBucket: 'experience-intercity-jouney.appspot.com',
    messagingSenderId: '699755951072',
    appId: '1:699755951072:web:8b49294602abd47742b185',
    measurementId: 'G-VFJ6BYFFWY'
}

export const firebase = fb.initializeApp(fbConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();