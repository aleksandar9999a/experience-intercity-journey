import React from 'react';

// Components
import { IonFabButton, IonIcon } from '@ionic/react';

// Interfaces
import { IFabMenuItem } from '../../interfaces/interfaces';

const FabMenuItem: React.FC<IFabMenuItem> = ({ route, iosIcon, mdIcon }) => {
    return (
        <IonFabButton routerLink={route} color="light">
            <IonIcon ios={iosIcon} md={mdIcon}>
            </IonIcon>
        </IonFabButton>
    )
};

export default FabMenuItem;
