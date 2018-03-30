import { Action } from '@ngrx/store';

export const SIGNUP_ATTEMPT               = 'SIGNUP_ATTEMPT';
export const SIGNUP_SUCCESS               = 'SIGNUP_SUCCESS';
export const SIGNUP_FORM_RESET            = 'SIGNUP_FORM_RESET';
export const SIGNIN_ATTEMPT               = 'SIGNIN_ATTEMPT';
export const SIGNIN_SUCCESS               = 'SIGNIN_SUCCESS';
export const SIGNOUT_ATTEMPT              = 'SIGNOUT_ATTEMPT';
export const SIGNOUT_SUCCESS              = 'SIGNOUT_SUCCESS';
export const FORGOT_PASSWORD_ATTEMPT      = 'FORGOT_PASSWORD_ATTEMPT';
export const FORGOT_PASSWORD_SUCCESS      = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ATTEMPT       = 'RESET_PASSWORD_ATTEMPT';
export const RESET_PASSWORD_SUCCESS       = 'RESET_PASSWORD_SUCCESS';
export const CHECK_TOKEN                  = 'CHECK_TOKEN';
export const CHECK_TWILIO_ACTIVE_ATTEMPT  = 'CHECK_TWILIO_ACTIVE_ATTEMPT';
export const CHECK_TWILIO_ACTIVE_SUCCESS  = 'CHECK_TWILIO_ACTIVE_SUCCESS';
export const UPDATE_ATTEMPT               = 'UPDATE_ATTEMPT';
export const REMOVE_TOKEN               = 'REMOVE_TOKEN';

/** SignUp Attempt */
export class SignUpAttempt implements Action {
  readonly type = SIGNUP_ATTEMPT;
  constructor(public payload: { firstName: string, lastName: string, email: string, password: string, conf_password: string }) {}
}

/** SignUp Success */
export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

/** SignUp Form Reset */
export class SignUpFormReset implements Action {
  readonly type = SIGNUP_FORM_RESET;
}

/** SignIn Attempt */
export class SignInAttempt implements Action {
  readonly type = SIGNIN_ATTEMPT;
  constructor(public payload: { email: string, password: string }) {}
}

/** SignIn Success */
export class SignInSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
  constructor(public payload: any) {}
}

/** SignOut Attempt */
export class SignOutAttempt implements Action {
  readonly type = SIGNOUT_ATTEMPT;
}

/** SignOut Success */
export class SignOutSuccess implements Action {
  readonly type = SIGNOUT_SUCCESS;
}

/** ForgotPassword Attempt */
export class ForgotPasswordAttempt implements Action {
  readonly type = FORGOT_PASSWORD_ATTEMPT;
  constructor(public payload: { email: string }) {}
}

/** ForgotPassword Success */
export class ForgotPasswordSuccess implements Action {
  readonly type = FORGOT_PASSWORD_SUCCESS;
  constructor(public payload: boolean) {}
}

/** ResetPassword Attempt */
export class ResetPasswordAttempt implements Action {
  readonly type = RESET_PASSWORD_ATTEMPT;
  constructor(public payload: { password: string, conf_pass: string, id: string }) {}
}

/** ResetPassword Success */
export class ResetPasswordSuccess implements Action {
  readonly type = RESET_PASSWORD_SUCCESS;
  constructor(public payload: boolean) {}
}

/** Checktoken Attempt */
export class CheckToken implements Action {
  readonly type = CHECK_TOKEN;
}


export type AuthActions = CheckToken |
  SignUpAttempt | SignUpSuccess | SignUpFormReset |
  SignInAttempt | SignInSuccess |
  SignOutAttempt | SignOutSuccess |
  ForgotPasswordAttempt | ForgotPasswordSuccess |
  ResetPasswordAttempt | ResetPasswordSuccess;
