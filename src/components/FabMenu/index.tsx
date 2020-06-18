import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import React from 'react';
import { chevronBackOutline } from 'ionicons/icons';
import fab_menu_config from '../../config/fab_menu_config';
import IFabMenuItem from '../../interfaces/IFabMenuItem';

const FabMenu: React.FC = () => {
    const list = fab_menu_config.map(generateFabButton);

    function generateFabButton(item: IFabMenuItem, index: number) {
        return (
            <IonFabButton key={index} routerLink={item.route} color="light">
                <IonIcon ios={item.iosIcon} md={item.mdIcon}>
                </IonIcon>
            </IonFabButton>
        )
    }

    return (
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="light">
                <IonIcon ios={chevronBackOutline} md={chevronBackOutline}></IonIcon>
            </IonFabButton>
            <IonFabList side="start">
                {list}
            </IonFabList>
        </IonFab>
    );
};

export default FabMenu;
