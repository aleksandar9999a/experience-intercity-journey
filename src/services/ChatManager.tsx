import { injectable, inject } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { firestore } from './../config/firebase';
import { v4 as uuidv4 } from 'uuid';

// Types
import Types from '../Types';

// Managers
import { MessageManager } from './MessageManager';
import { AuthManager } from './AuthManager';

// Interfaces
import { IChatItem } from '../interfaces/interfaces';


@injectable()
export class ChatManager {
  @inject(Types.MessageManager)
  messageManager!: MessageManager;

  @inject(Types.AuthManager)
  authManager!: AuthManager;

  constructor () {
    makeObservable(this);
  }

  @action
  getMessages () {
    return firestore.collection('chat')
      .where('members', 'array-contains-any', [this.authManager.user!.uid])
      .orderBy('lastUpdate', 'desc')
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => doc.data() as IChatItem);
      })
  }
}