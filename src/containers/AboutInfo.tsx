import AboutThisApp from '../components/AboutThisApp';
import { getEMail, getBiometricType, getVaultAuthMode } from '../store';
import { connect } from 'react-redux';
import { AuthMode } from '@ionic-enterprise/identity-vault';

const mapStateToProps = (state: any) => ({
  email: getEMail(state),
  authMode: AuthMode[getVaultAuthMode(state)],
  bioType: getBiometricType(state)
});

export default connect(mapStateToProps)(AboutThisApp);
