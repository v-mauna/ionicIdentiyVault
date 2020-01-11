import React from 'react';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface EditTeaCategoryProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EditTeaCategory: React.FC<EditTeaCategoryProps> = ({ match }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Edit Tea Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Here we would get category {match.params.id}, and then pass that off to the editor</p>
      </IonContent>
    </IonPage>
  );
};

export default EditTeaCategory;
