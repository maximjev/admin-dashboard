import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {UserAuthentication} from "../domain/user-authentication";

@Injectable({
  providedIn: 'root'
})
export abstract class AuthenticationProviderService {

  constructor() {
  }

  abstract login(username: string, password: string): Observable<UserAuthentication>;

  abstract active(): UserAuthentication;

  abstract getAuthHeader(): Observable<string>;

  abstract logout();
}
