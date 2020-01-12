import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import React from 'react';

import TeaCategories from '../containers/TeaCatgories';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
  const history = useHistory();

  const handleCategoryClick = (id: number) => history.push(`/tabs/home/edit-tea-category/${id}`);

  const handleLogout = () => history.push('/login');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Tea Categories</IonTitle>
          <IonButtons slot="primary">
            <IonButton icon-only onClick={handleLogout}>
              <IonIcon icon={logOut}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TeaCategories onCategoryClick={handleCategoryClick} ></TeaCategories>
      </IonContent>
    </IonPage>
  );
};

export default Home;
