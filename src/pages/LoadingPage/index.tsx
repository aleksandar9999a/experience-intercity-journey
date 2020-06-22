import React from 'react';
import { IonPage, IonContent, IonLoading } from '@ionic/react';

const LoadingPage: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return (
        <IonPage>
            <IonContent>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={isOpen}
                    message={'Please wait...'}
                />
            </IonContent>
        </IonPage>
    )
};

export default LoadingPage;
