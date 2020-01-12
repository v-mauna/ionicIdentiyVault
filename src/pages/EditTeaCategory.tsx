import React, { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton
} from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router';

import UpdateTeaCategory from '../containers/UpdateTeaCategory';
import { TeaCategory } from '../models';
import { useDispatch } from 'react-redux';
import { update } from '../store/tea-category-actions';

interface EditTeaCategoryProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EditTeaCategory: React.FC<EditTeaCategoryProps> = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [category, setCategory] = useState<TeaCategory>();

  const categoryId = parseInt(match.params.id);

  const handleCategoryChange = (category: TeaCategory) => {
    setCategory({ ...category });
  };

  const handleSaveClicked = () => {
    if (category) {
      dispatch(update(category));
    }
    history.push('/tabs/home');
  };

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

      <IonContent>
        <UpdateTeaCategory id={categoryId} onCategoryChange={handleCategoryChange}></UpdateTeaCategory>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton expand="full" onClick={handleSaveClicked}>Save</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default EditTeaCategory;
