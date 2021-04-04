import React from 'react';
import { observer } from 'mobx-react';
import { createBrowserHistory } from 'history';

// Components
import { IonApp, IonContent, IonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Outlet } from './components/Outlet';
import { Menu } from './components/Menu';
import { LoadingPage } from './pages/LoadingPage';
import { FabMenu } from './components/FabMenu';

// Interfaces
import { IAppProps } from './interfaces/interfaces';

// React Router History
export const history = createBrowserHistory();


export const App = observer(({ routerManager }: IAppProps) => {
  const userdata = routerManager.userService.userdata;

  return (
    <IonApp className={userdata && userdata.darkMode ? 'dark-mode' : ''}>
      <IonReactRouter history={history}>
        <IonContent>
          {userdata && (
            <Menu
              menu={routerManager.menu}
              userService={routerManager.userService}
              routerManager={routerManager}
            />
          )}

          <Outlet routerManager={routerManager} />

          <LoadingPage isOpen={routerManager.userService.isLoading || routerManager.publicationsService.isLoading} />

          {!routerManager.routesWithoutFabMenu.find(val => routerManager.pathname.includes(val)) && <FabMenu menu={routerManager.fabMenu} />}

          {routerManager.messageService.messages.map(message => {
            return (
              <IonToast
                key={message.id}
                isOpen={true}
                color={message.type}
                onDidDismiss={() => routerManager.messageService.remove(message.id)}
                message={message.message}
                duration={routerManager.messageService.duration}
              />
            )
          })}
        </IonContent>
      </IonReactRouter>
    </IonApp>
  ); 
})
