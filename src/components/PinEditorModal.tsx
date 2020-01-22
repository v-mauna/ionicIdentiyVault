import React from 'react';
import PinEditor from './PinEditor';
import { IonModal } from '@ionic/react';

type PinEditorModalProps = {
  setPasscode: boolean;
  isOpen: boolean;
  onDidDismiss: () => void 
};

const PinEditorModal: React.FC<PinEditorModalProps> = ({setPasscode, isOpen, onDidDismiss}) => {
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
        <PinEditor setPasscode={setPasscode}></PinEditor>
      </IonModal>
    </>
  );
};

export default PinEditorModal;
