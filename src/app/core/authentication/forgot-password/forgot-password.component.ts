import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/core.reducers';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  /**Variable Declaration */
  forgotPassForm: FormGroup;
  forgotPasswordAuthSubscription: Subscription;
  forgotPasswordAlertSubscription: Subscription;
  loading = false;

  /**Service Injection */
  constructor(private _fb: FormBuilder,
              private store: Store<fromApp.AppState>) { }

  /**When the component initialises */
  ngOnInit() {
     /** SignIn subscription */
    this.subscriptions();
    this.initialiseForm();
  }

  /** Tracks all the necessary subscriptions */
  subscriptions() {
    this.forgotPasswordAuthSubscription = this.store.select('auth')
     .subscribe(
       (state) => {
         if (state.resetForgotPasswordForm) {
           this.loading = false;
           this.forgotPassForm.reset();
           this.store.dispatch(new AuthActions.ForgotPasswordSuccess(false));
         }
       }
     );
     this.forgotPasswordAlertSubscription = this.store.select('alert')
     .subscribe(
       (state) => {
         if (state.show) {
           this.loading = false;
         }
       }
     );
  }

  /**Initialises the login form */
  initialiseForm() {
    this.forgotPassForm = this._fb.group({
      'email'     :       new FormControl(null, [Validators.required, Validators.email])
    });
  }

  /** Function to be called on forgot password form submission */
  forgotPassword () {
    this.loading = true;
    this.store.dispatch(new AuthActions.ForgotPasswordAttempt(this.forgotPassForm.value));
  }

  /** Un-subscribing from all custom made events when component is destroyed */
  ngOnDestroy() {
    this.forgotPasswordAuthSubscription.unsubscribe();
    this.forgotPasswordAlertSubscription.unsubscribe();
  }
}
