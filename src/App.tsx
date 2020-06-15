import Menu from './components/Menu';
import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage, IonContent, IonLoading } from '@ionic/react';
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

  if(error) {
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
        <IonSplitPane contentId="main">
          {!!user && <Menu firstName={userdata?.firstName} lastName={userdata?.lastName} image={userdata?.image} />}
          <IonRouterOutlet id="main">
            <Route path="/:name" render={() => <Page isAuth={!!user} />} exact />
            <Redirect exact path="/" to="/search" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
