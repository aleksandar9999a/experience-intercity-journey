import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonButton,
  IonContent,
  IonList
} from '@ionic/react';

// Assets
import assets from '../config/assets';

// Interfaces
import { IAccountProps } from '../interfaces/interfaces';


export const Account = observer(({ userService, validationManager, messageService }: IAccountProps) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    if (!userService.userdata) {
      return;
    };

    const userdata = { ...userService.userdata };

    setFirstName(userdata.firstName);
    setLastName(userdata.lastName);
    setCity(userdata.city);
    setDarkMode(userdata.darkMode);
    setImage(userdata.image || '');
  }, [userService.userdata]);

  function handleFirstName(e: any) {
    setFirstName(e.target.value);
  }
  
  function handleLastName(e: any) {
    setLastName(e.target.value);
  }
  
  function handleCity(e: any) {
    setCity(e.target.value);
  }
  
  function handleDarkMode(e: any) {
    return userService.updateOneFieldFromMyProfile('darkMode', e.target.checked)
  }

  function handleFile(e: any) {
    if (!e.target || !e.target.files || !e.target.files[0].type.includes('image')) {
      messageService.addErrorMessage('Invalid Image!');
      return;
    }

    return userService.saveProfileImage(e.target.files[0] as File);
  }

  function submit() {
    return validationManager.getUserdataError({ firstName, lastName, city })
      .then(_ => {
        const data = [
          { field: 'firstName', value: firstName },
          { field: 'lastName', value: lastName },
          { field: 'city', value: city },
        ]
    
        return userService.updateMultiplyFieldsFromMyProfile(data);
      })
      .catch(err => {
        messageService.addErrorMessage(err.message);
      })
  }

  return (
    <IonPage>
      <IonContent>
        <div className="profile-img">
          <img src={image || assets.anonym} alt="preview" />
        </div>

        <IonList>
          <IonItem>
            <IonLabel>Select new profile image!</IonLabel>

            <input className="ion-input custom-input" type="file" onChange={handleFile} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">First Name</IonLabel>

            <IonInput type="text" value={firstName} onIonChange={handleFirstName} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Last Name</IonLabel>

            <IonInput type="text" value={lastName} onIonChange={handleLastName} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">City</IonLabel>

            <IonInput type="text" value={city} onIonChange={handleCity} />
          </IonItem>

          <IonItem>
            <IonLabel>Dark Mode</IonLabel>

            <IonToggle color="primary" checked={darkMode} onClick={handleDarkMode}/>
          </IonItem>
        </IonList>

        <div className="profile-edit-btn-wrapper">
          <IonButton className="profile-edit-btn" color="success" fill="outline" onClick={submit}>
            Submit
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
})
