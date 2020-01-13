import { Plugins } from '@capacitor/core';
import { AuthMode } from '@ionic-enterprise/identity-vault';

const { Storage } = Plugins;

class SettingsService {
  setAuthMode(value: AuthMode): Promise<void> {
    return Storage.set({ key: 'authMode', value: value.toString() });
  }

  async getAuthMode(): Promise<AuthMode | undefined> {
    const data = await Storage.get({ key: 'authMode' });
    return data.value ? parseInt(data.value) : undefined;
  }
}

export const settings = new SettingsService();
