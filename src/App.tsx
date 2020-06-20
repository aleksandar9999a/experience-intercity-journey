import Menu from './components/Menu';
import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, IonPage, IonContent, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import IUser from './interfaces/IUser';
import { submitMessage } from './services/toast';
import { getUserdata } from './services';
import route_config from './config/route_config';
import { Toast } from './components/Toast';
import FabMenu from './components/FabMenu';

const routeList = route_config.map(({ path, component }, index) => <Route key={index} path={path} component={component} exact />)

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userdata, setUserdata] = useState<IUser>();

  useEffect(() => {
    if (!user) { return; }
    getUserdata(user.uid).onSnapshot(doc => {
      if (!doc.exists) { submitMessage('User document does not exist!'); return; }
      setUserdata(doc.data() as IUser)
    })
  }, [user])

  useEffect(() => {
    if (!userdata) { return; }
    document.body.classList.toggle('dark-mode', userdata.darkMode);
  }, [userdata])

  if (loading) {
    return (
      <IonApp>
        <IonPage>
          <IonContent>
            <IonLoading
              cssClass='my-custom-class'
              isOpen={loading}
              message={'Please wait...'}
            />
          </IonContent>
        </IonPage>
      </IonApp>
    )
  }

  if (error) {
    return (
      <IonApp>
        <IonPage>
          <IonContent>
            <div className="error-page">
              <h1>{error}</h1>
            </div>
          </IonContent>
        </IonPage>
      </IonApp>
    )
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonContent>
          {!!userdata && <Menu firstName={userdata.firstName} lastName={userdata.lastName} image={userdata.image} />}
          <IonRouterOutlet id="main">
            {routeList}
            <Redirect exact path="/" to={!!user ? '/search' : '/login'} />
          </IonRouterOutlet>
          <FabMenu />
          <Toast />
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
