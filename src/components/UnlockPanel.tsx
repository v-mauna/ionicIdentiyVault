import React from 'react';
import { connect } from 'react-redux';
import { IonIcon } from '@ionic/react';
import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';
import { lockOpenOutline } from 'ionicons/icons';

import { getHasSession, getBiometricType, getVaultAuthMode } from '../store';
import { unlock } from '../store/auth-actions.async';

type TeaCategoryItemProps = {
  authMode: AuthMode;
  bioType: BiometricType;
  hasSession: boolean;
  onUnlock: () => void;
};

const UnlockPanel: React.FC<TeaCategoryItemProps> = ({ authMode, bioType, hasSession, onUnlock }) => {
  let prompt: string = 'Unknown';
  switch (authMode) {
    case AuthMode.PasscodeOnly:
      prompt = 'Passcode';
      break;
    case AuthMode.BiometricOnly:
      prompt = `${bioType === 'faceID' ? 'FaceID' : 'TouchID'}`;
      break;
    case AuthMode.BiometricAndPasscode:
      prompt = `${bioType === 'faceID' ? 'FaceID' : 'TouchID'} with Passcode Fallback`;
      break;
    default:
      break;
  }

  if (hasSession && authMode !== AuthMode.InMemoryOnly) {
    return (
      <>
        <div className="unlock-app ion-text-center" onClick={onUnlock}>
          <IonIcon icon={lockOpenOutline}></IonIcon>
          <div>{prompt}</div>
        </div>
      </>
    );
  }

  return <> </>;
};

const mapStateToProps = (state: any) => ({
  authMode: getVaultAuthMode(state),
  bioType: getBiometricType(state),
  hasSession: getHasSession(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  onUnlock: () => {
    dispatch(unlock());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UnlockPanel);
