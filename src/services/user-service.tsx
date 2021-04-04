import { injectable, inject } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { BehaviorSubject } from 'rxjs';
import { auth, firestore, storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

// Interfaces
import { IUser, IRegistered } from '../interfaces/interfaces';

// Types
import Types from '../Types';

// Managers
import { MessageService } from './message-service';


@injectable()
export class UserService {
  @observable
  isAuth: boolean = false;

  @observable
  isLoading: boolean = false;

  @observable
  user: firebase.User | null = null;

  @observable
  userdata: IUser | null = null;

  userObserver = new BehaviorSubject<firebase.User | null>(null)

  @inject(Types.MessageService)
  messageService!: MessageService;

  constructor () {
    makeObservable(this);

    this.startLoading();

    auth.onAuthStateChanged(user => {
      this.stopLoading();
      this.authChange(user);
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
  updateOneFieldFromMyProfile (key: string, value: any) {
    this.startLoading();

    return firestore
      .collection('users')
      .doc(this.user!.uid)
      .update({ [key]: value })
      .then(data => {
        this.messageService.addMessage('Successful saved!');
        return data
      })
      .catch(err => {
        this.messageService.addErrorMessage(err.message);

        return err;
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  @action
  saveProfileImage (file: File) {
    this.startLoading();

    return storage.ref(`images/${uuidv4()}`)
      .put(file)
      .then(shot => {
        return shot.ref.getDownloadURL();
      })
      .then(url => {
        return this.updateOneFieldFromMyProfile('image', url);
      })
      .catch(err => {
        this.messageService.addErrorMessage(err.message);

        return err;
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  @action
  updateMultiplyFieldsFromMyProfile (fields: { field: string, value: any }[]) {
    return Promise.all(fields.map(field => this.updateOneFieldFromMyProfile(field.field, field.value)))
      .then(data => {
        this.messageService.addMessage('Successful Updated!');
        return data
      })
      .catch(err => {
        this.messageService.addErrorMessage(err.message);

        return err;
      })
  }

  @action
  getUserdata (uid: string) {
    this.startLoading();
    return firestore
      .collection('users')
      .doc(uid)
      .get()
      .then(user => {
        return user.data() as IUser
      })
      .catch(err => {
        this.messageService.addErrorMessage(err.message);

        return err;
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  @action
  getMultiplyUserdata (users: string[]) {
    this.startLoading();
    return Promise.all(users.map(this.getUserdata.bind(this)))
      .catch(err => {
        this.messageService.addErrorMessage(err.message);

        return err;
      })
      .finally(() => {
        this.stopLoading();
      })
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
          this.messageService.addMessage('Successful Registered!');

          return res;
        })
        .catch(err => {
          this.messageService.addErrorMessage(err.message);

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
        this.messageService.addMessage('Successful Login!');

        return res;
      })
      .catch(err => {
        this.messageService.addErrorMessage(err.message);

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
        this.messageService.addMessage('Successful Logout!');

        return res;
      })
      .catch(err => {
        this.messageService.addErrorMessage(err.message);

        return err;
      })
      .finally(() => {
        this.stopLoading();
      })
  }
}