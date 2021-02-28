import React from 'react';
import { observer } from 'mobx-react';
import { createBrowserHistory } from 'history';

// Components
import { IonApp, IonContent, IonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Outlet } from './containers/Outlet';
import { Menu } from './components/Menu';
import { LoadingPage } from './pages/LoadingPage';
import FabMenu from './containers/FabMenu';

// Interfaces
import { IAppProps } from './interfaces/interfaces';

// React Router History
export const history = createBrowserHistory();


export const App = observer(({ routerManager }: IAppProps) => {
  const userdata = routerManager.authManager.userdata

  return (
    <IonApp className={userdata && userdata.darkMode ? 'dark-mode' : ''}>
      <IonReactRouter history={history}>
        <IonContent>
          {userdata && (
            <Menu
              menu={routerManager.menu}
              authManager={routerManager.authManager}
              routerManager={routerManager}
            />
          )}

          <Outlet routerManager={routerManager} />

          <LoadingPage isOpen={routerManager.authManager.isLoading} />

          {!routerManager.pathname.includes('chat') && <FabMenu />}

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
