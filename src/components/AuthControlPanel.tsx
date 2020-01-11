import React, { useState } from 'react';
import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';
import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonToggle } from '@ionic/react';
import { lock, logOut } from 'ionicons/icons';

type AuthControlPanelProps = {
  biometricType: BiometricType;
  authMode: AuthMode;
  onAuthModeChanged: (authMode: AuthMode) => void;
  onLock: () => void;
  onLogout: () => void;
};

const AuthControlPanel: React.FC<AuthControlPanelProps> = ({
  authMode,
  biometricType,
  onAuthModeChanged,
  onLock,
  onLogout
}) => {
  const [biometrics, setBiometrics] = useState<boolean>(
    authMode === AuthMode.BiometricAndPasscode || authMode === AuthMode.BiometricOnly
  );
  const [passcode, setPasscode] = useState<boolean>(
    authMode === AuthMode.BiometricAndPasscode || authMode === AuthMode.PasscodeOnly
  );
  const [secureStorge, setSecureStorge] = useState<boolean>(authMode === AuthMode.SecureStorage);

  const toggleUseBiometrics = (evt: any) => {
    setBiometrics(evt.detail.checked);
    onAuthModeChanged(newAuthMode(evt.detail.checked, passcode));
  };

  const toggleUsePasscode = (evt: CustomEvent) => {
    setPasscode(evt.detail.checked);
    onAuthModeChanged(newAuthMode(biometrics, evt.detail.checked));
  };

  const toggleUseSecureStorage = (evt: CustomEvent) => {
    setSecureStorge(evt.detail.checked);
    if (evt.detail.checked) {
      setBiometrics(false);
      setPasscode(false);
      onAuthModeChanged(AuthMode.SecureStorage);
    } else {
      onAuthModeChanged(newAuthMode(biometrics, passcode));
    }
  };

  const newAuthMode = (biometrics: boolean, passcode: boolean): AuthMode => {
    if (biometrics && passcode) {
      return AuthMode.BiometricAndPasscode;
    }
    if (biometrics) {
      return AuthMode.BiometricOnly;
    }
    if (passcode) {
      return AuthMode.PasscodeOnly;
    }
    return AuthMode.InMemoryOnly;
  };

  return (
    <IonList>
      <IonItem>
        <IonLabel>Use Biometrics ({biometricType})</IonLabel>
        <IonToggle checked={biometrics} disabled={secureStorge} onIonChange={toggleUseBiometrics}></IonToggle>
      </IonItem>
      <IonItem>
        <IonLabel>Use Passcode</IonLabel>
        <IonToggle checked={passcode} disabled={secureStorge} onIonChange={toggleUsePasscode}></IonToggle>
      </IonItem>
      <IonItem>
        <IonLabel>Secure Storage Mode</IonLabel>
        <IonToggle checked={secureStorge} onIonChange={toggleUseSecureStorage}></IonToggle>
      </IonItem>
      <IonItem>
        <IonLabel>Lock</IonLabel>
        <IonButton onClick={onLock}>
          <IonIcon icon={lock}></IonIcon>
        </IonButton>
      </IonItem>
      <IonItem>
        <IonLabel>Logout</IonLabel>
        <IonButton onClick={onLogout}>
          <IonIcon icon={logOut}></IonIcon>
        </IonButton>
      </IonItem>
    </IonList>
  );
};

export default AuthControlPanel;
