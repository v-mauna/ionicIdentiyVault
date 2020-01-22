import {
  DefaultSession,
  IonicIdentityVaultUser,
  AuthMode,
  VaultErrorCodes,
  VaultError,
  VaultConfig,
  IonicNativeAuthPlugin
} from '@ionic-enterprise/identity-vault';
import { isPlatform } from '@ionic/react';
import { settings } from './settings.service';
import { browserAuthPlugin } from './browser-auth.plugin';
import { store, getShowPinDialog, getEnteredPIN } from '../store';
import { unauthorized, setApplicationPIN, unlockApplicationWithPIN } from '../store/auth-actions';

export class IdentityService extends IonicIdentityVaultUser<DefaultSession> {
  private email: string | undefined;

  constructor() {
    super(
      { ready: () => Promise.resolve() },
      {
        restoreSessionOnReady: false,
        unlockOnReady: false,
        unlockOnAccess: true,
        lockAfter: 5000,
        hideScreenOnBackground: true
      }
    );
  }

  async login(session: DefaultSession): Promise<void> {
    this.email = session.username;
    const mode = await settings.getAuthMode();
    await super.login(session, mode || AuthMode.InMemoryOnly);
  }

  logout(): Promise<void> {
    this.email = undefined;
    return super.logout();
  }

  async getEmail(): Promise<string | undefined> {
    if (!this.email) {
      await this.restoreSession();
    }
    return this.email || '';
  }

  async getToken(): Promise<string> {
    if (!this.token) {
      await this.restoreSession();
    }
    return this.token || '';
  }

  async restoreSession(): Promise<DefaultSession | undefined> {
    try {
      return await super.restoreSession();
    } catch (error) {
      if (error.code === VaultErrorCodes.VaultLocked) {
        const vault = await this.getVault();
        await vault.clear();
      }
    }
  }

  // TODO: Anything that needs to be monitored for a state change needs to be monitored from the store.
  onSessionRestored(session: DefaultSession) {
    this.email = session.username;
  }

  onSetupError(error: VaultError): void {
    console.error('Get error during setup', error);
  }

  onConfigChange(config: VaultConfig): void {
    console.log('Got a config update: ', config);
  }

  onVaultReady(config: VaultConfig): void {
    console.log('The service is ready with config: ', config);
  }

  onVaultUnlocked(config: VaultConfig): void {
    console.log('The vault was unlocked with config: ', config);
  }

  onPasscodeRequest(isPasscodeSetRequest: boolean): Promise<string> {
    if (isPasscodeSetRequest) {
      store.dispatch(setApplicationPIN());
    } else {
      store.dispatch(unlockApplicationWithPIN());
    }
    return this.waitForPasscode();
  }

  private waitForPasscode(): Promise<string> {
    return new Promise(resolve => {
      const unsub = store.subscribe(() => {
        const state = store.getState();
        if (!getShowPinDialog(state)) {
          resolve(getEnteredPIN(state) || '');
          unsub();
        }
      });
    });
  }

  onVaultLocked() {
    store.dispatch(unauthorized());
  }

  getPlugin(): IonicNativeAuthPlugin {
    if (isPlatform('cordova')) {
      return super.getPlugin();
    }
    return browserAuthPlugin;
  }
}

export const identity = new IdentityService();
