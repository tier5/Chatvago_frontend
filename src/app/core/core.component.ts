import * as AuthActions from '../core/store/auth/auth.actions';
import * as fromAlert from './store/alert/alert.reducers';
import * as fromApp from '../core/store/core.reducers';

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})


export class CoreComponent implements OnInit {

  alertState: Observable<fromAlert.AlertState>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.alertState = this.store.select('alert');
    this.store.dispatch(new AuthActions.CheckToken());
  }
}
