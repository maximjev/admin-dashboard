import {Component, OnInit} from '@angular/core';
import {UserReset} from "../domain/user-reset";
import {PasswordResetService} from "../service/password-reset.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  user: UserReset = new UserReset(null, null, null, null, null, null);

  stepOne = true;
  stepTwo = false;
  stepThree = false;
  stepFour = false;

  loading = false;

  passwordMismatch = false;
  nameEmailMismatch = false;
  invalidToken = false;
  notFound = false;

  constructor(private resetService: PasswordResetService) {
  }

  ngOnInit() {
  }

  submit() {
    this.loading = true;
    this.nameEmailMismatch = false;
    this.notFound = false;

    this.resetService.requestReset(this.user).subscribe(user => {
      this.stepOne = false;
      this.stepTwo = true;
      this.loading = false;
    },
      error => this.handleError(error));
  }

  send() {
    this.loading = true;
    this.resetService.sendToken(this.user).subscribe(user => {
      this.stepTwo = false;
      this.stepThree = true;
      this.loading = false;
    },
      error => this.handleError(error));
  }

  reset() {

    if (this.user.password != this.user.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.loading = true;
    this.resetService.resetPassword(this.user).subscribe(() => {
        this.stepThree = false;
        this.stepFour = true;
        this.loading = false;
      },
      error => this.handleError(error));
  }

  handleError(error) {
    console.log(error);
    this.loading = false;
    switch (error.error) {
      case 'INVALID_TOKEN':
        this.invalidToken = true;
        break;
      case 'NAME_AND_EMAIL_MISMATCH':
        this.nameEmailMismatch = true;
        break;
    }

    switch(error.status) {
      case 404:
        this.notFound = true;
        break;
    }

  }
}
