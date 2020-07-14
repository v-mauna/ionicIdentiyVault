import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';
import { SettingsActionTypes } from '../settings-actions';

interface SettingsState {
  loading: boolean;
  authMode?: AuthMode;
  biometricsAvailable?: boolean;
  biometricType?: BiometricType;
  error?: Error;
}

const settings = (state: SettingsState = { loading: false }, action: any) => {
  switch (action.type) {
    case SettingsActionTypes.loading:
    case SettingsActionTypes.updating:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case SettingsActionTypes.loadSuccess:
      return {
        ...state,
        loading: false,
        authMode: action.payload.authMode,
        biometricsAvailable: action.payload.biometricsAvailable,
        biometricType: action.payload.biometricType,
      };

    case SettingsActionTypes.updateSuccess:
      return {
        ...state,
        loading: false,
        authMode:
          action.payload.authMode === undefined
            ? state.authMode
            : action.payload.authMode,
        biometricsAvailable:
          action.payload.biometricsAvailable === undefined
            ? state.biometricsAvailable
            : action.payload.biometricsAvailable,
        biometricType:
          action.payload.biometricType === undefined
            ? state.biometricType
            : action.payload.biometricType,
      };

    case SettingsActionTypes.loadFailure:
    case SettingsActionTypes.updateFailure:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default settings;
