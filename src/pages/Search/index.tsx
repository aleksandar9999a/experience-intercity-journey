import React from 'react';
import { IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';

const Search: React.FC = () => {
  return (
    <IonCard color="light">
    <IonCardContent>
      <IonItem color="light">
        <IonLabel position="floating">From</IonLabel>
        <IonInput type="text" required={true}></IonInput>
      </IonItem>
      <IonItem color="light">
        <IonLabel position="floating">To</IonLabel>
        <IonInput type="text" maxlength={20} minlength={8} required={true}></IonInput>
      </IonItem>
      <div className="ion-padding">
        <IonButton expand="block" fill="solid" color="success" type="submit">Search</IonButton>
      </div>
    </IonCardContent>
  </IonCard>
  );
};

export default Search;
