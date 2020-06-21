import { useState, useEffect } from 'react';
import IUser from '../interfaces/IUser';
import { getMultiplyUserdata } from '../services';
import { auth, firestore } from '../config/firebase';
import { submitError } from '../services/toast';

export function useMyUserData() {
    const [userdata, setUserdata] = useState<IUser | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) { setUserdata(null); return; }
            firestore.collection('users').doc(user.uid).onSnapshot(doc => {
                if (!doc.exists) { setUserdata(null); }
                setUserdata(doc.data() as IUser);
            })
        });
    }, [])

    return userdata;
}

export function useMultipleUserdata(users: string[]) {
    const [usersdata, setUsersdata] = useState<IUser[]>([]);
    const [listOfUsers ] = useState<string[]>(users);

    useEffect(() => {
        if (listOfUsers.length === 0) { return; }
        getMultiplyUserdata(listOfUsers)
            .then(data => {
                if (!data) { return; }
                setUsersdata(data);
            })
            .catch(submitError)
    }, [listOfUsers])

    return { usersdata, }
}