import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './authentication/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { NotAuthGuard } from './authentication/not-auth.guard';

/**
 * @constant routes
 */
const routes: Routes = [
    {
      path: 'login',
      canActivate: [ NotAuthGuard ],
      loadChildren: './authentication/login/login.module#LoginModule'
    },
    {
      path: 'registration',
      canActivate: [ NotAuthGuard ],
      loadChildren: './authentication/registration/registration.module#RegistrationModule'
    },
    {
      path: 'forgot-password',
      canActivate: [ NotAuthGuard ],
      loadChildren: './authentication/forgot-password/forgot-password.module#ForgotPasswordModule'
    },
    {
      path: 'reset-password/:token',
      canActivate: [ NotAuthGuard ],
      loadChildren: './authentication/reset-password/reset-password.module#ResetPasswordModule'
    },
    {
      path: 'dashboard',
      canActivate: [ AuthGuard ],
      canActivateChild: [ AuthGuard ],
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: '**',
      redirectTo: 'login'
    }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
        routes, {preloadingStrategy: PreloadAllModules, enableTracing: false}
    )
  ],
  exports: [RouterModule]
})

export class CoreRoutingModule { }
