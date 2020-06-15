import Menu from './components/Menu';
import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonContent, IonLoading, IonPage } from '@ionic/react';
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
import Page from './pages/Page';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './config/firebase';
import IUser from './interfaces/IUser';
import { submitMessage } from './services/toast';
import Login from './pages/Login';
import Register from './pages/Register';
import FabMenu from './components/FabMenu';

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userdata, setUserdata] = useState<IUser>();

  useEffect(() => {
    if (user) {
      firestore.collection('users').doc(user.uid).onSnapshot(doc => {
        if (!doc.exists) { submitMessage('No information about user!'); return; }
        setUserdata(doc.data() as IUser);
      })
    }
  }, [user])

  if (error) {
    return (
      <IonApp>
        <IonSplitPane contentId="main">
          <IonPage>
            <IonContent>
              <div className="error-page">
                <h1>{error}</h1>
              </div>
            </IonContent>
          </IonPage>
        </IonSplitPane>
      </IonApp>
    );
  }

  if (loading) {
    return (
      <IonApp>
        <IonSplitPane contentId="main">
          <IonPage>
            <IonContent>
              <IonLoading
                cssClass='my-custom-class'
                isOpen={loading}
                message={'Please wait...'}
              />
            </IonContent>
          </IonPage>
        </IonSplitPane>
      </IonApp>
    )
  }

  if (!user) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
              <IonContent>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Redirect exact path="*" to="/login" />
              </IonContent>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    )
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonPage>
            <IonContent>
              <Menu firstName={userdata?.firstName} lastName={userdata?.lastName} image={userdata?.image} />
              <FabMenu />
              <IonRouterOutlet id="main">
                <Route path="/:name" component={Page} exact />
                <Redirect exact path="/login" to="/search" />
                <Redirect exact path="/register" to="/search" />
              </IonRouterOutlet>
            </IonContent>
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
