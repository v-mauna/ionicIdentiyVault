import React from 'react';
import { connect } from 'react-redux';
import { IonModal } from '@ionic/react';

import { getShowPinDialog, getIsSetApplicationPinMode } from '../store';
import PinEditor from './PinEditor';

type PinEditorModalProps = {
  setPasscode: boolean;
  isOpen: boolean;
  onDidDismiss: () => void;
};

const PinEditorModal: React.FC<PinEditorModalProps> = ({ setPasscode, isOpen, onDidDismiss }) => {
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
        <PinEditor setPasscode={setPasscode}></PinEditor>
      </IonModal>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isOpen: getShowPinDialog(state),
  setPasscode: getIsSetApplicationPinMode(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  onDidDismiss: () => console.log('did dismiss...')
});

export default connect(mapStateToProps, mapDispatchToProps)(PinEditorModal);
