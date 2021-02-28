import React, { useState } from 'react';
import { observer } from 'mobx-react';

// Components
import Logo from '../components/Logo';
import {
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonIcon,
  IonPage,
  IonContent,
  IonList
} from '@ionic/react';

// Icons
import { arrowForward } from 'ionicons/icons';

// Interfaces
import { ILoginProps } from '../interfaces/interfaces';

export const Login = observer(({ authManager, validationManager, messageManager }: ILoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function submit() {
    const error = validationManager.getLoginError(email, password);

    if (error) {
      messageManager.addErrorMessage(error);
      return;
    }

    authManager.login(email, password);
  }

  function handleEmail(e: any) {
    setEmail(e.target.value);
  }

  function handlePassword(e: any) {
    setPassword(e.target.value);
  }

  return (
    <IonPage>
      <IonContent>
        <Logo height="50vh" />

        <IonList className="login-list">
          <IonItem color="light">
            <IonLabel position="floating">
              Email
            </IonLabel>

            <IonInput type="email" value={email} onIonChange={handleEmail} />
          </IonItem>

          <IonItem color="light">
            <IonLabel position="floating">
              Password
            </IonLabel>

            <IonInput type="password" value={password} onIonChange={handlePassword} />
          </IonItem>

          <IonButton color="success" fill="outline" className="login-btn" onClick={submit}>
            LogIn

            <IonIcon slot="end" ios={arrowForward} md={arrowForward} />
          </IonButton>

          <IonItem routerLink="/register" className="register-route">
            <IonLabel color="secondary">
              Don't have an account? Register
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
})
