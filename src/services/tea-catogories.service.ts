import { TeaCategory } from '../models';
import { environment } from './environment';
import { store, getToken } from '../store';
import { unauthorized } from '../store/auth-actions';

export class TeaCategoriesAPI {
  async all(): Promise<Array<TeaCategory>> {
    let opt = this.addHeaders({});
    const res = await fetch(`${environment.dataService}/tea-categories`, opt);
    this.checkStatus(res);
    return res.ok ? await res.json() : [];
  }

  async update(category: TeaCategory): Promise<TeaCategory> {
    let opt = this.addHeaders({ method: 'POST', body: JSON.stringify(category) });
    const res = await fetch(`${environment.dataService}/tea-categories/${category.id}`, opt);
    this.checkStatus(res);
    return res.ok ? await res.json() : {};
  }

  private addHeaders(opt: RequestInit): RequestInit {
    const token = getToken(store.getState());
    let headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    headers = token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
    return { ...opt, headers };
  }

  private checkStatus(res: Response) {
    if (res.status === 401) {
      store.dispatch(unauthorized());
    }
  }
}

export const teaCategories = new TeaCategoriesAPI();
