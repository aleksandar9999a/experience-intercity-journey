import React from 'react';
import { IonCard, IonCardContent, IonInput, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';

const Search: React.FC = () => {
  return (
    <IonCard color="light">
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput placeholder="From" type="text" required={true}></IonInput>
            </IonCol>
            <IonCol>
              <IonInput placeholder="To" type="text" maxlength={20} minlength={8} required={true}></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol></IonCol>
            <IonCol className="ion-align-self-center">
              <IonButton fill="solid" color="success">Search</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default Search;
