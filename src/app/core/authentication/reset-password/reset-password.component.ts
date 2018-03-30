import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/core.reducers';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  /**Variable declaration */
  resetPassForm: FormGroup;
  token: string;

  /**Service Injection */
  constructor(private _fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  /**When the component initialises */
  ngOnInit() {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.initialiseForm();
  }

   /**Initialises Form */
   initialiseForm() {
    this.resetPassForm = this._fb.group({
      'email'         :         new FormControl(null, [Validators.required, Validators.email]),
      'password'      :         new FormControl(null, Validators.required),
      'conf_password' :         new FormControl(null, Validators.required),
    }, {validator: this.confirmPassword});
  }

  /** Custom confirm password validator */
  confirmPassword = (control: AbstractControl): { [key: string]: boolean } => {
    const pass    = control.get('password');
    const cnfPass = control.get('conf_password');
    if (!pass || !cnfPass) {
      return null;
    }
    if (pass.value === cnfPass.value) {
      if (control.get('conf_password').hasError('confirmPassword')) {
        control.get('conf_password').setErrors(null);
      }
      return null;
    } else {
      control.get('conf_password').setErrors({'confirmPassword': true});
      return {confirmPassword: true};
    }
  }

  /** Function call to submit the reset password form */
  resetPassword() {
    const payload = {
      ...this.resetPassForm.value,
      token: this.token
    };
    this.store.dispatch(new AuthActions.ResetPasswordAttempt(payload));
  }

}
