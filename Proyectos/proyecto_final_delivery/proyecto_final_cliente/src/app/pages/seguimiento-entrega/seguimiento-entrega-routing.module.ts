import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimientoEntregaPage } from './seguimiento-entrega.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoEntregaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientoEntregaPageRoutingModule {}
