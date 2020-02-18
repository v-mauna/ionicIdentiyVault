import React from 'react';
import { useStore } from 'react-redux';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

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
        <IonToolbar>
          <IonTitle>About</IonTitle>
          <IonButtons slot="primary">
            <IonButton icon-only onClick={handleLogout}>
              <IonIcon icon={logOutOutline}></IonIcon>
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
