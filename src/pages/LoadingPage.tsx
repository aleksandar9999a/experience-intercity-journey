import React from 'react';

// Components
import {
    IonPage,
    IonContent,
    IonLoading
} from '@ionic/react';


export const LoadingPage: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return isOpen
        ? (
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
        : <div></div>
};
