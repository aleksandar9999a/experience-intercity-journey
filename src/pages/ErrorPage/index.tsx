import React from 'react';
import { IonApp, IonPage, IonContent } from '@ionic/react';

const ErrorPage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <IonApp>
            <IonPage>
                <IonContent>
                    <div className="error-page">
                        <h1>{message}</h1>
                    </div>
                </IonContent>
            </IonPage>
        </IonApp>
    )
};

export default ErrorPage;
