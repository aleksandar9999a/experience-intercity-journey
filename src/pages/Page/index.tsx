import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { Toast } from '../../components/Toast';
import CurrentPage from '../CurrentPage';
import FabMenu from '../../components/FabMenu';

const Page: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {
    let { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
            <IonContent>
                {isAuth && <FabMenu />}
                <CurrentPage name={name} />
                <Toast />
            </IonContent>
        </IonPage>
    );
};

export default Page;
