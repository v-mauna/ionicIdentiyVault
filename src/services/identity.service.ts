import { Plugins } from '@capacitor/core';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { User } from '../models';

const { Storage } = Plugins;

class IdentityService {
  async set(user: User, token: string): Promise<void> {
    await Promise.all([Storage.set({ key: 'token', value: token }), Storage.set({ key: 'email', value: user.email })]);
  }

  async getEmail(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'email' });
    return value;
  }

  async getToken(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'token' });
    return value;
  }

  async remove(): Promise<void> {
    await Promise.all([Storage.remove({ key: 'token' }), Storage.remove({ key: 'email' })]);
  }
}

export const identity = new IdentityService();
