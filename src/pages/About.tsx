import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';

import AboutThisApp from '../components/AboutThisApp';

const About: React.FC = () => {
  const logout = () => {
    console.log('logout clicked');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>About</IonTitle>
          <IonButtons slot="primary">
            <IonButton icon-only onClick={logout}>
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
