import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.getUser()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
