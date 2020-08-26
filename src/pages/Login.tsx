import React, { useState, useEffect, CSSProperties } from 'react';
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
import { useStore } from 'react-redux';
import UnlockPanel from '../components/UnlockPanel';
import { login } from '../store/auth-actions.async';
import { getAuthError } from '../store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const store = useStore();

  const loginButtonStyle: CSSProperties = {
    marginTop: '3em'
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const error = getAuthError(store.getState());
      setErrorMessage(error ? error.message : '');
    });

    return unsubscribe;
  });

  const handleSignIn = () => {
    const recaptcha:string = 'fakeValue',
          call:string = 'login',
          version:string = '1';
    store.dispatch<any>(login({ email, password, recaptcha, call, version }));
    setPassword('');
    setEmail('');
  };
  const handleEmailChange = (evt: CustomEvent) => setEmail(evt.detail.value);
  const handlePasswordChange = (evt: CustomEvent) => setPassword(evt.detail.value);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput value={email} onIonChange={handleEmailChange}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={handlePasswordChange}></IonInput>
          </IonItem>
        </IonList>

        <IonButton expand="block" fill="outline" style={loginButtonStyle} onClick={handleSignIn}>
          Sign In
        </IonButton>
        <div className="error-message">{errorMessage}</div>
        <UnlockPanel></UnlockPanel>
      </IonContent>
    </IonPage>
  );
};

export default Login;
