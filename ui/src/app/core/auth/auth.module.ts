import {NgModule} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {Ng2Webstorage} from "ngx-webstorage";
import {AuthenticationStorageService} from "./service/authentication-storage.service";
import {OauthTokenStorageService} from "./oauth/oauth-authentication-provider.service";
import {AuthenticationProviderService} from "./service/authentication-provider.service";
import {OauthAuthenticationProviderService} from "./oauth/oauth-token-storage.service";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ResetPasswordComponent} from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2Webstorage
  ],
  providers: [
    { provide: AuthenticationStorageService, useClass: OauthTokenStorageService },
    { provide: AuthenticationProviderService, useClass: OauthAuthenticationProviderService }
  ]
})
export class AuthModule { }
