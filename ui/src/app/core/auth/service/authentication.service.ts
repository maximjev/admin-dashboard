import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {tap} from "rxjs/internal/operators";
import {Observable, Subject} from "rxjs/index";
import {AuthenticationProviderService} from "./authentication-provider.service";
import {UserAuthentication} from "../domain/user-authentication";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private cachedCurrentUser: UserAuthentication;

  private authEvents = new Subject<boolean>();

  constructor(private authProvider: AuthenticationProviderService) {

  }

  login(username: string, password: string): Observable<boolean>  {
    return this.authProvider.login(username, password)
      .pipe(
        tap((authentication) => {
          this.cachedCurrentUser = authentication;
        }),
        map((authentication) => {
          return authentication != null;
        }),
        tap((authenticationStatus) => {
          this.authEvents.next(true);
        })
      );
  }

  isAuthorized(requiredRole?: string): boolean {
    if (this.cachedCurrentUser) {
      return true;
    }

    const activeUser = this.authProvider.active();

    return activeUser != null && (!requiredRole || activeUser.hasRole(requiredRole));
  }

  authStatus(): Observable<boolean> {
    return this.authEvents.asObservable();
  }

  getAPIAuthHeaders(): Observable<HttpHeaders> {
    return this.authProvider.getAuthHeader()
      .pipe(
        map(authHeader => new HttpHeaders({ 'Authorization': authHeader }))
      );
  }

  logout() {
    this.cachedCurrentUser = null;
    this.authProvider.logout();

    this.authEvents.next(false);
  }
}
