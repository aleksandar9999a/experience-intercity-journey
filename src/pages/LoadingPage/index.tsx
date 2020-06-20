import React from 'react';
import { IonApp, IonPage, IonContent, IonLoading } from '@ionic/react';

const LoadingPage: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return (
        <IonApp>
            <IonPage>
                <IonContent>
                    <IonLoading
                        cssClass='my-custom-class'
                        isOpen={isOpen}
                        message={'Please wait...'}
                    />
                </IonContent>
            </IonPage>
        </IonApp>
    )
};

export default LoadingPage;
