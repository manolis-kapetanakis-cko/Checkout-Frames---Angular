import { MultiFramesComponent } from './multi-frames/multi-frames.component';
import { SingleFrameComponent } from './single-frame/single-frame.component';
import { Component } from '@angular/core';
// import { FramesComponent } from './frames/frames.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SingleFrameComponent, MultiFramesComponent]
})
export class AppComponent {
  title = 'frames-angular';
}
