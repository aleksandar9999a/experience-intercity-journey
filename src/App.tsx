import React from 'react';
import { observer } from 'mobx-react';
import { createBrowserHistory } from 'history';

// Components
import { IonApp, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Outlet } from './containers/Outlet';
import MenuContainer from './containers/MenuContainer';
import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';

// Hooks
import { useMyUserData } from './hooks';
import { useAuthState } from 'react-firebase-hooks/auth';


// Auth
import { auth } from './config/firebase';

// Interfaces
import { IAppProps } from './interfaces/interfaces';

// React Router History
export const history = createBrowserHistory();


export const App = observer(({ routerManager }: IAppProps) => {
  const userdata = useMyUserData();
  const [user, loading, error] = useAuthState(auth);

  return (
    <IonApp className={userdata && userdata.darkMode ? 'dark-mode' : ''}>
      <IonReactRouter history={history}>
        <IonContent>
          <MenuContainer />

          <Outlet routerManager={routerManager} />

          {loading && <LoadingPage isOpen={loading} />}

          {error && <ErrorPage message={error.message} />}
        </IonContent>
      </IonReactRouter>
    </IonApp>
  ); 
})
