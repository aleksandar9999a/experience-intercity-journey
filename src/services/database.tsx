import { firestore, auth } from "../config/firebase";
import { submitMessage } from "./toast";
import IField from "../interfaces/IField";

export function updateOneField(collection: string, doc: string, field: string, value: string | boolean) {
    return firestore.collection(collection).doc(doc).update({ [field]: value });
}

export function updateOneFieldFromMyProfile(field: string, value: string | boolean) {
    return Promise.all([auth.currentUser])
        .then(([user]) => {
            if (!user) { Promise.reject(new Error('Unauthorized')); return; }
            return updateOneField('users', user.uid, field, value);
        }).catch(err => submitMessage(err.message))
}

export function updateMultiplyFieldsFromMyProfile(fields: IField[]) {
    return Promise
    .all(fields.map(field => updateOneFieldFromMyProfile(field.field, field.value)))
    .then(() => submitMessage('Successful Updated!'))
    .catch(err => submitMessage(err.message))
}