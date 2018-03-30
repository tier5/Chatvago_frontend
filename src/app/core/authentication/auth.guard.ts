import 'rxjs/add/operator/map';

import * as fromApp from '../store/core.reducers';
import * as fromAuth from '../store/auth/auth.reducers';

/**
 * Guard to prevent unauthorized users to visit routes that are only allowed to logged in users
 */
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  /** Service injection */
  constructor(private store: Store<fromApp.AppState>,
              private router: Router ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.store.select('auth')
      .map((authState: fromAuth.State) => {
        if (authState.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.canActivate(next, state);
  }
}
