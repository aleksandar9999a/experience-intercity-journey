import React from 'react';

// Components
import { IonPage, IonContent } from '@ionic/react';


export const ErrorPage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <IonPage>
            <IonContent>
                <div className="error-page">
                    <h1>{message}</h1>
                </div>
            </IonContent>
        </IonPage>
    )
};
