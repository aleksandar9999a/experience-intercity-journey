import { useState, useEffect } from 'react';
import IUser from '../interfaces/IUser';
import { getMultiplyUserdata } from '../services';
import { auth, firestore } from '../config/firebase';

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

    useEffect(() => {
        if (users.length === 0) { return; }
        getMultiplyUserdata(users).then(usersdata => {
            if (!usersdata) { return; }
            setUsersdata(usersdata)
        })
    }, [users])

    return usersdata
}