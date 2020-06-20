import React, { useState, useEffect } from 'react';
import { IonPage, IonItem, IonLabel, IonInput, IonToggle, IonButton, IonContent, IonList } from '@ionic/react';
import { uploadImage, updateOneFieldFromMyProfile, updateMultiplyFieldsFromMyProfile, myUserdata } from '../../services';
import TProfileState from '../../types/TProfileState';
import { submitMessage } from '../../services/toast';
import assets from '../../config/assets';
import './style.css';
import LoadingPage from '../LoadingPage';

const Account: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const sub = myUserdata.subscribe(data => {
      if (!data) { return; }
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setCity(data.city);
      setDarkMode(data.darkMode);
      setImage(data.image || '');
    });
    return () => { sub.unsubscribe(); }
  }, []);

  useEffect(() => {
    if (!file || !file.type.includes('image')) { return; }
    setUploading(true);
    uploadImage(file).then(url => handleImmediatelyUpdatedField('image', url)).finally(() => setUploading(false));
  }, [file])

  function handleChanges(type: string, value: string) {
    const types: TProfileState = {
      firstName: setFirstName,
      lastName: setLastName,
      city: setCity
    }

    if (typeof types[type] === 'function') {
      types[type](value);
      return;
    }
    submitMessage('Invalid input format!');
  }

  function handleImmediatelyUpdatedField(type: string, value: string) {
    const types: TProfileState = {
      darkMode: setDarkMode,
      image: setImage
    }

    if (typeof types[type] === 'function') {
      types[type](value);
      setUploading(true);
      updateOneFieldFromMyProfile(type, value).finally(() => setUploading(false));
      return;
    }
    submitMessage('Invalid input format!');
  }

  function handleFirstName(e: any) { return handleChanges('firstName', e.target.value); }
  function handleLastName(e: any) { return handleChanges('lastName', e.target.value); }
  function handleCity(e: any) { return handleChanges('city', e.target.value); }
  function handleDarkMode(e: any) { return handleImmediatelyUpdatedField('darkMode', e.detail.checked); }

  function handleFile(e: any) {
    if (!e.target || !e.target.files || !e.target.files[0].type.includes('image')) { submitMessage('Invalid Image!'); return; }
    setFile(e.target.files[0])
  }

  function validate() {
    if (city.length < 3 || city.length > 20) { submitMessage('City is invalid.'); return false; }
    if (firstName.length < 4 || firstName.length > 20) { submitMessage('First name is invalid. Minimum length is 4 chars, max - 20 chars.'); return false; }
    if (lastName.length < 4 || lastName.length > 20) { submitMessage('Last name is invalid. Minimum length is 4 chars, max - 20 chars.'); return false; }

    return true;
  }

  function submit() {
    if (!validate()) { return; }
    setUploading(true);
    updateMultiplyFieldsFromMyProfile([
      { field: 'firstName', value: firstName },
      { field: 'lastName', value: lastName },
      { field: 'city', value: city },
    ]).finally(() => setUploading(false));
  }

  if (uploading) { return <LoadingPage isOpen={uploading} /> }

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
            <IonToggle color="primary" checked={darkMode} onIonChange={handleDarkMode} />
          </IonItem>
        </IonList>
        <div className="profile-edit-btn-wrapper">
          <IonButton className="profile-edit-btn" color="success" fill="outline" onClick={submit}>Submit</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};



export default Account;
