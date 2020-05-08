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

import TeaCategoryEditor from '../components/TeaCategoryEditor';
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

  const updateCategory = () => {
    if (category) {
      dispatch(update(category));
    }
    history.push('/tabs/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Edit Tea Category</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <TeaCategoryEditor id={categoryId} onCategoryChange={handleCategoryChange}></TeaCategoryEditor>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton fill="outline" expand="block" onClick={updateCategory}>
            Save
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default EditTeaCategory;
