import { combineReducers } from 'redux';
import settings from './settings';
import teaCategories from './tea-categories';

export default combineReducers({
  settings,
  teaCategories
});
