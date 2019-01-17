import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HtimelineLibModule } from 'projects/htimeline-lib/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HtimelineLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
