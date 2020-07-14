import { TeaCategory } from '../models';
import { environment } from './environment';
import { store } from '../store';
import { unauthorized } from '../store/auth-actions';
import { identity } from './identity.service';

export class TeaCategoriesAPI {
  async all(): Promise<Array<TeaCategory>> {
    let opt = await this.addHeaders({});
    const res = await fetch(`${environment.dataService}/tea-categories`, opt);
    this.checkStatus(res);
    return res.ok ? await res.json() : [];
  }

  async update(category: TeaCategory): Promise<TeaCategory> {
    let opt = await this.addHeaders({
      method: 'POST',
      body: JSON.stringify(category),
    });
    const res = await fetch(
      `${environment.dataService}/tea-categories/${category.id}`,
      opt,
    );
    this.checkStatus(res);
    return res.ok ? await res.json() : {};
  }

  private async addHeaders(opt: RequestInit): Promise<RequestInit> {
    const token = await identity.getToken();
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    headers = token
      ? { ...headers, Authorization: `Bearer ${token}` }
      : headers;
    return { ...opt, headers };
  }

  private checkStatus(res: Response) {
    if (res.status === 401) {
      store.dispatch(unauthorized());
    }
  }
}

export const teaCategories = new TeaCategoriesAPI();
