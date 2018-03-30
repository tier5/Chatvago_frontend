import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password.component';

/**
 * @constant resetPassRoute
 */
const resetPassRoute: Routes = [
  {path: '', component: ResetPasswordComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(resetPassRoute)
  ],
  exports: [
    RouterModule
  ]
})

export class ResetPasswordRoutingModule { }
