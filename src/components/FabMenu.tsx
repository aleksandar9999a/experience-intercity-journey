import React from 'react';

// Components
import {
	IonFab,
	IonFabButton,
	IonIcon,
	IonFabList
} from '@ionic/react';

// Icons
import { chevronBackOutline } from 'ionicons/icons';

// Config
import { IFabMenuItem } from '../interfaces/interfaces';


export const FabMenu: React.FC<{ menu: IFabMenuItem[] }> = ({ menu }) => {
	return (
		<IonFab horizontal="end" vertical="bottom" slot="fixed">
			<IonFabButton color="light">
				<IonIcon ios={chevronBackOutline} md={chevronBackOutline}></IonIcon>
			</IonFabButton>

			<IonFabList side="start">
				{menu.map(item => {
					return (
						<IonFabButton key={item.id} routerLink={item.route} color="light">
							<IonIcon ios={item.iosIcon} md={item.mdIcon} />
						</IonFabButton>
					)
				})}
			</IonFabList>
		</IonFab>
	);
};
