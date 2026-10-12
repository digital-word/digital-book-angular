import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { LoggerService } from '../shared/services/logger/logger.service';
import { AuthService, REFRESH_ENDPOINT } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService);
  const currUser = localStorageService.getUser();

  const logoutLocally = (reason: string) => {
    logger.log('[interceptor] logging out locally, reason', reason);
    localStorageService.delUser();
    void router.navigate(['/']);
  };

  if (
    currUser &&
    authService.isTokenExpired(currUser) &&
    req.url !== REFRESH_ENDPOINT
  ) {
    if (authService.isSessionIdle(currUser)) {
      logoutLocally('session idle');
      return EMPTY;
    }

    logger.log('[interceptor] token expired, refreshing session, url', req.url);

    return authService.refreshSession().pipe(
      switchMap((user) =>
        next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.stsTokenManager.accessToken}`,
            },
          }),
        ),
      ),
      catchError((error: HttpErrorResponse) => {
        logoutLocally('session refresh failed');
        return throwError(() => error);
      }),
    );
  }

  if (currUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currUser.stsTokenManager.accessToken}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && currUser) {
        logoutLocally('401 unauthorized');
      }
      return throwError(() => error);
    }),
  );
};
