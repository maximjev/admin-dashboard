import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (!this.authService.isAuthorized()) {

      if (state.url != '/') {
        let extras = { queryParams: {} };

        const urlWithoutParams = state.url.split('?')[0];
        extras.queryParams['redirectUrl'] = urlWithoutParams;

        next.queryParamMap.keys
          .forEach(key => extras.queryParams[key] = next.queryParamMap['params'][key]);

        this.router.navigate(['login'], extras);
      } else {
        this.router.navigate(['login']);
      }

      return false;
    }

    return true;
  }
}
