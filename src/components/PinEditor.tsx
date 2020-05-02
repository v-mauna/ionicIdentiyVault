import React, { useState, CSSProperties } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar
} from '@ionic/react';
import { useStore } from 'react-redux';
import { enterPIN, cancelPIN } from '../store/auth-actions';
import { close } from 'ionicons/icons';

type PinEditorProps = {
  setPasscode: boolean;
};

const PinEditor: React.FC<PinEditorProps> = ({ setPasscode }) => {
  const [prompt, setPrompt] = useState(setPasscode ? 'Enter PIN' : 'Enter PIN to Unlock');
  const [pin, setPin] = useState('');
  const [verifyPin, setVerifyPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const store = useStore();

  const promptStyle: CSSProperties = {
    fontSize: '2em',
    fontWeight: 'bold'
  };

  const pinStyle: CSSProperties = {
    fontSize: '3em',
    fontWeight: 'bold'
  };

  const errorStyle: CSSProperties = {
    fontSize: '1.5em',
    fontWeight: 'bold'
  };

  const gridStyle: CSSProperties = {
    paddingBottom: '32px'
  };

  const title = setPasscode ? 'Create PIN' : 'Unlock';
  const minPinLength = 3;
  const maxPinLength = 8;

  const append = (n: number) => {
    setErrorMessage('');
    setPin(pin + n.toString());
  };

  const deleteInput = () => {
    if (pin.length) {
      setPin(pin.slice(0, -1));
    }
  };

  const enter = () => {
    if (setPasscode) {
      if (!verifyPin) {
        setVerifyPin(pin);
        setPin('');
        setPrompt('Verify PIN');
      } else if (verifyPin !== pin) {
        setVerifyPin('');
        setPin('');
        setPrompt('Enter PIN');
        setErrorMessage('PINS do not match');
      } else {
        store.dispatch(enterPIN({ pin }));
      }
    } else {
      store.dispatch(enterPIN({ pin }));
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          {!setPasscode && (
            <IonButtons slot='primary'>
              <IonButton icon-only onClick={() => store.dispatch(cancelPIN())}>
                <IonIcon icon={close}></IonIcon>
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding ion-text-center'>
        <IonLabel>
          <div style={promptStyle}>{prompt}</div>
        </IonLabel>
        <IonLabel>
          <div style={pinStyle}>{'*'.repeat(pin.length)}</div>
        </IonLabel>
        <IonLabel>
          <div style={errorStyle}>{errorMessage}</div>
        </IonLabel>
      </IonContent>

      <IonFooter>
        <IonGrid style={gridStyle}>
          <IonRow>
            {[1, 2, 3].map((n) => (
              <IonCol key={n}>
                <IonButton
                  fill='outline'
                  expand='block'
                  onClick={() => append(n)}
                  disabled={pin.length === maxPinLength}
                >
                  {n}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            {[4, 5, 6].map((n) => (
              <IonCol key={n}>
                <IonButton
                  fill='outline'
                  expand='block'
                  onClick={() => append(n)}
                  disabled={pin.length === maxPinLength}
                >
                  {n}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            {[7, 8, 9].map((n) => (
              <IonCol key={n}>
                <IonButton
                  fill='outline'
                  expand='block'
                  onClick={() => append(n)}
                  disabled={pin.length === maxPinLength}
                >
                  {n}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton fill='outline' color='tertiary' expand='block' onClick={deleteInput} disabled={!pin.length}>
                Delete
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton fill='outline' expand='block' onClick={() => append(0)} disabled={pin.length === maxPinLength}>
                0
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                fill='outline'
                color='secondary'
                expand='block'
                onClick={enter}
                disabled={pin.length < minPinLength}
              >
                Enter
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </>
  );
};

export default PinEditor;
