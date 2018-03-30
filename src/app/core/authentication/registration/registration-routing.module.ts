import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';

/**
 * @constant registrationRoutes
 */
const registrationRoutes: Routes = [
  { path: '', component: RegistrationComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(registrationRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RegistrationRoutingModule { }
