import { settings } from '../services/settings.service';
import {
  loading,
  loadSuccess,
  SettingsPayload,
  updating,
  updateSuccess,
} from './settings-actions';

export const load = () => {
  return async (dispatch: any) => {
    dispatch(loading());
    const authMode = await settings.getAuthMode();
    const biometricsAvailable = true;
    const biometricType = 'touchID';
    return dispatch(
      loadSuccess({ authMode, biometricsAvailable, biometricType }),
    );
  };
};

export const update = (payload: SettingsPayload) => {
  return async (dispatch: any) => {
    dispatch(updating());
    if (payload.authMode !== undefined) {
      await settings.setAuthMode(payload.authMode);
    }
    return dispatch(updateSuccess(payload));
  };
};
