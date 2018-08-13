import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserReset} from "../domain/user-reset";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  requestReset(user: UserReset): Observable<UserReset> {
    return this.http.post<UserReset>(environment.api.urls.users.requestReset, user);
  }

  sendToken(user: UserReset): Observable<UserReset> {
    return this.http.post<UserReset>(environment.api.urls.users.token, user);
  }

  resetPassword(user: UserReset): Observable<UserReset> {
    return this.http.post<UserReset>(environment.api.urls.users.reset, user)
  }
}
