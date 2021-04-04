import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

// Interfaces
import { IMessage } from '../interfaces/interfaces';


@injectable()
export class MessageService {
  duration = 3000;

  @observable
  messages: IMessage[] = [];

  constructor () {
    makeObservable(this);
  }

  @action
  remove (id: string | number) {
    let oldMessage: IMessage | null = null;

    this.messages = this.messages.reduce((acc: IMessage[], message: IMessage) => {
      if (message.id === id) {
        oldMessage = message;
      } else {
        acc.push(message);
      }

      return acc
    }, [])

    return oldMessage;
  }

  @action
  private add (message: string, type: 'danger' | 'warning' | 'success' | '') {
    const notification = {
      id: uuidv4(),
      type,
      message
    }

    this.messages = [...this.messages, notification];
    return { ...notification }
  }

  @action
  addErrorMessage (message: string) {
    return this.add(message, 'danger');
  }

  @action
  addWarningMessage (message: string) {
    return this.add(message, 'warning');
  }

  @action
  addMessage (message: string) {
    return this.add(message, 'success');
  }
}