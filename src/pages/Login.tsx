import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router';
import { useStore } from 'react-redux';
import { login } from '../store/auth-actions';

const Login: React.FC = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage] = useState();
  const store = useStore();

  const handleSignIn = () => {
    store.dispatch<any>(login({ email, password }));
  };
  const handleEmailChange = (evt: CustomEvent) => setEmail(evt.detail.value);
  const handlePasswordChange = (evt: CustomEvent) => setPassword(evt.detail.value);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">E-Main Address</IonLabel>
            <IonInput value={email} onIonChange={handleEmailChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={handlePasswordChange}></IonInput>
          </IonItem>
        </IonList>

        <IonButton expand="full" onClick={handleSignIn}>
          Sign In
        </IonButton>
        <div className="error-message">{errorMessage}</div>
        {/* 

TODO: this bit should be a component

    <div class="unlock-app ion-text-center" *ngIf="displayVaultLogin" (click)="unlockClicked()">
      <ion-icon name="unlock"></ion-icon>
      <div>{{ loginType }}</div>
    </div>

    <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" class="error-message">
      <div *ngIf="emailInput.errors.email">
        E-Mail Address must have a valid format
      </div>
    </div>

  </form> */}
      </IonContent>
    </IonPage>
  );
};

export default Login;
