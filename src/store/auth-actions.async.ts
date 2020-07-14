import { authentication } from '../services/authentication.service';
import { identity } from '../services/identity.service';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import {
  loading,
  loadAuthModeSuccess,
  loadSuccess,
  loggingIn,
  loginSuccess,
  loggingOut,
  logoutSuccess,
  sessionCleared,
  sessionSet,
  lock,
} from './auth-actions';

export interface AuthPayload {
  email: string;
  password: string;
}

export const load = () => {
  return async (dispatch: any) => {
    dispatch(loading());
    const email = await identity.getEmail();
    console.log(email);
    dispatch(loadAuthMode());
    return dispatch(loadSuccess({ email }));
  };
};

const loadAuthMode = () => {
  return async (dispatch: any) => {
    const authMode = await identity.getAuthMode();
    const biometricType = await identity.getBiometricType();
    const hasSession = await identity.hasStoredSession();
    return dispatch(
      loadAuthModeSuccess({ authMode, biometricType, hasSession }),
    );
  };
};

export const login = (payload: AuthPayload) => {
  return async (dispatch: any) => {
    dispatch(loggingIn());
    const res = await authentication.login(payload.email, payload.password);
    if (res.success) {
      await identity.login({ username: res.user!.email, token: res.token! });
      dispatch(sessionSet({ email: res.user!.email }));
    }
    dispatch(loadAuthMode());
    return dispatch(loginSuccess({ success: res.success }));
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    dispatch(loggingOut());
    await authentication.logout();
    await identity.logout();
    dispatch(sessionCleared());
    dispatch(loadAuthMode());
    return dispatch(logoutSuccess());
  };
};

export const lockSession = () => {
  return async (dispatch: any) => {
    await identity.lockOut();
    return dispatch(lock());
  };
};

export const unlock = () => {
  return async (dispatch: any) => {
    if (await identity.restoreSession()) {
      return dispatch(load());
    }
  };
};

export const updateAuthMode = (payload: { authMode: AuthMode }) => {
  return async (dispatch: any) => {
    await identity.setAuthMode(payload.authMode);
    return dispatch(loadAuthMode());
  };
};
