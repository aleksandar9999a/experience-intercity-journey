import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import route_config from './../../config/route_config';
import { Toast } from '../../components/Toast';

const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {route_config[name]()}
                <Toast />
            </IonContent>
        </IonPage>
    );
};

export default Page;
