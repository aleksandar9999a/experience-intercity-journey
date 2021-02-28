import { injectable, inject } from 'inversify';
import { makeObservable, observable } from 'mobx';

// React Router
import { history } from '../App';

// Interfaces
import { IRoute } from '../interfaces/interfaces';

// Components
import Account from '../pages/Account';
import Chat from '../pages/Chat';
import CreatePublication from '../pages/CreatePublication';
import Details from '../pages/Details';
import { Login } from '../pages/Login';
import Messages from '../pages/Messages';
import MyPublications from '../pages/MyPublications';
import Register from '../pages/Register';
import Search from '../pages/Search';

// DI Types
import type from '../Types';

// Managers
import { AuthManager } from './AuthManager';


@injectable()
export class RouterManager {
  @observable
  routes: IRoute[] = [];

  @observable
  isAuth: boolean = true;

  @inject(type.AuthManager)
  authManager!: AuthManager;

  authPage = '/search';
  unauthPage = '/login';
  unauthPages = ['/login', '/register'];

  constructor () {
    makeObservable(this);
  }

  init () {
    this.setRoutes();

    this.authManager.userObserver.subscribe(user => {
      const route = window.location.pathname

      if (user && this.unauthPages.includes(route)) {
        history.push(this.authPage);
      }

      if (!user && !this.unauthPages.includes(route)) {
        history.push(this.unauthPage);
      }
    })
  }

  setRoutes () {
    this.routes = [
      {
        id: 1,
        path: '/account',
        Component: Account,
        props: {
          routerManager: this
        }
      },
      {
        id: 2,
        path: '/myPublications',
        Component: MyPublications,
        props: {
          routerManager: this
        }
      },
      {
        id: 3,
        path: '/login',
        Component: Login,
        props: {
          authManager: this.authManager,
          routerManager: this
        }
      },
      {
        id: 4,
        path: '/register',
        Component: Register,
        props: {
          authManager: this.authManager,
          routerManager: this
        }
      },
      {
        id: 5,
        path: '/search',
        Component: Search,
        props: {
          routerManager: this
        }
      },
      {
        id: 6,
        path: '/createPublication',
        Component: CreatePublication,
        props: {
          routerManager: this
        }
      },
      {
        id: 7,
        path: '/messages',
        Component: Messages,
        props: {
          routerManager: this
        }
      },
      {
        id: 8,
        path: '/details/:id',
        Component: Details,
        props: {
          routerManager: this
        }
      },
      {
        id: 9,
        path: '/chat/:id',
        Component: Chat,
        props: {
          routerManager: this
        }
      }
    ];
  }
}