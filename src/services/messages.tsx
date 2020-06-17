import { auth, firestore } from "../config/firebase";
import { Observable } from "rxjs";
import IChatItem from "../interfaces/IChatItem";


export const getAllMessages = new Observable<IChatItem[]>(sub => {
    Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { Promise.reject(new Error('Unauthorized')); return; }
            firestore.collection('chat')
                .where('members', 'array-contains-any', [user.uid])
                .onSnapshot(snapshot => {
                    let newData = snapshot.docs.map(doc => doc.data() as IChatItem);
                    sub.next(newData);
                })
        })
        .catch(err => sub.error(err))
})
