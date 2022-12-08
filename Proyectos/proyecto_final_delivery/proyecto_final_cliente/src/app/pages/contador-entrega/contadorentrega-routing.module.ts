import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContadorentregaPage } from './contadorentrega.page';

const routes: Routes = [
  {
    path: '',
    component: ContadorentregaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContadorentregaPageRoutingModule {}
