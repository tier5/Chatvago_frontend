import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotPasswordComponent]
})

export class ForgotPasswordModule { }
