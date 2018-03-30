import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

import * as AuthActions from '../store/auth/auth.actions';
import * as fromApp from '../store/core.reducers';
import * as fromAuth from '../store/auth/auth.reducers';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .take(1)
      .switchMap((authState: fromAuth.State) => {
        let copiedReq = req;
        if (authState.isAuthenticated) {
          copiedReq = req.clone({ params: req.params.set('token', authState.token) } );
        }
        return next.handle(copiedReq).do(event => {}, err => {
            if (err.status === 401) {
                this.store.dispatch(new AuthActions.SignOutAttempt());
            }
        });
    });
  }
}
