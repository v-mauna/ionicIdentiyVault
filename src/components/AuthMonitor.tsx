import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useStore } from 'react-redux';

import { AuthStatus } from '../store/auth-actions';
import { load as loadSettings } from '../store/settings-actions.async';
import { load as loadTeaCategories } from '../store/tea-category-actions';
import { getAuthStatus } from '../store';

const AuthMonitor: React.FC = () => {
  const history = useHistory();
  const store = useStore();

  useEffect(() => {
    let previousAuthStatus: number = store.getState().auth.status;
    const unsubscribe = store.subscribe(() => {
      const currentStatus = getAuthStatus(store.getState());
      if (previousAuthStatus !== currentStatus) {
        previousAuthStatus = currentStatus;
        if (currentStatus === AuthStatus.LoggedIn) {
          store.dispatch<any>(loadSettings());
          store.dispatch<any>(loadTeaCategories());
          history.replace('/tabs/home');
        } else {
          history.replace('/login');
        }
      }
    });
    return unsubscribe;
  });

  return <></>;
};

export default AuthMonitor;
