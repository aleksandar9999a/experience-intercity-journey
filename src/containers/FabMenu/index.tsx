import React from 'react';

// Components
import FabMenuItem from '../../components/FabMenuItem';
import {
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList
} from '@ionic/react';

// Icons
import { chevronBackOutline } from 'ionicons/icons';

// Config
import { IFabMenuItem } from '../../interfaces/interfaces';


const FabMenu: React.FC<{ menu: IFabMenuItem[] }> = ({ menu }) => {
    return (
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="light">
                <IonIcon ios={chevronBackOutline} md={chevronBackOutline}></IonIcon>
            </IonFabButton>

            <IonFabList side="start">
                {menu.map(item => {
                    return <FabMenuItem key={item.id} id={item.id} route={item.route} iosIcon={item.iosIcon} mdIcon={item.mdIcon} />
                })}
            </IonFabList>
        </IonFab>
    );
};

export default FabMenu;
