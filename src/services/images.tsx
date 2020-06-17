import { storage } from "../config/firebase";
import { submitMessage } from "./toast";
import uid from "uid";

function uploadFile(file: File, id: string) { return storage.ref(`images/${id}`).put(file); }
function getURL(shot: firebase.storage.UploadTaskSnapshot) {  return shot.ref.getDownloadURL(); }

export function uploadImage(file: File) {
    const id = uid();
    return uploadFile(file, id).then(getURL).catch(err => submitMessage(err.message))
}