import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginParam, User } from '../shared/models/user.model';
import { finalize, map, Observable, shareReplay, tap } from 'rxjs';
import { DetailsRes } from '../shared/models/response.model';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { LoggerService } from '../shared/services/logger/logger.service';

export const LOGIN_ENDPOINT = `${environment.apiUrl}/auth/login`;
export const LOGOUT_ENDPOINT = `${environment.apiUrl}/auth/logout`;
export const REFRESH_ENDPOINT = `${environment.apiUrl}/auth/refresh`;

const SESSION_IDLE_LIMIT_MS = 30 * 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly httpClient = inject(HttpClient);
  private readonly logger = inject(LoggerService);

  private readonly _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  private refreshSession$: Observable<User> | null = null;

  isTokenExpired(user: User): boolean {
    return user.stsTokenManager.expirationTime <= Date.now();
  }

  isSessionIdle(user: User): boolean {
    return (
      Date.now() - user.stsTokenManager.expirationTime > SESSION_IDLE_LIMIT_MS
    );
  }

  refreshSession(): Observable<User> {
    this.refreshSession$ ??= this.httpClient
      .post<DetailsRes<User>>(REFRESH_ENDPOINT, {
        refreshToken:
          this.localStorageService.getUser()?.stsTokenManager.refreshToken,
      })
      .pipe(
        map((res) => res.data),
        tap((user) => {
          this.logger.log('[service] refreshSession, user', user);
          this.localStorageService.setUser(user);
        }),
        finalize(() => {
          this.refreshSession$ = null;
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );

    return this.refreshSession$;
  }

  login(params: LoginParam): Observable<DetailsRes<User>> {
    return this.httpClient.post<DetailsRes<User>>(LOGIN_ENDPOINT, params);
  }

  logout(): Observable<DetailsRes<string>> {
    return this.httpClient.get<DetailsRes<string>>(LOGOUT_ENDPOINT).pipe(
      tap(() => {
        this.localStorageService.delUser();
      }),
    );
  }
}
