import { TeaCategoryActionTypes } from '../tea-category-actions';
import { TeaCategory } from '../../models';

const teaCategories = (
  state: {
    loading: boolean;
    categories?: Array<TeaCategory>;
    error?: Error;
  } = { loading: false, categories: [] },
  action: any,
) => {
  switch (action.type) {
    case TeaCategoryActionTypes.loading:
    case TeaCategoryActionTypes.updating:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case TeaCategoryActionTypes.loadSuccess:
      return {
        ...state,
        loading: false,
        categories: [...action.payload.map((cat: TeaCategory) => ({ ...cat }))],
      };
    case TeaCategoryActionTypes.updateSuccess:
      const idx = state.categories!.findIndex(
        cat => cat.id === action.payload.id,
      );
      return {
        ...state,
        loading: false,
        categories: [
          ...state.categories!.slice(0, idx),
          action.payload,
          ...state.categories!.slice(idx + 1),
        ],
      };

    case TeaCategoryActionTypes.loadFailure:
    case TeaCategoryActionTypes.updateFailure:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default teaCategories;
