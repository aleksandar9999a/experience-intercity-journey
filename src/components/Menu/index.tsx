import { IonContent, IonList, IonListHeader, IonMenu, IonNote } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import menu_config from '../../config/menu_config';
import MenuItem from '../MenuItem';
import './style.css';


const Menu: React.FC = () => {
  const location = useLocation();
  const [list, setList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newList = menu_config.map((appPage, index) => <MenuItem key={index} page={appPage} location={location} />);
    setList(newList);
  }, [location])

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {list}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
