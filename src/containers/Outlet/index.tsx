import React, { useEffect, useState } from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import route_config from '../../config/route_config';
import { myUserdata } from '../../services';
import IUser from '../../interfaces/IUser';
import ICustomRoute from '../../interfaces/ICustomRoute';

const Outlet: React.FC = () => {
    const [user, setUser] = useState<IUser | null>();
    const routes = route_config.map(generateRoute);

    useEffect(() => {
        const sub = myUserdata.subscribe((userdata) => setUser(userdata));
        return () => { sub.unsubscribe(); }
    }, [])

    function generateRoute({ path, component }: ICustomRoute, index: number) {
        return <Route key={index} path={path} component={component} exact />
    }

    return (
        <IonRouterOutlet id="main">
            {routes}
            <Redirect exact path="/" to={!!user ? '/search' : '/login'} />
        </IonRouterOutlet>
    )
};

export default Outlet;
