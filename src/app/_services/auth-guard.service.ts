import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Params } from '@angular/router';
import { AuthenticationService } from '.';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.authenticationService.isAdminOrEmployees() && state.url.toLowerCase() === '/dashboard') {
      this.router.navigate(['/membership']);
    }

    const rtl = localStorage.getItem('rtl');
    if (rtl && rtl === 'true' && !state.url.includes('rtl=true')) {
      const params: Params = {
        rtl: 'true',
      };

      this.router.navigate([state.url], { queryParams: params });
      return false;
    }

    if (localStorage.getItem('adminUser')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
