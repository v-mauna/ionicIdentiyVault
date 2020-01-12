import React from 'react';
import { IonList } from '@ionic/react';

import { TeaCategory } from '../models';
import TeaCategoryItem from './TeaCategoryItem';

type TeaCategoryProps = {
  categories: Array<TeaCategory>;
  onCategoryClick: (id: number) => void;
};

const TeaCategoryList: React.FC<TeaCategoryProps> = ({ categories, onCategoryClick }) => {
  return (
    <IonList>
      {categories.map(cat => (
        <TeaCategoryItem
          key={cat.id}
          category={cat}
          onCategoryClick={onCategoryClick}
        ></TeaCategoryItem>
      ))}
    </IonList>
  );
};

export default TeaCategoryList;
