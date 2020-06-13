import React from 'react';
import { IonCard, IonCardContent, IonInput, IonLabel, IonItem, IonButton } from '@ionic/react';
import './style.css';

const Login: React.FC = () => {
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
        <div className="ion-padding">
          <IonButton expand="block" fill="solid" color="success" type="submit">LogIn</IonButton>
        </div>
        <IonItem routerLink="/register" className="register-route" color="light">
          <IonLabel color="secondary">Don't have an account? Register</IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default Login;
