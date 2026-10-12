import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { LoggerService } from '../shared/services/logger/logger.service';
import { AuthService } from './auth.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService);

  const user = localStorageService.getUser();

  if (
    !user ||
    (authService.isTokenExpired(user) && authService.isSessionIdle(user))
  ) {
    logger.log(
      '[guard] no valid session, redirecting to login, url',
      state.url,
    );
    localStorageService.delUser();
    void router.navigate(['/']);
    return false;
  }

  return true;
};
