import {
  IdentityVault,
  PluginOptions,
  IonicNativeAuthPlugin,
} from '@ionic-enterprise/identity-vault';
import { browserAuthService } from './browser-auth.service';

export class BrowserAuthPlugin implements IonicNativeAuthPlugin {
  getVault(config: PluginOptions): IdentityVault {
    config.onReady!(browserAuthService);
    return browserAuthService;
  }
}

export const browserAuthPlugin: IonicNativeAuthPlugin = new BrowserAuthPlugin();
