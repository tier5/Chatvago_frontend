import * as fromApp from '../store/core.reducers';
import * as fromAuth from '../store/auth/auth.reducers';

/**
 * Guard to prevent authorized users to visit routes that are only allowed to not logged in users
 */
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Injectable()
export class NotAuthGuard implements CanActivate {

  /** Service injection */
  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {

    return this.store.select('auth')
      .map((authState: fromAuth.State) => {
        if (authState.isAuthenticated) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      });
  }
}
