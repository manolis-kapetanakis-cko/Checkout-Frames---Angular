import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingleFrameComponent } from './single-frame/single-frame.component';
import { MultiFramesComponent } from './multi-frames/multi-frames.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleFrameComponent,
    MultiFramesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
