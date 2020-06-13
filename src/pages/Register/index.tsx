import React from 'react';
import { IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';

const Register: React.FC = () => {
  return (
    <IonCard color="light">
      <IonCardContent>
        <IonItem color="light">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" required={true} pattern="email"></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" maxlength={20} minlength={8} required={true} ></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Repeat Password</IonLabel>
          <IonInput type="password" maxlength={20} minlength={8} required={true} ></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">City</IonLabel>
          <IonInput type="text" maxlength={20} minlength={3} required={true} ></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput type="text" maxlength={20} minlength={4} required={true} ></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput type="text" maxlength={20} minlength={4} required={true} ></IonInput>
        </IonItem>
        <div className="ion-padding">
          <IonButton expand="block" fill="solid" color="success" type="submit">Registered</IonButton>
        </div>
        <IonItem routerLink="/login" className="register-route" color="light">
          <IonLabel color="secondary">Do you have an account? Login</IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default Register;
