import { injectable, inject } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { BehaviorSubject } from 'rxjs';
import IRegistered from '../interfaces/IRegistered';
import Types from '../Types';
import { auth, firestore } from './../config/firebase';
import { MessageManager } from './MessageManager';


@injectable()
export class AuthManager {
  @observable
  isAuth: boolean = false;

  @observable
  user: firebase.User | null = null;

  userObserver = new BehaviorSubject<firebase.User | null>(null)

  @inject(Types.MessageManager)
  messageManager!: MessageManager;

  constructor () {
    makeObservable(this);

    auth.onAuthStateChanged(user => {
      this.authChange(user);
    })
  }

  @action
  authChange (user: firebase.User | null) {
    this.isAuth = !!user;
    this.user = user
    this.userObserver.next(user);
  }

  @action
  registered (data: IRegistered) {
    return auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            const userdata = {
                uid: res.user?.uid,
                email: data.email,
                city: data.city,
                firstName: data.firstName,
                lastName: data.lastName,
                darkMode: false
            }

            return firestore.collection('users').doc(res.user?.uid).set(userdata);
        })
        .then(res => {
          this.messageManager.addMessage('Successful Registered!');

          return res;
        })
        .catch(err => {
          this.messageManager.addErrorMessage(err.message);

          return err;
        });
  }

  @action
  login (email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.messageManager.addMessage('Successful Login!');

        return res;
      })
      .catch(err => {
        this.messageManager.addErrorMessage(err.message);

        return err;
      });
  }

  @action
  logout () {
    return auth.signOut()
      .then(res => {
        this.messageManager.addMessage('Successful Logout!');

        return res;
      })
      .catch(err => {
        this.messageManager.addErrorMessage(err.message);

        return err;
      });
  }
}