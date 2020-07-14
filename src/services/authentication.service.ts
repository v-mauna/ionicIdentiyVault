import { environment } from './environment';
import { identity } from './identity.service';
import { User } from '../models';

export class AuthenticationService {
  async login(
    username: string,
    password: string,
  ): Promise<{ success: boolean; token?: string; user?: User }> {
    const response = await fetch(`${environment.dataService}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  }

  async logout(): Promise<void> {
    const token = await identity.getToken();
    if (token) {
      await fetch(`${environment.dataService}/logout`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
      });
    }
  }
}

export const authentication = new AuthenticationService();
