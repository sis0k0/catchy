import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CatchyNameModule } from 'catchy-name';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CatchyNameModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
