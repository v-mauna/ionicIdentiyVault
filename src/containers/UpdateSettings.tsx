import { connect } from 'react-redux';
import AuthControlPanel from '../components/AuthControlPanel';
import { getAuthMode, getBiometricType } from '../store';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { update } from '../store/settings-actions';

const mapStateToProps = (state: any) => ({
  authMode: getAuthMode(state),
  biometricType: getBiometricType(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  onAuthModeChanged: (authMode: AuthMode) => dispatch(update({ authMode }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthControlPanel);
