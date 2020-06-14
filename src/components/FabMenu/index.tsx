import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import React from 'react';
import { chevronBackOutline } from 'ionicons/icons';
import fab_menu_config from '../../config/fab_menu_config';

const FabMenu: React.FC = () => {
    const list = fab_menu_config.map((x, i) => <IonFabButton key={i} color="light"><IonIcon ios={x.iosIcon} md={x.mdIcon}></IonIcon></IonFabButton>)
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