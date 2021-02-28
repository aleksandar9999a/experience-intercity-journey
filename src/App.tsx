import React from 'react';
import { IonApp, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import MenuContainer from './containers/MenuContainer';
import Outlet from './containers/Outlet';
import { useMyUserData } from './hooks';
import { RouterManager } from './services/RouterManager';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import { observer } from 'mobx-react';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();


export const App = observer(({ routerManager }: { routerManager: RouterManager }) => {
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
