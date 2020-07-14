import { Plugins } from '@capacitor/core';
import {
  BiometricType,
  IdentityVault,
  PluginConfiguration,
  AuthMode,
  SupportedBiometricType,
} from '@ionic-enterprise/identity-vault';

const { Storage } = Plugins;

export class BrowserAuthService implements IdentityVault {
  config = {
    authMode: AuthMode.SecureStorage,
    descriptor: {
      username: '',
      vaultId: '',
    },
    isBiometricsEnabled: false,
    isPasscodeEnabled: false,
    isPasscodeSetupNeeded: false,
    isSecureStorageModeEnabled: true,
    hideScreenOnBackground: false,
    lockAfter: 50000,
  };

  unsubscribe(): Promise<void> {
    return Promise.resolve();
  }

  clear(): Promise<void> {
    return Storage.clear();
  }

  lock(): Promise<void> {
    return Promise.resolve();
  }

  isLocked(): Promise<boolean> {
    return Promise.resolve(false);
  }

  async isInUse(): Promise<boolean> {
    const { value } = await Storage.get({ key: 'session' });
    return !!value;
  }

  getAvailableHardware(): Promise<SupportedBiometricType[]> {
    return Promise.resolve([]);
  }

  getConfig(): Promise<PluginConfiguration> {
    return Promise.resolve(this.config);
  }

  remainingAttempts(): Promise<number> {
    return Promise.resolve(5);
  }

  getUsername(): Promise<string> {
    return Promise.resolve('MyUsername');
  }

  storeToken(token: any): Promise<void> {
    return Promise.resolve();
  }

  getToken(): Promise<any> {
    return Promise.resolve('MyToken');
  }

  async storeValue(key: string, value: any): Promise<void> {
    await Storage.set({ key, value: JSON.stringify(value) });
  }

  async getValue(key: string): Promise<any> {
    const { value } = await Storage.get({ key });
    return value && JSON.parse(value);
  }

  async removeValue(key: string): Promise<void> {
    await Storage.remove({ key });
  }

  async getKeys(): Promise<Array<string>> {
    const { keys } = await Storage.keys();
    return keys;
  }

  getBiometricType(): Promise<BiometricType> {
    const none: BiometricType = 'none';
    return Promise.resolve(none);
  }

  setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  isBiometricsEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsAvailable(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsSupported(): Promise<boolean> {
    return Promise.resolve(false);
  }

  async isLockedOutOfBiometrics(): Promise<boolean> {
    return false;
  }

  isPasscodeSetupNeeded(): Promise<boolean> {
    return Promise.resolve(false);
  }

  setPasscode(passcode?: string): Promise<void> {
    return Promise.resolve();
  }

  isPasscodeEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isSecureStorageModeEnabled(): Promise<boolean> {
    return Promise.resolve(true);
  }

  setPasscodeEnabled(isPasscodeEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  setSecureStorageModeEnabled(enabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  unlock(usingPasscode?: boolean, passcode?: string): Promise<void> {
    return Promise.resolve();
  }
}

export const browserAuthService = new BrowserAuthService();
