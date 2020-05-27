import { MultiFramesComponent } from './multi-frames/multi-frames.component';
import { SingleFrameComponent } from './single-frame/single-frame.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'single', component: SingleFrameComponent },
  { path: 'multi', component: MultiFramesComponent },
  { path: '**', component: SingleFrameComponent }
];
// const routes: Routes = [{ path: '', component: SingleFrameComponent }];
// const routes: Routes = [{ path: '', component: MultiFramesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
