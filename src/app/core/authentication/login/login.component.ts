import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/core.reducers';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**Variable Declaration */
  loginForm: FormGroup;

  /**Service Injection */
  constructor(private _fb: FormBuilder,
              private store: Store<fromApp.AppState>) { }

  /**When component initialises */
  ngOnInit() {
    this.initialiseForm();
  }

  /**Initialises the login form */
  initialiseForm() {
    this.loginForm = this._fb.group({
      'email'     :       new FormControl(null, [Validators.required, Validators.email]),
      'password'  :       new FormControl(null, Validators.required)
    });
  }

  /** Function to submit the sign in form */
  login() {
    this.store.dispatch(new AuthActions.SignInAttempt(this.loginForm.value));
  }

}
