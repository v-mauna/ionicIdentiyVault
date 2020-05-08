import React from 'react';
import { connect } from 'react-redux';
import { IonList } from '@ionic/react';

import { TeaCategory } from '../models';
import { getTeaCategories } from '../store';
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

const mapStateToProps = (state: any) => ({
  categories: getTeaCategories(state)
});

export default connect(mapStateToProps)(TeaCategoryList);
