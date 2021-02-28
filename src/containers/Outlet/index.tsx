import React from 'react';
import { observer } from 'mobx-react';

// Components
import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';

// Managers
import { RouterManager } from '../../services/RouterManager';


export const Outlet = observer(({ routerManager }: { routerManager: RouterManager }) => {
    return (
        <IonRouterOutlet id="main">
            {routerManager.routes.map(({ id, path, Component, props }) => {
                return <Route key={id} path={path} component={() => <Component {...(props || {})} />} exact />
            })}
        </IonRouterOutlet>
    )
})
