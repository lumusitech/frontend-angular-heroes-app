import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => console.log({ isAuthenticated })),
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};

export const canActivatePublicGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};

export const canMatchPublicGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};
