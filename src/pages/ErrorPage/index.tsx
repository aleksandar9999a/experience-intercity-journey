import React from 'react';
import { IonPage, IonContent } from '@ionic/react';

const ErrorPage: React.FC<{ message: string }> = ({ message }) => {
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

export default ErrorPage;
