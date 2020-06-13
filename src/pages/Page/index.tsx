import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { Toast } from '../../components/Toast';
import CurrentPage from '../CurrentPage';

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
                <CurrentPage name={name}/>
                <Toast />
            </IonContent>
        </IonPage>
    );
};

export default Page;
