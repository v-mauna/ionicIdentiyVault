import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';
import { settings } from '../services/settings.service';

export interface SettingsPayload {
  authMode?: AuthMode;
  biometricsAvailable?: boolean;
  biometricType?: BiometricType;
}

export enum SettingsActionTypes {
  loading = '[Application] Loading Settings',
  loadSuccess = '[Settings API] load success',
  loadFailure = '[Settings API] load failure',

  updating = '[Settings Editor] updating settings',
  updateSuccess = '[Settings API] update success',
  updateFailure = '[Settings API] update failure'
}

export const load = () => {
  return async (dispatch: any) => {
    dispatch(loading());
    const authMode = await settings.getAuthMode();
    const biometricsAvailable = true;
    const biometricType = 'touchID';
    return dispatch(loadSuccess({ authMode, biometricsAvailable, biometricType }));
  };
};

export const loading = () => ({
  type: SettingsActionTypes.loading
});
export const loadSuccess = (payload: SettingsPayload) => ({
  type: SettingsActionTypes.loadSuccess,
  payload
});
export const loadFailure = (error: Error) => ({
  type: SettingsActionTypes.loadFailure,
  error
});

export const update = (payload: SettingsPayload) => {
  return async (dispatch: any) => {
    dispatch(updating());
    if (payload.authMode !== undefined) {
      await settings.setAuthMode(payload.authMode);
    }
    return dispatch(updateSuccess(payload));
  };
};

export const updating = () => ({
  type: SettingsActionTypes.updating
});
export const updateSuccess = (payload: SettingsPayload) => ({
  type: SettingsActionTypes.updateSuccess,
  payload
});
export const updateFailure = (error: Error) => ({
  type: SettingsActionTypes.updateFailure,
  error
});
