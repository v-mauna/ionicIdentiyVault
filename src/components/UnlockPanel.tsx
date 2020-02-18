import React from 'react';
import { IonIcon } from '@ionic/react';
import { lockOpenOutline } from 'ionicons/icons';
import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';

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

export default UnlockPanel;
