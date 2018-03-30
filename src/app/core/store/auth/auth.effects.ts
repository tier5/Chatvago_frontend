import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';

import * as AlertActions from '../alert/alert.actions';
import * as AuthActions from './auth.actions';
import * as fromApp from '../core.reducers';

import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthEffects {

  constructor (private actions$: Actions,
               private httpClient: HttpClient,
               private router: Router,
               private store: Store<fromApp.AppState>) {}
/**
 * Sign up effect
 */
  @Effect()
  authSignUp = this.actions$
    .ofType(AuthActions.SIGNUP_ATTEMPT)
    .switchMap((action: AuthActions.SignUpAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'auth/register';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            this.router.navigate(['/dashboard']);
            return [
                {
                    type: AlertActions.ALERT_SHOW,
                    payload: {message: res.message, type: 'success'}
                },
                {
                    type: AuthActions.SIGNUP_SUCCESS,
                    payload: res.data
                }
            ];
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              }
            ];
          }
        })
        .catch((err: HttpErrorResponse) => {
          return [
                {
                type: AlertActions.ALERT_SHOW,
                payload: { message: err.error.message, type: 'danger' }
                }
            ];
        });
    });

  /**
   * Sign in effect
   */
  @Effect()
  authSignIn = this.actions$
    .ofType(AuthActions.SIGNIN_ATTEMPT)
    .switchMap((action: AuthActions.SignInAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'auth/login';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            this.router.navigate(['/dashboard']);
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'success'}
              },
              {
                type: AuthActions.SIGNIN_SUCCESS,
                payload: res.data
              }
            ];
          } else {
            return [{
              type: AlertActions.ALERT_SHOW,
              payload: {message: res.message, type: 'danger'}
            }];
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          );
        });
    });

  /**
   * Forgot password effect
   */
  @Effect()
  authForgotPassword = this.actions$
    .ofType(AuthActions.FORGOT_PASSWORD_ATTEMPT)
    .switchMap((action: AuthActions.ForgotPasswordAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'auth/forget_password';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            this.router.navigate(['/login']);
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'success'}
              },
              {
                type: AuthActions.FORGOT_PASSWORD_SUCCESS,
                payload: true
              }
            ];
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              }
            ];
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          );
        });
    });

  /**
   * Reset Password effect
   */
  @Effect()
  authResetPassword = this.actions$
    .ofType(AuthActions.RESET_PASSWORD_ATTEMPT)
    .switchMap((action: AuthActions.ResetPasswordAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'auth/reset_password';
      const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
      const config = {
        headers: headers
      };
      return this.httpClient.post(apiUrl, action.payload, config)
        .mergeMap((res: any) => {
          if (res.status) {
            this.router.navigate(['/dashboard']);
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'success'}
              },
              {
                type: AuthActions.SIGNIN_SUCCESS,
                payload: res.data
              },
            ];
          } else {
            return [
              {
                type: AlertActions.ALERT_SHOW,
                payload: {message: res.message, type: 'danger'}
              },
            ];
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err);
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          );
        });
    });

  /**
  * Sign out effect
  */
  @Effect()
  authSignOut = this.actions$
    .ofType(AuthActions.SIGNOUT_ATTEMPT)
    .switchMap((action: AuthActions.SignOutAttempt) => {
      const apiUrl = environment.API_BASE_URL + 'auth/logout';
      return this.httpClient.post(apiUrl, null)
        .map((res: any) => {
          if (res.status) {
            this.router.navigate(['/login']);
            return {
              type: AuthActions.SIGNOUT_SUCCESS
            };
          } else {
            return {
              type: AlertActions.ALERT_SHOW,
              payload: {message: res.message, type: 'danger'}
            };
          }
        })
        .catch((err: HttpErrorResponse) => {
          return of(
            {
              type: AlertActions.ALERT_SHOW,
              payload: { message: err.error.message, type: 'danger' }
            }
          );
        });
    });
}
