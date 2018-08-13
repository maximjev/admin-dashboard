import {AuthenticationProviderService} from "../service/authentication-provider.service";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs/index";
import {UserAuthentication} from "../domain/user-authentication";
import {map, tap} from "rxjs/internal/operators";
import {UserRole} from "../domain/user-role";
import {TokenPayload} from "./token-payload";
import {TokenResponse} from "./token-response";
import {OauthTokenStorageService} from "./oauth-authentication-provider.service";
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OauthAuthenticationProviderService implements AuthenticationProviderService {

  OAUTH_CLIENT_TOKEN = btoa(`${environment.api.keys.auth.clientId}:${environment.api.keys.auth.secret}`);

  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient,
              private tokenStorage: OauthTokenStorageService) {

    // We do not inject it since we do not use full JWT support only decoding
    this.jwtHelper = new JwtHelperService();
  }

  login(username: string, password: string): Observable<UserAuthentication> {
    return this.fetchToken(username, password)
      .pipe(
        tap(token => {
          this.tokenStorage.save(token.access_token, token.refresh_token);
        }),
        map(token => {
          return this.extractUserFromToken(token.access_token);
        })
      )
  }

  active(): UserAuthentication {
    if (!this.tokenStorage.hasActiveToken()) {
      return null;
    }

    const activeToken = this.tokenStorage.getActiveAccessToken() != null ?
      this.tokenStorage.getActiveAccessToken() : this.tokenStorage.getActiveRefreshToken();

    return this.extractUserFromToken(activeToken);
  }

  getAuthHeader(): Observable<string> {
    if (!this.tokenStorage.hasActiveToken()) {
      return of(null);
    }

    return this.getActiveAccessToken()
      .pipe(
        map(token => 'Bearer ' + token)
      );
  }

  logout() {
    this.tokenStorage.clear();
  }

  private getActiveAccessToken(): Observable<string> {
    if (this.tokenStorage.canRefresh()) {
      const refreshToken = this.tokenStorage.getActiveRefreshToken();

      return this.refreshToken(refreshToken)
        .pipe(
          tap(token => {
            this.tokenStorage.update(token.access_token, token.refresh_token);
          }),
          map(token => token.access_token)
        );
    }

    return of(this.tokenStorage.getActiveAccessToken());
  }

  private refreshToken(token: string): Observable<TokenResponse> {
    const body = this.buildOauthTokenRefreshParams(token);
    const httpOptions = this.buildOauthTokenRequestHeaders();

    return this.http.post<TokenResponse>(environment.api.urls.auth.token, body.toString(), httpOptions)
  }

  private fetchToken(username: string, password: string): Observable<TokenResponse> {
    const body = this.buildOauthTokenRequestParams(username, password);
    const httpOptions = this.buildOauthTokenRequestHeaders();

    return this.http.post<TokenResponse>(environment.api.urls.auth.token, body.toString(), httpOptions)
  }

  private extractUserFromToken(jwtToken: string): UserAuthentication {
    const payload = <TokenPayload> this.jwtHelper.decodeToken(jwtToken);

    return new UserAuthentication(
      payload.user_name,
      payload.authorities.map(authority => new UserRole(authority))
    );
  }

  private buildOauthTokenRefreshParams(token: string): URLSearchParams {
    const params = new URLSearchParams();

    params.set('grant_type', 'refresh_token');
    params.set('refresh_token', token);

    return params;
  }

  private buildOauthTokenRequestParams(username: string, password: string): URLSearchParams {
    const params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', password);

    return params;
  }

  private buildOauthTokenRequestHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + this.OAUTH_CLIENT_TOKEN
      })
    };

    return httpOptions;
  }
}
