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
import { Observable, Subject } from 'rxjs';
import { settings } from './settings.service';
import { browserAuthPlugin } from './browser-auth.plugin';

export class IdentityService extends IonicIdentityVaultUser<DefaultSession> {
  private _vaultLocked: Subject<boolean>;
  private email: string | undefined;

  get vaultLocked(): Observable<boolean>  {
    return this._vaultLocked.asObservable();
  }

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
    this._vaultLocked = new Subject();
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
    this._vaultLocked.next(false);
  }

  // TODO: Create a PIN dialog
  // async onPasscodeRequest(isPasscodeSetRequest: boolean): Promise<string> {
  //   const dlg = await this.modalController.create({
  //     backdropDismiss: false,
  //     component: PinDialogComponent,
  //     componentProps: {
  //       setPasscodeMode: isPasscodeSetRequest
  //     }
  //   });
  //   dlg.present();
  //   const { data } = await dlg.onDidDismiss();
  //   return Promise.resolve(data || '');
  // }

  onVaultLocked() {
    console.log('Vault Locked');
    this._vaultLocked.next(true);
  }

  getPlugin(): IonicNativeAuthPlugin {
    if (isPlatform('cordova')) {
      return super.getPlugin();
    }
    return browserAuthPlugin;
  }
}

export const identity = new IdentityService();
