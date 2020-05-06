import React from 'react';
import { IonList } from '@ionic/react';

import { TeaCategory } from '../models';
import TeaCategoryItem from './TeaCategoryItem';

type TeaCategoryProps = {
  categories: Array<TeaCategory>;
};

const TeaCategoryList: React.FC<TeaCategoryProps> = ({ categories }) => {
  return (
    <IonList>
      {categories.map((cat) => (
        <TeaCategoryItem key={cat.id} category={cat}></TeaCategoryItem>
      ))}
    </IonList>
  );
};

export default TeaCategoryList;
