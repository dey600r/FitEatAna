import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTargetPage } from './edit-target.page';

const routes: Routes = [
  {
    path: '',
    component: EditTargetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTargetPageRoutingModule {}
