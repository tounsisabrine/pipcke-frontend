import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent } from './client/client.component';
import { TutorComponent } from './tutor/tutor.component';

const routes: Routes = [
  { path: 'client-component', component: ClientComponent },
  { path: 'tutor-component', component: TutorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
