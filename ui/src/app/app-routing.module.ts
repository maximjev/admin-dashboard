import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./core/auth/login/login.component";
import {AuthGuard} from "./core/auth/guard/auth.guard";
import {ResetPasswordComponent} from "./core/auth/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'panel',
        loadChildren: './panel/panel.module#PanelModule'
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'reset',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
