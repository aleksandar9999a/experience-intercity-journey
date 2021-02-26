import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { RouterManager } from '../../services/RouterManager';
import { observer } from 'mobx-react';

const Outlet = observer(({ routerManager }: { routerManager: RouterManager }) => {
    return (
        <IonRouterOutlet id="main">
            {routerManager.routes.map(({ id, path, Component, props }) => {
                return <Route key={id} path={path} component={() => <Component {...(props || {})} />} exact />
            })}

            <Redirect exact path="/" to={routerManager.isAuth ? '/search' : '/login'} />
        </IonRouterOutlet>
    )
})

export default Outlet;
