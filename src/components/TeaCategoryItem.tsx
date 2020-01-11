import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';

type TeaCategoryItemProps = {
  categoryId: number;
  title: string;
  description: string;
  onCategoryClick: (id: number) => void;
};

const TeaCategoryItem: React.FC<TeaCategoryItemProps> = ({categoryId, title, description, onCategoryClick }) => {
  const labelStyle = {
    whiteSpace: 'normal'
  };

  const handleClick = () => onCategoryClick(categoryId);

  return (
    <IonItem>
      <IonLabel style={labelStyle} onClick={handleClick}>
        <div className="title">{title}</div>
        <div>{description}</div>
      </IonLabel>
    </IonItem>
  );
};

export default TeaCategoryItem;
