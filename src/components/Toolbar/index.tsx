import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import React from 'react';

const Toolbar: React.FC<{ name: string }> = ({ name }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{name}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default Toolbar;
