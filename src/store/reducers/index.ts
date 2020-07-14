import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import teaCategories from './tea-categories';

export default combineReducers({
  auth,
  settings,
  teaCategories,
});
