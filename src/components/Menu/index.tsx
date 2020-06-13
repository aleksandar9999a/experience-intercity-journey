import { IonContent, IonList, IonListHeader, IonMenu, IonNote } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import appPages from '../../config/appPages';
import MenuItem from '../MenuItem';
import './style.css';


const Menu: React.FC = () => {
  const location = useLocation();
  const [list, setList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newList = appPages.map((appPage, index) => <MenuItem key={index} page={appPage} location={location} />);
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
