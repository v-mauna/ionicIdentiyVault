import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IonList, IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/react';

import { TeaCategory } from '../models';
import { getTeaCategory } from '../store';

type TeaCategoryEditorProps = {
  category: TeaCategory;
  onCategoryChange: (category: TeaCategory) => void;
};

const TeaCategoryEditor: React.FC<TeaCategoryEditorProps> = ({ category, onCategoryChange }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const handleNameChanged = (evt: CustomEvent) => {
    setName(evt.detail.value);
    onCategoryChange({
      ...category,
      name: evt.detail.value,
      description
    });
  };

  const handleDescriptionChanged = (evt: CustomEvent) => {
    setDescription(evt.detail.value);
    onCategoryChange({
      ...category,
      name,
      description: evt.detail.value
    });
  };

  return (
    <IonList>
      <IonItem>
        <IonLabel position="floating">Name</IonLabel>
        <IonInput value={name} required onIonChange={handleNameChanged}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Description</IonLabel>
        <IonTextarea value={description} required rows={5} onIonChange={handleDescriptionChanged}></IonTextarea>
      </IonItem>
    </IonList>
  );
};

const mapStateToProps = (state: any, props: { id: number }) => ({
  category: getTeaCategory(state, props.id)
});

export default connect(mapStateToProps)(TeaCategoryEditor);
