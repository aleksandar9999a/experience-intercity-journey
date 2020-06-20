import React, { useState } from 'react';
import { IonInput, IonLabel, IonItem, IonButton, IonIcon, IonPage, IonContent, IonList } from '@ionic/react';
import { submitLogin } from '../../services/auth';
import { submitMessage } from '../../services/toast';
import isEmail from 'validator/lib/isEmail';
import { arrowForward } from 'ionicons/icons';
import Logo from '../../components/Logo';
import './style.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function validate() {
    if (!isEmail(email)) {
      submitMessage('Email format is invalid!');
      return false;
    }
    if (password.length < 8 || password.length > 20) {
      submitMessage('Password is invalid. Minimum length is 8 chars, max - 20 chars.');
      return false;
    }
    return true;
  }

  function submit() { if (!validate()) { return; } submitLogin(email, password); }
  function handleEmail(e: any) { setEmail(e.target.value); }
  function handlePassword(e: any) { setPassword(e.target.value); }

  return (
    <IonPage>
      <IonContent>
        <Logo height="50vh" />
        <IonList className="login-list">
          <IonItem color="light">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={handleEmail}></IonInput>
          </IonItem>
          <IonItem color="light">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={handlePassword}></IonInput>
          </IonItem>
          <IonButton color="success" fill="outline" className="login-btn" onClick={submit}>
            LogIn
              <IonIcon slot="end" ios={arrowForward} md={arrowForward} />
          </IonButton>
          <IonItem routerLink="/register" className="register-route">
            <IonLabel color="secondary">Don't have an account? Register</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
