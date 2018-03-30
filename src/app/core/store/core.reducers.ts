import * as fromAlert from './alert/alert.reducers';
import * as fromAuth from './auth/auth.reducers';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  alert: fromAlert.AlertState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  alert: fromAlert.alertReducer
};
