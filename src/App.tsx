import React, { useEffect } from 'react';
import { IonApp, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import MenuContainer from './containers/MenuContainer';
import Outlet from './containers/Outlet';
import { useMyUserData } from './hooks';
import './Styles';

const App: React.FC = () => {
  const user = useMyUserData();

  useEffect(() => {
    if (!user) { return; }
    document.body.classList.toggle('dark-mode', user.darkMode);
  }, [user])

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
