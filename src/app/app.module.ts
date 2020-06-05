import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingleFrameComponent } from './single-frame/single-frame.component';
import { MultiFramesComponent } from './multi-frames/multi-frames.component';
import { CardNumberComponent } from './multi-frames/card-number/card-number.component';
import { ExpiryDateComponent } from './multi-frames/expiry-date/expiry-date.component';
import { CvvComponent } from './multi-frames/cvv/cvv.component';
import { PayButtonComponent } from './multi-frames/pay-button/pay-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleFrameComponent,
    MultiFramesComponent,
    CardNumberComponent,
    ExpiryDateComponent,
    CvvComponent,
    PayButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
