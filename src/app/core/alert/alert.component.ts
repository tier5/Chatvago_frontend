import * as AlertActions from '../store/alert/alert.actions';
import * as fromApp from '../store/core.reducers';

import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

/** Variable declaration */
@Input('text') text = 'Danger Alert';
@Input('type') type = 'danger';
color: string;

/** Service Injection */
constructor (private store: Store<fromApp.AppState>) { }

/** Function to be executed when component initializes */
ngOnInit () {
    switch (this.type) {
        case 'success': this.color = 'rgba(138,217,25,0.7)';
                        break;
        case 'warning': this.color = 'rgba(255,181,62,0.7)';
                        break;
        default:        this.color = 'rgba(249,36,63,0.7)';
                        break;
    }
    /** Auto closing an alert after a set time */
    setTimeout(() => {
      this.store.dispatch(new AlertActions.AlertHide());
    }, 3000);
  }

  /** Function to be executed when clicked on cross btn */
  dismiss () {
    this.store.dispatch(new AlertActions.AlertHide());
  }
}
