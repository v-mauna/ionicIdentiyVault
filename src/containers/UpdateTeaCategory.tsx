import { connect } from 'react-redux';
import TeaCategoryEditor from '../components/TeaCategoryEditor';
import { getTeaCategory } from '../store';

const mapStateToProps = (state: any, props: {id: number}) => ({
  category: getTeaCategory(state, props.id)
});

export default connect(mapStateToProps)(TeaCategoryEditor);
