import React from 'react';
import { observer } from 'mobx-react';
import { createBrowserHistory } from 'history';

// Components
import { IonApp, IonContent, IonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Outlet } from './containers/Outlet';
import MenuContainer from './containers/MenuContainer';
import LoadingPage from './pages/LoadingPage';

// Interfaces
import { IAppProps } from './interfaces/interfaces';

// React Router History
export const history = createBrowserHistory();


export const App = observer(({ routerManager }: IAppProps) => {
  return (
    <IonApp className={routerManager.authManager.userdata && routerManager.authManager.userdata.darkMode ? 'dark-mode' : ''}>
      <IonReactRouter history={history}>
        <IonContent>
          <MenuContainer />

          <Outlet routerManager={routerManager} />

          <LoadingPage isOpen={routerManager.authManager.isLoading} />

          {routerManager.messageManager.messages.map(message => {
            return (
              <IonToast
                key={message.id}
                isOpen={true}
                color={message.type}
                onDidDismiss={() => routerManager.messageManager.remove(message.id)}
                message={message.message}
                duration={routerManager.messageManager.duration}
              />
            )
          })}
        </IonContent>
      </IonReactRouter>
    </IonApp>
  ); 
})
