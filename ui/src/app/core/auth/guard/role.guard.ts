import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";


@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivateChild {

  constructor(private authService: AuthenticationService) {

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = childRoute.data.requiredRole;

    console.log(requiredRole);
    console.log(this.authService.isAuthorized(requiredRole));
    return this.authService.isAuthorized(requiredRole);
  }
}
