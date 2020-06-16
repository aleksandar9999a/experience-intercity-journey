import React, { useState } from 'react';
import { IonInput, IonLabel, IonItem, IonButton, IonIcon } from '@ionic/react';
import './style.css';
import { submitLogin } from '../../services/auth';
import { submitMessage } from '../../services/toast';
import isEmail from 'validator/lib/isEmail';
import { Redirect } from 'react-router';
import assets from '../../config/assets';
import { arrowForward } from 'ionicons/icons';

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

  if (redirect) { return <Redirect exact to="/search" /> }

  return (
    <div className="login-page">
      <img src={assets.kindOfTransport} className="login-logo" alt="logo" />
      <div className="login-inputs-wrapper">
        <IonItem color="light">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={handleEmail}></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={handlePassword}></IonInput>
        </IonItem>
      </div>
      <div className="login-button-wrapper">
        <IonButton color="success" fill="outline" className="login-btn" onClick={submit}>
          LogIn
            <IonIcon slot="end" ios={arrowForward} md={arrowForward} />
        </IonButton>
      </div>
      <div className="register-route-wrapper">
        <IonItem routerLink="/register" className="register-route">
          <IonLabel color="secondary">Don't have an account? Register</IonLabel>
        </IonItem>
      </div>
    </div>
  );
};

export default Login;
