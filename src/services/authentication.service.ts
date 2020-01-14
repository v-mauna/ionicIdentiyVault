import { environment } from './environment';
import { identity } from './identity.service';

export class AuthenticationService {
  async login(email: string, password: string): Promise<boolean> {
    const response = await fetch(`${environment.dataService}/login`, { method: 'POST' });
    const data = await response.json();
    return this.unpackResponse(data);
  }

  async logout(): Promise<void> {
    await fetch(`${environment.dataService}/logout`, { method: 'POST' });
    await identity.remove();
  }

  private async unpackResponse(r: any): Promise<boolean> {
    if (r.success) {
      identity.set(r.user, r.token)
    }
    return r.success;
  }
}

export const authentication = new AuthenticationService();
