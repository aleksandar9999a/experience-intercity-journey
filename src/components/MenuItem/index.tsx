import { IonIcon, IonItem, IonLabel, IonMenuToggle, } from '@ionic/react';
import React from 'react';
import IMenuItem from '../../interfaces/IMenuItem';

const MenuItem: React.FC<IMenuItem> = ({ page, location }) => {
    return (
        <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname === page.url ? 'selected' : ''} routerLink={page.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                <IonLabel>{page.title}</IonLabel>
            </IonItem>
        </IonMenuToggle>
    )
};

export default MenuItem;
