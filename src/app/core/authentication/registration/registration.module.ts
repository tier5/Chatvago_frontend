import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrationComponent]
})

export class RegistrationModule { }
