import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import isEmail from 'validator/lib/isEmail';
import { submitMessage } from '../../services/toast';
import TRegisterState from '../../types/TRegisterState';
import { submitRegistered } from '../../services/auth';
import './style.css';
import { Redirect } from 'react-router';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  function validate() {
    if (!isEmail(email)) { submitMessage('Email format is invalid!'); return false; }
    if (password.length < 8 || password.length > 20) { submitMessage('Password is invalid. Minimum length is 8 chars, max - 20 chars.'); return false; }
    if (rePassword !== password) { submitMessage('Passwords not match!'); return false; }
    if (city.length < 3 || city.length > 20) { submitMessage('City is invalid.'); return false; }
    if (firstName.length < 4 || firstName.length > 20) { submitMessage('First name is invalid. Minimum length is 4 chars, max - 20 chars.'); return false; }
    if (lastName.length < 4 || lastName.length > 20) { submitMessage('Last name is invalid. Minimum length is 4 chars, max - 20 chars.'); return false; }
    return true;
  }

  function handleChanges(type: string, value: string) {
    const types: TRegisterState = {
      email: setEmail,
      password: setPassword,
      rePassword: setRePassword,
      city: setCity,
      firstName: setFirstName,
      lastName: setLastName
    }

    if (typeof types[type] === 'function') { types[type](value); return; }
    submitMessage('Invalid input format!');
  }

  function submit() {
    if (!validate()) { return; }
    submitRegistered({ email, password, city, firstName, lastName }).then(() => setRedirect(true));
  }

  function handleEmail(e: any) { handleChanges('email', e.target.value); }
  function handlePassword(e: any) { handleChanges('password', e.target.value); }
  function handleRePassword(e: any) { handleChanges('rePassword', e.target.value); }
  function handleCity(e: any) { handleChanges('city', e.target.value); }
  function handleFirstName(e: any) { handleChanges('firstName', e.target.value); }
  function handleLastName(e: any) { handleChanges('lastName', e.target.value); }

  if (redirect) { return <Redirect to="/login" /> }

  return (
    <div className="register-page">
      <div className="register-inputs-wrapper">
        <IonItem color="light">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" pattern="email" value={email} onIonChange={handleEmail}></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={handlePassword}></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Repeat Password</IonLabel>
          <IonInput type="password" value={rePassword} onIonChange={handleRePassword}></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">City</IonLabel>
          <IonInput type="text" value={city} onIonChange={handleCity}></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput type="text" value={firstName} onIonChange={handleFirstName}></IonInput>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput type="text" value={lastName} onIonChange={handleLastName}></IonInput>
        </IonItem>
      </div>
      <div className="register-btn-wrapper">
        <IonButton fill="outline" color="success" className="register-btn" onClick={submit}>Registered</IonButton>
      </div>
      <div className="register-route-wrapper">
        <IonItem routerLink="/login" className="register-route" color="light">
          <IonLabel color="secondary">Do you have an account? Login</IonLabel>
        </IonItem>
      </div>
    </div>
  );
};

export default Register;
