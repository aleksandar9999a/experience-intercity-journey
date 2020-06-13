import { BehaviorSubject } from 'rxjs';
import IToastStore from '../interfaces/IToastStore';

const toastStore = new BehaviorSubject<IToastStore>({ isOpen: false, message: '' });

export function getToastStore() { return toastStore; }
export function close() { return toastStore.next({ isOpen: false, message: '' }); }
export function submitMessage(message: string) { toastStore.next({ isOpen: true, message }); }
