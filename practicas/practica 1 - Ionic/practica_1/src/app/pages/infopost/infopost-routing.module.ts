import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfopostPage } from './infopost.page';

const routes: Routes = [
  {
    path: '',
    component: InfopostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfopostPageRoutingModule {}
