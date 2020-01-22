import { connect } from 'react-redux';
import AuthControlPanel from '../components/AuthControlPanel';
import { getAuthMode, getBiometricType } from '../store';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { update } from '../store/settings-actions.async';
import { updateAuthMode, lock } from '../store/auth-actions.async';

const mapStateToProps = (state: any) => ({
  authMode: getAuthMode(state),
  biometricType: getBiometricType(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  onAuthModeChanged: (authMode: AuthMode) => {
    dispatch(updateAuthMode({ authMode }));
    dispatch(update({ authMode }));
  },
  onLock: () => {
    dispatch(lock());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthControlPanel);
