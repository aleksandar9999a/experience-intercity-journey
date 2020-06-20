import React, { useEffect } from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, useLocation, useHistory } from 'react-router-dom';
import route_config from '../../config/route_config';
import ICustomRoute from '../../interfaces/ICustomRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import LoadingPage from '../../pages/LoadingPage';
import ErrorPage from '../../pages/ErrorPage';

const Outlet: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    const routes = route_config.map(generateRoute);
    const unauthorizedRoutes = ['/login', '/register'];
    const { pathname } = useLocation();
    const history = useHistory();

    useEffect(() => {
        if(loading) { return; }
        
        if(!user && !unauthorizedRoutes.includes(pathname)) {
            history.push('/login');
            return;
        }

        if(user && unauthorizedRoutes.includes(pathname)) {
            history.push('/search');
            return;
        }
        
    }, [loading, user])

    function generateRoute({ path, component }: ICustomRoute, index: number) {
        return <Route key={index} path={path} component={component} exact />
    }

    if (loading) { return <LoadingPage isOpen={loading} /> }
    if (error) { return <ErrorPage message={error.message} /> }

    return (
        <IonRouterOutlet id="main">
            {routes}
            <Redirect exact path="/" to={!!user ? '/search' : '/login'} />
        </IonRouterOutlet>
    )
};

export default Outlet;
