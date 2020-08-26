import { AuthActionTypes, AuthStatus } from '../auth-actions';
import {
  AuthMode,
  BiometricType,
  VaultErrorCodes,
} from '@ionic-enterprise/identity-vault';

interface AuthState {
  loading: boolean;
  hasSession: boolean;
  status: AuthStatus;
  email?: string;
  recaptcha?: string;
  authMode?: AuthMode;
  biometricType?: BiometricType;
  showPinDialog?: boolean;
  setApplicationPin?: boolean;
  enteredPIN?: string;
  error?: Error;
}

const auth = (
    state: AuthState = {
    loading: false,
    hasSession: false,
    status: AuthStatus.Uninitialized,
    },
      action: any,
    ) => {
      switch (action.type) {
        case AuthActionTypes.loading:
        case AuthActionTypes.loggingOut:
          return {
            ...state,
            loading: true,
            error: undefined,
          };

        case AuthActionTypes.loggingIn:
          return {
            ...state,
            loading: true,
            error: undefined,
            email: undefined,
          };

        case AuthActionTypes.loadSuccess:
          return {
            ...state,
            loading: false,
            status: action.payload.email
              ? AuthStatus.LoggedIn
              : AuthStatus.LoggedOut,
            email: action.payload.email,
          };

        case AuthActionTypes.loadAuthModeSuccess:
          return {
            ...state,
            authMode: action.payload.authMode,
            biometricType: action.payload.biometricType,
            hasSession: action.payload.hasSession,
          };

        case AuthActionTypes.loginSuccess:
          return {
            ...state,
            loading: false,
            status: action.payload.success ? AuthStatus.LoggedIn : state.status,
            error: action.payload.success
              ? undefined
              : new Error('Invalid username or password'),
          };

        case AuthActionTypes.logoutSuccess:
        case AuthActionTypes.unauthorized:
          return {
            ...state,
            loading: false,
            status: AuthStatus.LoggedOut,
            email: undefined,
          };

        case AuthActionTypes.loginFailure:
        case AuthActionTypes.logoutFailure:
          return {
            ...state,
            loading: false,
            status: AuthStatus.Invalid,
            error: action.error,
          };

        case AuthActionTypes.sessionSet:
          return {
            ...state,
            email: action.payload.email,
          };

        case AuthActionTypes.sessionCleared:
          return {
            ...state,
            email: undefined,
          };

        case AuthActionTypes.lock:
          return {
            ...state,
            status: AuthStatus.LoggedOut,
          };

        case AuthActionTypes.setApplicationPIN:
          return {
            ...state,
            showPinDialog: true,
            setApplicationPin: true,
          };

        case AuthActionTypes.unlockApplicationWithPIN:
          return {
            ...state,
            showPinDialog: true,
            setApplicationPin: false,
            error: undefined,
          };

        case AuthActionTypes.enterPIN:
          return {
            ...state,
            showPinDialog: false,
            enteredPIN: action.payload.pin,
          };

        case AuthActionTypes.cancelPIN:
          return {
            ...state,
            showPinDialog: false,
            enteredPIN: undefined,
            error: {
              code: VaultErrorCodes.UserCanceledInteraction,
              message: 'User has canceled supplying the application passcode',
            },
          };

        default:
          return state;
      }
    };
export default auth;
