import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { NgModule } from '@angular/core';

/**
 * @constant forgotpassRoute
 */
const forgotpassRoute: Routes = [
  {path: '', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(forgotpassRoute)
  ],
  exports: [
    RouterModule
  ]
})

export class ForgotPasswordRoutingModule { }
