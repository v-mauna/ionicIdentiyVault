import TeaCategoryList from '../components/TeaCategoryList';
import { getTeaCategories } from '../store';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({
  categories: getTeaCategories(state)
});

export default connect(mapStateToProps)(TeaCategoryList);
