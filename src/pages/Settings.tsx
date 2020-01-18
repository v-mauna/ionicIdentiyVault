import React from 'react';
import { useStore } from 'react-redux';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';

import UpdateSettings from '../containers/UpdateSettings';
import { logout } from '../store/auth-actions';

const Settings: React.FC = () => {
  const store = useStore();

  const handleLogout = () => store.dispatch<any>(logout());

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
      <IonContent className="ion-padding">
        <UpdateSettings></UpdateSettings>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
