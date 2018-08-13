import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultRouteService} from "../guard/default-route.guard";
import {AuthenticationService} from "../service/authentication.service";


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  loginFailed = false;

  error = '';

  originalTargetUrl: string;
  preservedQueryParams = null;


  constructor( formBuilder: FormBuilder,
               private auth: AuthenticationService,
               private router: Router,
               private defaultRouter: DefaultRouteService,
               private route: ActivatedRoute) {

    this.loginForm = formBuilder.group({
      'username': [localStorage.getItem('username'), Validators.required],
      'password': [localStorage.getItem('password'), Validators.required]
    });

  }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        this.originalTargetUrl = params.get('redirectUrl');

        if (params.keys.length > 1) {
          this.preservedQueryParams = { queryParams: {} };

          params.keys
            .filter(key => key != 'redirectUrl')
            .forEach(key => this.preservedQueryParams.queryParams[key] = params['params'][key]);

        }
      });
  }

  get f() {
    return this.loginForm.controls;
  }

  tryLogin() {
    this.submitted = true;

    this.error = null;
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.loginForm.value['username'], this.loginForm.value['password'])
      .subscribe((loggedIn) => {
        if (!loggedIn) {
          this.loginFailed = true;
          return;
        }

        this.redirect()
      }, (error) => {
        this.loginFailed = true;
      });
  }

  redirect() {
    if (this.originalTargetUrl) {
      if (this.preservedQueryParams) {
        this.router.navigate([this.originalTargetUrl], this.preservedQueryParams);
      } else {
        this.router.navigate([this.originalTargetUrl]);
      }

      return;
    }

    this.defaultRouter.redirectToDefault();
  }
}
