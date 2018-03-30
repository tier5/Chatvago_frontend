import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';

/**
 * @constant loginRoute
 */
const loginRoute: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoute)
  ],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
