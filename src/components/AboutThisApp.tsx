import React from 'react';
import { connect } from 'react-redux';
import { AuthMode } from '@ionic-enterprise/identity-vault';

import { getEMail, getBiometricType, getVaultAuthMode } from '../store';

type AboutProps = {
  email: string;
  authMode: string;
  bioType: string;
};

const AboutThisApp: React.FC<AboutProps> = ({ email, authMode, bioType }) => {
  const logoStyle = {
    height: '100px'
  };

  return (
    <>
      <img src="assets/img/appicon.svg" alt="[Ionic Logo]" style={logoStyle} />
      <h1>Ionic Identity Vault</h1>
      <h2>Demo Application</h2>
      <h3>Identity Vault Version 4.1.0</h3>
      <h3>Current User: {email}</h3>
      <h4>Authentication Mode: {authMode}</h4>
      <h4>Biometrics Type: {bioType}</h4>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  email: getEMail(state),
  authMode: AuthMode[getVaultAuthMode(state)],
  bioType: getBiometricType(state)
});

export default connect(mapStateToProps)(AboutThisApp);
