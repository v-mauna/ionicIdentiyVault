import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';
import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonToggle } from '@ionic/react';
import { lockClosedOutline } from 'ionicons/icons';

import { getAuthMode, getBiometricType } from '../store';
import { update } from '../store/settings-actions.async';
import { updateAuthMode, lockSession } from '../store/auth-actions.async';

type AuthControlPanelProps = {
  biometricType: BiometricType;
  authMode: AuthMode;
  onAuthModeChanged: (authMode: AuthMode) => void;
  onLock: () => void;
};

const AuthControlPanel: React.FC<AuthControlPanelProps> = ({ authMode, biometricType, onAuthModeChanged, onLock }) => {
  const [biometrics, setBiometrics] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<boolean>(false);
  const [secureStorge, setSecureStorge] = useState<boolean>(false);

  useEffect(() => {
    setBiometrics(authMode === AuthMode.BiometricAndPasscode || authMode === AuthMode.BiometricOnly);
    setPasscode(authMode === AuthMode.BiometricAndPasscode || authMode === AuthMode.PasscodeOnly);
    setSecureStorge(authMode === AuthMode.SecureStorage);
  }, [authMode]);

  const toggleUseBiometrics = () => {
    onAuthModeChanged(newAuthMode(!biometrics, passcode, secureStorge));
  };

  const toggleUsePasscode = () => {
    onAuthModeChanged(newAuthMode(biometrics, !passcode, secureStorge));
  };

  const toggleUseSecureStorage = () => {
    if (!secureStorge) {
      setBiometrics(false);
      setPasscode(false);
    }
    onAuthModeChanged(newAuthMode(biometrics, passcode, !secureStorge));
  };

  const newAuthMode = (biometrics: boolean, passcode: boolean, secureStorge: boolean): AuthMode => {
    if (secureStorge) {
      return AuthMode.SecureStorage;
    }
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
        <IonToggle checked={biometrics} disabled={secureStorge} onClick={toggleUseBiometrics}></IonToggle>
      </IonItem>
      <IonItem>
        <IonLabel>Use Passcode</IonLabel>
        <IonToggle checked={passcode} disabled={secureStorge} onClick={toggleUsePasscode}></IonToggle>
      </IonItem>
      <IonItem>
        <IonLabel>Secure Storage Mode</IonLabel>
        <IonToggle checked={secureStorge} onClick={toggleUseSecureStorage}></IonToggle>
      </IonItem>
      <IonItem>
        <IonLabel>Lock</IonLabel>
        <IonButton onClick={onLock} fill="outline">
          <IonIcon icon={lockClosedOutline}></IonIcon>
        </IonButton>
      </IonItem>
    </IonList>
  );
};

const mapStateToProps = (state: any) => ({
  authMode: getAuthMode(state),
  biometricType: getBiometricType(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  onAuthModeChanged: (authMode: AuthMode) => {
    dispatch(updateAuthMode({ authMode }));
    dispatch(update({ authMode }));
  },
  onLock: () => {
    dispatch(lockSession());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthControlPanel);
