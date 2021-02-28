import { storage } from "../config/firebase";
import uid from "uid";

function uploadFile(file: File, id: string): firebase.storage.UploadTask { return storage.ref(`images/${id}`).put(file); }
function getURL(shot: firebase.storage.UploadTaskSnapshot): Promise<string> { return shot.ref.getDownloadURL(); }

export function uploadImage(file: File): Promise<string> {
    return uploadFile(file, uid()).then(getURL).catch(console.error)
}