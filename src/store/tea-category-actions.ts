import { TeaCategory } from '../models';
import { teaCategories } from '../services/tea-catogories.service';

export enum TeaCategoryActionTypes {
  loading = '[Application] Loading Tea Categories',
  loadSuccess = '[Tea Category API] load success',
  loadFailure = '[Tea Category API] load failure',

  updating = '[Tea Category Editor] updating tea category',
  updateSuccess = '[Tea Category API] update success',
  updateFailure = '[Tea Category API] update failure',
}

export const load = () => {
  return async (dispatch: any) => {
    dispatch(loading());
    const cats = await teaCategories.all();
    return dispatch(loadSuccess(cats));
  };
};

export const loading = () => ({
  type: TeaCategoryActionTypes.loading,
});
export const loadSuccess = (payload: Array<TeaCategory>) => ({
  type: TeaCategoryActionTypes.loadSuccess,
  payload,
});
export const loadFailure = (error: Error) => ({
  type: TeaCategoryActionTypes.loadFailure,
  error,
});

export const update = (payload: TeaCategory) => {
  return async (dispatch: any) => {
    dispatch(updating());
    const cat = await teaCategories.update(payload);
    return dispatch(updateSuccess(cat));
  };
};

export const updating = () => ({
  type: TeaCategoryActionTypes.updating,
});
export const updateSuccess = (payload: TeaCategory) => ({
  type: TeaCategoryActionTypes.updateSuccess,
  payload,
});
export const updateFailure = (error: Error) => ({
  type: TeaCategoryActionTypes.updateFailure,
  error,
});
