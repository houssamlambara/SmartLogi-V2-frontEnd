import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const requiredRoles = route.data['roles'] as Array<string>;
    if (requiredRoles && requiredRoles.length > 0) {
      const user = authService.user();
      if (user && requiredRoles.includes(user.role)) {
        return true;
      }
      return router.createUrlTree(['/login']);
    }
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
