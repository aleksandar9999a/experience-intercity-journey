import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { getUserdata } from './services';
import route_config from './config/route_config';
import MenuContainer from './containers/MenuContainer';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';
import './Styles';

const routeList = route_config.map(({ path, component }, index) => <Route key={index} path={path} component={component} exact />)

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) { return; }
    getUserdata(user.uid).onSnapshot(doc => {
      const data = doc.data();
      if (!data) { return; }
      document.body.classList.toggle('dark-mode', data.darkMode);
    })
  }, [user])

  if (loading) { return <LoadingPage isOpen={loading} /> }
  if (error) { return <ErrorPage message={error.message} /> }

  return (
    <IonApp>
      <IonReactRouter>
        <IonContent>
          <MenuContainer />
          <IonRouterOutlet id="main">
            {routeList}
            <Redirect exact path="/" to={!!user ? '/search' : '/login'} />
          </IonRouterOutlet>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
