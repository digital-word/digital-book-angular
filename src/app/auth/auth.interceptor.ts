import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const currUser = inject(LocalStorageService).getUser();

  if (currUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currUser.stsTokenManager.accessToken}`,
      },
    });
  }

  return next(req);
};
