import React from 'react';
import { useHistory } from 'react-router';
import { useStore } from 'react-redux';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logOut } from 'ionicons/icons';

import TeaCategories from '../containers/TeaCatgories';
import { logout } from '../store/auth-actions';

const Home: React.FC = () => {
  const history = useHistory();
  const store = useStore();

  const handleCategoryClick = (id: number) => history.push(`/tabs/home/edit-tea-category/${id}`);

  const handleLogout = () => store.dispatch<any>(logout());

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
        <TeaCategories onCategoryClick={handleCategoryClick}></TeaCategories>
      </IonContent>
    </IonPage>
  );
};

export default Home;
