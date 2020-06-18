import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { useParams, Redirect } from 'react-router';
import { Toast } from '../../components/Toast';
import FabMenu from '../../components/FabMenu';
import route_config from '../../config/route_config';
import IPage from '../../interfaces/IPage';

const Page: React.FC<IPage> = ({ isAuth }) => {
    let { name } = useParams<{ name: string; }>();
    const unauthorizedPages = ['register', 'login'];
    if(!isAuth && !unauthorizedPages.includes(name)) {
        return <Redirect to="/login" />
    }

    const Component = route_config[name];

    return (
        <IonPage>
            <IonContent>
                {isAuth && name !=='chat' && <FabMenu />}
                <Component />
                <Toast />
            </IonContent>
        </IonPage>
    );
};

export default Page;
