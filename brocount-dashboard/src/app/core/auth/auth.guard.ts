import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from './auth.service';
import { APP_ROUTES } from '../routing/app-routes';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.waitForSession().pipe(
    map((isAuthenticated) => (isAuthenticated ? true : router.createUrlTree([APP_ROUTES.LOGIN]))),
    catchError(() => of(router.createUrlTree([APP_ROUTES.LOGIN]))),
  );
};
