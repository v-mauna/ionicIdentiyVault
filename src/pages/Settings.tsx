import React from 'react';
import { useStore } from 'react-redux';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

import AuthControlPanel from '../components/AuthControlPanel';
import { logout } from '../store/auth-actions.async';

const Settings: React.FC = () => {
  const store = useStore();

  const handleLogout = () => store.dispatch<any>(logout());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="primary">
            <IonButton icon-only onClick={handleLogout}>
              <IonIcon icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <AuthControlPanel></AuthControlPanel>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
