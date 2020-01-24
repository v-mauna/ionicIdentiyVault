import React from 'react';
import { useStore } from 'react-redux';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';

import AboutInfo from '../containers/AboutInfo';
import { logout } from '../store/auth-actions.async';

const About: React.FC = () => {
  const store = useStore();

  const handleLogout = () => {
    store.dispatch<any>(logout());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>About</IonTitle>
          <IonButtons slot="primary">
            <IonButton icon-only onClick={handleLogout}>
              <IonIcon icon={logOut}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center ion-padding">
        <AboutInfo></AboutInfo>
      </IonContent>
    </IonPage>
  );
};

export default About;
