import { IonContent, IonList, IonListHeader, IonMenu, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import menu_config from '../../config/menu_config';
import MenuItem from '../MenuItem';
import './style.css';
import { chevronBackOutline, chevronBackSharp } from 'ionicons/icons';
import { logOut } from './../../services/auth';


const Menu: React.FC = () => {
  const location = useLocation();
  const [list, setList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newList = menu_config.map((appPage, index) => <MenuItem key={index} page={appPage} location={location} />);
    setList(newList);
  }, [location])

  function out() { logOut(); }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {list}
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
};

export default Menu;
