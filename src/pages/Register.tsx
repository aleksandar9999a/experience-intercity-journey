import React, { useState } from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonPage
} from '@ionic/react';

// Interfaces
import { IRegisterProps } from '../interfaces/interfaces';


export const Register = observer(({ userService, validationManager, messageService }: IRegisterProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  function submit() {
    return validationManager.getRegisterError(email, password, rePassword, city, firstName, lastName)
      .then(_ => {
        return userService.registered({ email, password, city, firstName, lastName });
      })
      .catch(error => {
        messageService.addErrorMessage(error.message);
      })
  }

  function handleEmail(e: any) {
    setEmail(e.target.value);
  }

  function handlePassword(e: any) {
    setPassword(e.target.value);
  }
 
  function handleRePassword(e: any) {
    setRePassword(e.target.password);
  }

  function handleCity(e: any) {
    setCity(e.target.password);
  }

  function handleFirstName(e: any) {
    setFirstName(e.target.password);
  }

  function handleLastName(e: any) {
    setLastName(e.target.password);
  }

  return (
    <IonPage>
      <div className="register-page">
        <div className="register-inputs-wrapper">
          <IonItem color="light">
            <IonLabel position="floating">
              Email
            </IonLabel>

            <IonInput type="email" pattern="email" value={email} onIonChange={handleEmail} />
          </IonItem>

          <IonItem color="light">
            <IonLabel position="floating">
              Password
            </IonLabel>

            <IonInput type="password" value={password} onIonChange={handlePassword} />
          </IonItem>

          <IonItem color="light">
            <IonLabel position="floating">
              Repeat Password
            </IonLabel>

            <IonInput type="password" value={rePassword} onIonChange={handleRePassword} />
          </IonItem>

          <IonItem color="light">
            <IonLabel position="floating">
              City
            </IonLabel>

            <IonInput type="text" value={city} onIonChange={handleCity} />
          </IonItem>

          <IonItem color="light">
            <IonLabel position="floating">
              First Name
            </IonLabel>

            <IonInput type="text" value={firstName} onIonChange={handleFirstName} />
          </IonItem>

          <IonItem color="light">
            <IonLabel position="floating">
              Last Name
            </IonLabel>

            <IonInput type="text" value={lastName} onIonChange={handleLastName} />
          </IonItem>
        </div>

        <div className="register-btn-wrapper">
          <IonButton fill="outline" color="success" className="register-btn" onClick={submit}>
            Registered
          </IonButton>
        </div>

        <div className="register-route-wrapper">
          <IonItem routerLink="/login" className="register-route" color="light">
            <IonLabel color="secondary">
              Do you have an account? Login
            </IonLabel>
          </IonItem>
        </div>
      </div>
    </IonPage>
  );
})
