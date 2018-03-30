import * as AuthActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/core.reducers';

import { Component, OnInit } from '@angular/core';

import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /** Service injection */
  constructor(private store: Store<fromApp.AppState>,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  /** Function call to facebook login*/
  facebookLogin(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  /** Function call to sign out */
   logout() {
    this.store.dispatch(new AuthActions.SignOutAttempt());
  }

}
