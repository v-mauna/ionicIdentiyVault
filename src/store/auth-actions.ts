import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';

export interface AuthModePayload {
  authMode: AuthMode;
  biometricType: BiometricType;
  hasSession: boolean;
}

export interface SessionPayload {
  email?: string | null;
}

export interface LoginPayload {
  success: boolean;
}

export interface PINPayload {
  pin: string;
}

export enum AuthStatus {
  Uninitialized,
  LoggedIn,
  LoggedOut,
  Invalid,
}

export enum AuthActionTypes {
  loading = '[Application] Loading Authentication',
  loadSuccess = '[Authentication API] load success',
  loadAuthModeSuccess = '[Store] load auth mode success',

  loggingIn = '[Application] logging in',
  loginSuccess = '[Authentication API] login success',
  loginFailure = '[Authentication API] login failure',

  loggingOut = '[Application] logging out',
  logoutSuccess = '[Authentication API] logout success',
  logoutFailure = '[Authentication API] logout failure',

  unauthorized = '[Data API] unauthorized',

  sessionSet = '[Identity API] session set',
  sessionCleared = '[Identity API] session cleared',

  lock = '[Identity API] session locked',

  setApplicationPIN = '[Identity API] set application pin',
  unlockApplicationWithPIN = '[Identity API] unlock with pin',
  enterPIN = '[PIN Editor] enter pin',
  cancelPIN = '[PIN Editor] cancel pin entry',
}

export const loading = () => ({
  type: AuthActionTypes.loading,
});
export const loadSuccess = (payload: SessionPayload) => ({
  type: AuthActionTypes.loadSuccess,
  payload,
});
export const loadAuthModeSuccess = (payload: AuthModePayload) => ({
  type: AuthActionTypes.loadAuthModeSuccess,
  payload,
});

export const loggingIn = () => ({
  type: AuthActionTypes.loggingIn,
});
export const loginSuccess = (payload: LoginPayload) => ({
  type: AuthActionTypes.loginSuccess,
  payload,
});
export const loginFailure = (error: Error) => ({
  type: AuthActionTypes.loginFailure,
  error,
});

export const loggingOut = () => ({
  type: AuthActionTypes.loggingOut,
});
export const logoutSuccess = () => ({
  type: AuthActionTypes.logoutSuccess,
});
export const logoutFailure = (error: Error) => ({
  type: AuthActionTypes.logoutFailure,
  error,
});

export const unauthorized = () => ({
  type: AuthActionTypes.unauthorized,
});

export const sessionSet = (payload: SessionPayload) => ({
  type: AuthActionTypes.sessionSet,
  payload,
});
export const sessionCleared = () => ({
  type: AuthActionTypes.sessionCleared,
});

export const lock = () => ({
  type: AuthActionTypes.lock,
});

export const setApplicationPIN = () => ({
  type: AuthActionTypes.setApplicationPIN,
});

export const unlockApplicationWithPIN = () => ({
  type: AuthActionTypes.unlockApplicationWithPIN,
});

export const enterPIN = (payload: PINPayload) => ({
  type: AuthActionTypes.enterPIN,
  payload,
});

export const cancelPIN = () => ({
  type: AuthActionTypes.cancelPIN,
});
