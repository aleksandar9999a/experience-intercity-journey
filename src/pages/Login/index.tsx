import React, { useState } from 'react';
import { IonCard, IonCardContent, IonInput, IonLabel, IonItem, IonButton } from '@ionic/react';
import './style.css';
import { submitLogin } from '../../services/auth';
import { submitMessage } from '../../services/toast';
import isEmail from 'validator/lib/isEmail';
import { Redirect } from 'react-router';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

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

  function submit() { if (!validate()) { return; } submitLogin(email, password).then(res => setRedirect(true)); }
  function handleEmail(e: any) { setEmail(e.target.value); }
  function handlePassword(e: any) { setPassword(e.target.value); }

  if(redirect) { return <Redirect exact to="/search" />}

  return (
    <IonCard color="light">
      <IonCardContent>
        <IonItem color="light">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={handleEmail}></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={handlePassword}></IonInput>
        </IonItem>
        <div className="ion-padding">
          <IonButton expand="block" fill="solid" color="success" onClick={submit}>LogIn</IonButton>
        </div>
        <IonItem routerLink="/register" className="register-route" color="light">
          <IonLabel color="secondary">Don't have an account? Register</IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default Login;
