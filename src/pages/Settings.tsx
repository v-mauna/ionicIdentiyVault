import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { AuthMode } from '@ionic-enterprise/identity-vault';

import AuthControlPanel from '../components/AuthControlPanel';

const Settings: React.FC = () => {
  const handleAuthModeChanged = (newAuthMode: AuthMode) => console.log('New Auth Mode:', newAuthMode);
  const handleLock = () => console.log('Lock Clicked');
  const handleLogout = () => console.log('Logout Clicked');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="primary">
            <IonButton icon-only onClick={handleLogout}>
              <IonIcon icon={logOut}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AuthControlPanel
          authMode={AuthMode.BiometricAndPasscode}
          biometricType="touchID"
          onAuthModeChanged={handleAuthModeChanged}
          onLock={handleLock}
          onLogout={handleLogout}
        ></AuthControlPanel>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
