import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => console.log({ isAuthenticated })),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['auth/login']);
      }
    })
  );
};

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): boolean | Observable<boolean> => {
  return checkAuthStatus();
};
