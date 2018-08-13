import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../service/authentication.service";

/**
 * Workaround allowing to decouple default route logic from UI components
 */
@Injectable({
  providedIn: 'root'
})
export class DefaultRouteService {

  constructor(
    private auth: AuthenticationService,
    private router: Router) {

  }

  redirectToDefault() {
    const defaultRouteForRole = environment.defaultRoutes.find(route => this.auth.isAuthorized(route.role));

    if (!defaultRouteForRole) {
      console.log('Default route is not present!');
      this.router.navigate(['/']);
      return;
    }

    console.log('Navigating to default route: ' + defaultRouteForRole.route);
    this.router.navigate([defaultRouteForRole.route]);
  }
}
