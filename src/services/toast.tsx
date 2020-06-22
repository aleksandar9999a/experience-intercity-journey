import { BehaviorSubject } from 'rxjs';
import IToastStore from '../interfaces/IToastStore';

const toastStore = new BehaviorSubject<IToastStore>({ isOpen: false, message: '' });

export function getToastStore(): BehaviorSubject<IToastStore> { return toastStore; }
export function close(): void { return toastStore.next({ isOpen: false, message: '' }); }
export function submitMessage(message: string): void { toastStore.next({ isOpen: true, message }); }
export function submitError({ message }: { message: string }): void { toastStore.next({ isOpen: true, message }); }
