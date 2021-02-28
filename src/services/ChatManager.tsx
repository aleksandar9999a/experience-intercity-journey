import { injectable, inject } from 'inversify';
import { action, makeObservable } from 'mobx';
import { firestore } from './../config/firebase';
import { v4 as uuidv4 } from 'uuid';

// Types
import Types from '../Types';

// Managers
import { MessageManager } from './MessageManager';
import { AuthManager } from './AuthManager';

// Interfaces
import { IChatItem, IChat } from '../interfaces/interfaces';


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
  createChat (members: string[]) {
    const chat = {
      id: uuidv4(),
      creatorId: this.authManager.user!.uid,
      members,
      lastUpdate: new Date()
    }

    return firestore
      .doc(`chat/${chat.id}`)
      .set(chat)
      .then(_ => {
        return chat;
      })
  }

  @action
  openChatByMembers (members: string[]) {
    return firestore
      .collection('chat')
      .where('members', 'in', [[members[0], members[1]], [members[1], members[0]]])
      .get()
      .then(shot => {
        if (shot.docs.length === 0) {
          return this.createChat(members);
        }

        return shot.docs[0].data() as IChat;
      })
  }

  @action
  sendMessage (id: string, message: string) {
    const newMessage = {
      id: uuidv4(),
      creatorId: this.authManager.user!.uid,
      message,
      created: new Date()
    }

    return firestore
      .doc(`chat/${id}/messages/${newMessage.id}`)
      .set(newMessage)
      .then(data => {
        return newMessage;
      })
  }

  @action
  getChat (id: string) {
    return firestore
      .collection('chat')
      .doc(id)
      .collection('messages')
      .orderBy('created');
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