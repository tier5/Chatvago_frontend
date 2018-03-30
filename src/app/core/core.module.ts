import { AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AlertComponent } from './alert/alert.component';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthGuard } from './authentication/auth.guard';
import { AuthInterceptor } from './authentication/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NotAuthGuard } from './authentication/not-auth.guard';
import { SocialLoginModule } from 'angularx-social-login';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducers } from './store/core.reducers';

/**
 * @constant config
 */
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('524901817903703')
  }
]);

@NgModule({
  declarations: [
    CoreComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    CoreRoutingModule,
    HttpClientModule,
    SocialLoginModule.initialize(config),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  exports: [CoreComponent],
  providers: [
    AuthGuard,
    NotAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})

export class CoreModule { }
