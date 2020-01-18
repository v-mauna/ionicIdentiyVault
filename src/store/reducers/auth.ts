import { AuthActionTypes, AuthStatus } from '../auth-actions';

interface AuthState {
  loading: boolean;
  status: AuthStatus;
  email?: string;
  token?: string;
  error?: Error;
}

const auth = (state: AuthState = { loading: false, status: AuthStatus.Uninitialized }, action: any) => {
  switch (action.type) {
    case AuthActionTypes.loading:
    case AuthActionTypes.loggingOut:
      return {
        ...state,
        loading: true,
        error: undefined
      };

    case AuthActionTypes.loggingIn:
      return {
        ...state,
        loading: true,
        error: undefined,
        email: undefined,
        token: undefined
      };

    case AuthActionTypes.loadSuccess:
      return {
        ...state,
        loading: false,
        status: action.payload.token ? AuthStatus.LoggedIn : AuthStatus.LoggedOut,
        email: action.payload.email,
        token: action.payload.token
      };

    case AuthActionTypes.loginSuccess:
      return {
        ...state,
        loading: false,
        status: action.payload.success ? AuthStatus.LoggedIn : state.status
      };

    case AuthActionTypes.logoutSuccess:
    case AuthActionTypes.unauthorized:
      return {
        ...state,
        loading: false,
        status: AuthStatus.LoggedOut,
        email: undefined,
        token: undefined
      };

    case AuthActionTypes.loadFailure:
    case AuthActionTypes.loginFailure:
    case AuthActionTypes.logoutFailure:
      return {
        ...state,
        loading: false,
        status: AuthStatus.Invalid,
        error: action.error
      };

    case AuthActionTypes.sessionSet:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token
      };

    case AuthActionTypes.sessionLocked:
    case AuthActionTypes.sessionCleared:
      return {
        ...state,
        email: undefined,
        token: undefined
      };

    default:
      return state;
  }
};
export default auth;
