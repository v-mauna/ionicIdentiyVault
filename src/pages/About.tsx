import React from 'react';
import { useStore } from 'react-redux';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';

import AboutThisApp from '../components/AboutThisApp';
import { logout } from '../store/auth-actions';

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
        <AboutThisApp email="test@testy.org" authMode="No Auth" bioType="BioFuel"></AboutThisApp>
      </IonContent>
    </IonPage>
  );
};

export default About;
