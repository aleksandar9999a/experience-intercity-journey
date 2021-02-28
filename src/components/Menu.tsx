import React from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonContent,
  IonList,
  IonListHeader,
  IonMenu,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/react';

// Icons
import {
  chevronBackOutline,
  chevronBackSharp
} from 'ionicons/icons';

// Assets
import assets from '../config/assets';

// Interfaces
import { IMenuProps, IUser } from '../interfaces/interfaces';


export const Menu = observer(({ menu, authManager, routerManager }: IMenuProps) => {
  const userdata = authManager.userdata as IUser;

  function out() {
    authManager.logout();
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <img src={userdata.image || assets.anonym} className="menu-avatar" alt="avatar" />
          </IonListHeader>

          <IonNote className="menu-info">
            <p>{userdata.firstName} {userdata.lastName}</p>
          </IonNote>

          {menu.map(page => {
            return (
              <IonMenuToggle key={page.id} autoHide={false}>
                <IonItem
                  className={routerManager.pathname === page.url ? 'selected' : ''}
                  routerLink={page.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                    <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />

                    <IonLabel>{page.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}

          <IonMenuToggle autoHide={false}>
            <IonItem routerDirection="none" lines="none" detail={false} onClick={out}>
              <IonIcon slot="start" ios={chevronBackOutline} md={chevronBackSharp} />

              <IonLabel>Log Out</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
})
