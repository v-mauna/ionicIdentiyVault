import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { TeaCategory } from '../models';

type TeaCategoryItemProps = {
  category: TeaCategory;
  onCategoryClick: (id: number) => void;
};

const TeaCategoryItem: React.FC<TeaCategoryItemProps> = ({category, onCategoryClick }) => {
  const labelStyle = {
    whiteSpace: 'normal'
  };

  const handleClick = () => onCategoryClick(category.id);

  return (
    <IonItem>
      <IonLabel style={labelStyle} onClick={handleClick}>
        <div className="title">{category.name}</div>
        <div>{category.description}</div>
      </IonLabel>
    </IonItem>
  );
};

export default TeaCategoryItem;
