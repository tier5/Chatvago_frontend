import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/core.reducers';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  /**Variable declaration */
  registrationForm: FormGroup;
  signUpSubscription: Subscription;

  /**Service Injection */
  constructor(private _fb: FormBuilder,
              private store: Store<fromApp.AppState>) { }

  /**When the component initialises */
  ngOnInit() {
    /** SignUp subscription */
    this.signUpSubscription = this.store.select('auth')
      .subscribe(
        (state) => {
          if (state.registered) {
            this.registrationForm.reset();
            this.store.dispatch(new AuthActions.SignUpFormReset());
          }
        }
      );
    this.initialiseForm();
  }

  /**Initialises Form */
  initialiseForm() {
    this.registrationForm = this._fb.group({
      'firstName'     :         new FormControl(null, Validators.required),
      'lastName'      :         new FormControl(null, Validators.required),
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

  /** Function to submit the sign up form */
  register() {
    this.store.dispatch(new AuthActions.SignUpAttempt(this.registrationForm.value));
  }

  /** Un-subscribing from all custom made events when component is destroyed */
  ngOnDestroy () {
    this.signUpSubscription.unsubscribe();
  }
}
