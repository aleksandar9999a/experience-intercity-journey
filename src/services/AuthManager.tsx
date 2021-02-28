import { injectable, inject } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { BehaviorSubject } from 'rxjs';
import IRegistered from '../interfaces/IRegistered';
import { IUser } from '../interfaces/interfaces';
import Types from '../Types';
import { auth, firestore } from './../config/firebase';
import { MessageManager } from './MessageManager';


@injectable()
export class AuthManager {
  @observable
  isAuth: boolean = false;

  @observable
  isLoading: boolean = false;

  @observable
  user: firebase.User | null = null;

  @observable
  userdata: IUser | null = null;

  userObserver = new BehaviorSubject<firebase.User | null>(null)

  @inject(Types.MessageManager)
  messageManager!: MessageManager;

  constructor () {
    makeObservable(this);

    this.startLoading();

    auth.onAuthStateChanged(user => {
      this.authChange(user);
      this.stopLoading();
    })
  }

  @action
  authChange (user: firebase.User | null) {
    this.isAuth = !!user;
    this.user = user
    this.userObserver.next(user);

    if (user) {
      firestore.collection('users').doc(user.uid).onSnapshot(doc => {
        this.userdata = doc.data() as IUser;
      })
    } else {
      this.userdata = null;
    }
  }

  @action
  startLoading () {
    this.isLoading = true;
  }

  @action
  stopLoading () {
    this.isLoading = false;
  }

  @action
  registered (data: IRegistered) {
    this.startLoading();

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
        })
        .finally(() => {
          this.stopLoading();
        })
  }

  @action
  login (email: string, password: string) {
    this.startLoading();

    return auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.messageManager.addMessage('Successful Login!');

        return res;
      })
      .catch(err => {
        this.messageManager.addErrorMessage(err.message);

        return err;
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  @action
  logout () {
    this.startLoading();

    return auth.signOut()
      .then(res => {
        this.messageManager.addMessage('Successful Logout!');

        return res;
      })
      .catch(err => {
        this.messageManager.addErrorMessage(err.message);

        return err;
      })
      .finally(() => {
        this.stopLoading();
      })
  }
}