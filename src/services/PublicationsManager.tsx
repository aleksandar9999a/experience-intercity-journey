import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { firestore } from '../config/firebase';

// Interfaces
import { IPublication, IGetPublications } from '../interfaces/interfaces';

// Types
import Types from '../Types';

// Managers
import { MessageManager } from './MessageManager';


@injectable()
export class PublicationsManager {
  @inject(Types.MessageManager)
  messageManager!: MessageManager;

  @observable
  isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  private startLoading () {
    this.isLoading = true;
  }

  @action
  private stopLoading () {
    this.isLoading = false;
  }

  @action
  savePublication (data: IPublication) {
    this.startLoading();

    return firestore
      .collection('publications')
      .doc(data.id)
      .set(data)
      .then(res => {
        this.messageManager.addMessage('Successful submited!');

        return res
      })
      .catch(err => {
        this.messageManager.addErrorMessage(err.message);
      })
      .finally(() => {
        this.stopLoading()
      })
  }

  @action
  get (id: string) {
    this.startLoading();

    return firestore
      .collection('publications')
      .doc(id)
      .get()
      .then(doc => {
          if (!doc.exists) {
            return Promise.reject(new Error('Publication is not found!'));
          }

          return doc.data() as IPublication;
      })
      .catch(err => {
        this.messageManager.addErrorMessage(err.message);
      })
      .finally(() => {
        this.stopLoading()
      })
  }

  @action
  getMany ({ search = '', opStr = '>=', searchBy = 'to' }: IGetPublications) {
    this.startLoading();

    return firestore
      .collection('publications')
      .where(searchBy, opStr, search)
      .get()
      .then(snapshot => {
          return snapshot.docs.map(doc => doc.data() as IPublication) as IPublication[];
      })
      .catch(err => {
        this.messageManager.addErrorMessage(err.message);
      })
      .finally(() => {
        this.stopLoading()
      })
  }

  @action
  delete (id: string) {
    return firestore.collection('publications')
      .doc(id)
      .delete()
      .then(res => {
        this.messageManager.addMessage('Successfull deleted!');

        return res;
      })
      .catch(err => {
        this.messageManager.addErrorMessage(err.message);
      })
      .finally(() => {
        this.stopLoading()
      })
  }
}