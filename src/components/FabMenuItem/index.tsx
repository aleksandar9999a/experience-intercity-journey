import { IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';
import IFabMenuItem from '../../interfaces/IFabMenuItem';

const FabMenuItem: React.FC<IFabMenuItem> = ({ route, iosIcon, mdIcon }) => {
    return (
        <IonFabButton routerLink={route} color="light">
            <IonIcon ios={iosIcon} md={mdIcon}>
            </IonIcon>
        </IonFabButton>
    )
};

export default FabMenuItem;
