export interface AuthPayload {
  email?:string,
  password?:string,
  token?:string
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
  logoutFailure = '[Authentication API] logout failure'
}


export const load = () => {
  return async (dispatch: any) => {
    dispatch(loading());
    await new Promise(resolve => setTimeout(() => {
      resolve()
    }, 1500));
    return dispatch(loadSuccess({email:'test@test.com', token:'I ama happy token'}));
    // return dispatch(loadSuccess({}));
  };
};

export const loading = () => ({
  type: AuthActionTypes.loading
});
export const loadSuccess = (payload: AuthPayload) => ({
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
    const res = await new Promise(resolve => setTimeout(() => {
      resolve({email: payload.email, token: 'IAmAHappyToken'})
    }, 1500));
    return dispatch(loginSuccess(res as any));
  };
};

export const loggingIn = () => ({
  type: AuthActionTypes.loggingIn
});
export const loginSuccess = (payload: AuthPayload) => ({
  type: AuthActionTypes.loginSuccess,
  payload
});
export const loginFailure = (error: Error) => ({
  type: AuthActionTypes.loginFailure,
  error
});

export const logout = () => {
  return async (dispatch: any) => {
    dispatch(loggingIn());
    await new Promise(resolve => setTimeout(() => {
      resolve()
    }, 1500));
    return dispatch(logoutSuccess());
  };
};

export const loggingOut = () => ({
  type: AuthActionTypes.loading
});
export const logoutSuccess = () => ({
  type: AuthActionTypes.logoutSuccess
});
export const logoutFailure = (error: Error) => ({
  type: AuthActionTypes.logoutFailure,
  error
});
