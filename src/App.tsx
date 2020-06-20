import React, { useEffect } from 'react';
import { IonApp, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { myUserdata } from './services';
import MenuContainer from './containers/MenuContainer';
import Outlet from './containers/Outlet';
import './Styles';

const App: React.FC = () => {

  useEffect(() => {
    const sub = myUserdata.subscribe((userdata) => {
      if (!userdata) { return; };
      document.body.classList.toggle('dark-mode', userdata.darkMode);
    })

    return () => { sub.unsubscribe(); }
  }, [])

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
