import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
