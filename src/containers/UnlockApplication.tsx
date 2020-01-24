import { connect } from 'react-redux';
import UnlockPanel from '../components/UnlockPanel';
import { unlock } from '../store/auth-actions.async';
import { getHasSession, getBiometricType, getVaultAuthMode } from '../store';

const mapStateToProps = (state: any) => ({
  authMode: getVaultAuthMode(state),
  bioType: getBiometricType(state),
  hasSession: getHasSession(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  onUnlock: () => {
    dispatch(unlock());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UnlockPanel);
