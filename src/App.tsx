import React, { useEffect } from 'react';
import { IonApp, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { myUserdata } from './services';
import MenuContainer from './containers/MenuContainer';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';
import Outlet from './containers/Outlet';
import './Styles';

const App: React.FC = () => {
  const [_, loading, error] = useAuthState(auth);

  useEffect(() => {
    const sub = myUserdata.subscribe((userdata) => {
      if (!userdata) { return; };
      document.body.classList.toggle('dark-mode', userdata.darkMode);
    })

    return () => { sub.unsubscribe(); }
  }, [])

  if (loading) { return <LoadingPage isOpen={loading} /> }
  if (error) { return <ErrorPage message={error.message} /> }

  return (
    <IonApp>
      <IonReactRouter>
        <IonContent>
          <MenuContainer />
          <Outlet />
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
