import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginParam, User } from '../shared/models/user.model';
import { Observable } from 'rxjs';
import { DetailsRes } from '../shared/models/response.model';
import { environment } from '../../environments/environment';

const LOGIN_ENDPOINT = `${environment.apiUrl}/auth/login`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  login(params: LoginParam): Observable<DetailsRes<User>> {
    return this.httpClient.post<DetailsRes<User>>(LOGIN_ENDPOINT, params);
  }
}
