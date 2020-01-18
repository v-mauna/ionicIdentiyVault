import { authentication } from '../services/authentication.service';
import { identity } from '../services/identity.service';

export interface AuthPayload {
  email: string;
  password: string;
}

export interface SessionPayload {
  email?: string | null;
  token?: string | null;
}

export interface LoginPayload {
  success: boolean;
}

export enum AuthStatus {
  Uninitialized,
  LoggedIn,
  LoggedOut,
  Invalid
}

export enum AuthActionTypes {
  loading = '[Application] Loading Authentication',
  loadSuccess = '[Authentication API] load success',
  loadFailure = '[Authentication API] load failure',

  loggingIn = '[Application] logging in',
  loginSuccess = '[Authentication API] login success',
  loginFailure = '[Authentication API] login failure',

  loggingOut = '[Application] logging out',
  logoutSuccess = '[Authentication API] logout success',
  logoutFailure = '[Authentication API] logout failure',

  unauthorized = '[Data API] unauthorized',

  sessionSet = '[Identity API] session set',
  sessionLocked = '[Identity API] session locked',
  sessionUnLocked = '[Identity API] session unlocked',
  sessionCleared = '[Identity API] session cleared'
}

export const load = () => {
  return async (dispatch: any) => {
    dispatch(loading());
    const token = await identity.getToken();
    const email = await identity.getEmail();
    return dispatch(loadSuccess({ email, token }));
  };
};

export const loading = () => ({
  type: AuthActionTypes.loading
});
export const loadSuccess = (payload: SessionPayload) => ({
  type: AuthActionTypes.loadSuccess,
  payload
});
export const loadFailure = (error: Error) => ({
  type: AuthActionTypes.loadFailure,
  error
});

export const login = (payload: AuthPayload) => {
  return async (dispatch: any) => {
    dispatch(loggingIn());
    const res = await authentication.login(payload.email, payload.password);
    if (res.success) {
      await identity.login({ username: res.user!.email, token: res.token! });
      dispatch(sessionSet({ email: res.user!.email, token: res.token }));
    }
    return dispatch(loginSuccess({ success: res.success }));
  };
};

export const loggingIn = () => ({
  type: AuthActionTypes.loggingIn
});
export const loginSuccess = (payload: LoginPayload) => ({
  type: AuthActionTypes.loginSuccess,
  payload
});
export const loginFailure = (error: Error) => ({
  type: AuthActionTypes.loginFailure,
  error
});

export const logout = () => {
  return async (dispatch: any) => {
    dispatch(loggingOut());
    await authentication.logout();
    await identity.logout();
    dispatch(sessionCleared());
    return dispatch(logoutSuccess());
  };
};

export const loggingOut = () => ({
  type: AuthActionTypes.loggingOut
});
export const logoutSuccess = () => ({
  type: AuthActionTypes.logoutSuccess
});
export const logoutFailure = (error: Error) => ({
  type: AuthActionTypes.logoutFailure,
  error
});

export const unauthorized = () => ({
  type: AuthActionTypes.unauthorized
});

export const sessionSet = (payload: SessionPayload) => ({
  type: AuthActionTypes.sessionSet,
  payload
});
export const sessionLocked = () => ({
  type: AuthActionTypes.sessionLocked
});
export const sessionUnLocked = (payload: SessionPayload) => ({
  type: AuthActionTypes.sessionUnLocked,
  payload
});
export const sessionCleared = () => ({
  type: AuthActionTypes.sessionCleared
});
