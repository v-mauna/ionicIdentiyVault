import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, CombinedState, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import { TeaCategory } from '../models';

const loggerMiddleware = createLogger();

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export const getTeaCategories = (store: CombinedState<{ teaCategories: any }>) => {
  return store.teaCategories.categories;
};

export const getTeaCategory = (store: CombinedState<{ teaCategories: any }>, id: number) => {
  return store.teaCategories.categories.find((cat: TeaCategory) => cat.id === id);
};

export const getAuthMode = (store: CombinedState<{ settings: any }>) => {
  return store.settings.authMode;
};

export const getBiometricsAvailable = (store: CombinedState<{ settings: any }>) => {
  return store.settings.biometricsAvailable;
};

export const getBiometricType = (store: CombinedState<{ settings: any }>) => {
  return store.settings.biometricType;
};
