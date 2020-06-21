import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import React from 'react';
import { chevronBackOutline } from 'ionicons/icons';
import fab_menu_config from '../../config/fab_menu_config';
import FabMenuItem from '../../components/FabMenuItem';

const FabMenu: React.FC = () => {
    const list = fab_menu_config.map((item, index) => <FabMenuItem key={index} route={item.route} iosIcon={item.iosIcon} mdIcon={item.mdIcon} />);

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
