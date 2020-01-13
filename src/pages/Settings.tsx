import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { useHistory } from 'react-router';

import UpdateSettings from '../containers/UpdateSettings';

const Settings: React.FC = () => {
  const history = useHistory();

  const handleLock = () => console.log('Lock Clicked');
  const handleLogout = () => history.push('/login');

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
        <UpdateSettings onLock={handleLock} onLogout={handleLogout}></UpdateSettings>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
