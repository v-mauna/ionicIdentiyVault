import { environment } from './environment';
import { identity } from './identity.service';

export class AuthenticationService {
  async login(username: string, password: string): Promise<boolean> {
    const response = await fetch(`${environment.dataService}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return this.unpackResponse(data);
  }

  async logout(): Promise<void> {
    const token = await identity.getToken();
    if (token) {
      await fetch(`${environment.dataService}/logout`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token }
      });
    }
    await identity.remove();
  }

  private async unpackResponse(r: any): Promise<boolean> {
    if (r.success) {
      identity.set(r.user, r.token);
    }
    return r.success;
  }
}

export const authentication = new AuthenticationService();
