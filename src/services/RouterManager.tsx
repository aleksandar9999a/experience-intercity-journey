import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
import Account from '../pages/Account';
import Chat from '../pages/Chat';
import CreatePublication from '../pages/CreatePublication';
import Details from '../pages/Details';
import Login from '../pages/Login';
import Messages from '../pages/Messages';
import MyPublications from '../pages/MyPublications';
import Register from '../pages/Register';
import Search from '../pages/Search';

interface IRoute {
  id: number,
  path: string,
  Component: React.FC,
  props?: {
    [key: string]: any
  }
} 

@injectable()
export class RouterManager {
  @observable
  routes: IRoute[] = [];

  @observable
  isAuth: boolean = true;

  constructor () {
    makeObservable(this);

    this.routes = [
      { id: 1, path: '/account', Component: Account },
      { id: 2, path: '/myPublications', Component: MyPublications },
      { id: 3, path: '/login', Component: Login },
      { id: 4, path: '/register', Component: Register  },
      { id: 5, path: '/search', Component: Search },
      { id: 6, path: '/createPublication', Component: CreatePublication },
      { id: 7, path: '/messages', Component: Messages },
      { id: 8, path: '/details/:id', Component: Details },
      { id: 9, path: '/chat/:id', Component: Chat }
    ];
  }
}