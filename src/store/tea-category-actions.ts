import { TeaCategory } from '../models';
import {teaCategories} from '../services/tea-catogories-api';

export enum TeaCategoryActionTypes {
  loading = '[Application] Loading Tea Categories',
  loadSuccess = '[Tea Category API] load success',
  loadFailure = '[Tea Category API] load failure',

  updating = '[Tea Category Editor] updating timer',
  updateSuccess = '[Tea Category API] update success',
  updateFailure = '[Tea Category API] update failure'
}

export const load = () => {
  return async (dispatch: any) => {
    dispatch(loading());
    const cats = await teaCategories.all();
    return dispatch(loadSuccess(cats));
  }
};

export const loading = () => ({
  type: TeaCategoryActionTypes.loading
})
export const loadSuccess = (payload: Array<TeaCategory>) => ({
  type: TeaCategoryActionTypes.loadSuccess, payload
});
export const loadFailure = (error: Error) => ({
  type: TeaCategoryActionTypes.loadFailure, error
});

export const update = (payload: TeaCategory) => {
  return async (dispatch: any) => {
    dispatch(updating(payload));
    const cat = await teaCategories.update(payload);
    return dispatch(updateSuccess(cat));
  }
};

export const updating = (payload: TeaCategory) => ({
  type: TeaCategoryActionTypes.updating, payload
});
export const updateSuccess = (payload: TeaCategory) => ({
  type: TeaCategoryActionTypes.updateSuccess, payload
});
export const updateFailure = (error: Error) => ({
  type: TeaCategoryActionTypes.updateFailure, error
});
