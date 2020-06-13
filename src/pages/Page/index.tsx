import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonLoading } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { Toast } from '../../components/Toast';
import CurrentPage from '../CurrentPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../config/firebase';
import { submitMessage } from '../../services/toast';

const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();
    const [user, loading, error] = useAuthState(auth);

    if (error) {
        submitMessage(error.message);
    }

    if (loading) {
        return (
            <IonContent>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={loading}
                    message={'Please wait...'}
                />
            </IonContent>
        )
    }

    if (!user && name !== 'login' && name !== 'register') {
        return (
            <IonPage>
                <IonContent>
                    <CurrentPage name='login' />
                    <Toast />
                </IonContent>
            </IonPage>
        )
    }

    if (!user && (name === 'login' || name === 'register')) {
        return (
            <IonPage>
                <IonContent>
                    <CurrentPage name={name} />
                    <Toast />
                </IonContent>
            </IonPage>
        )
    }

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
                <CurrentPage name={name} />
                <Toast />
            </IonContent>
        </IonPage>
    );
};

export default Page;
