import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoEntregaPageRoutingModule } from './seguimiento-entrega-routing.module';

import { SeguimientoEntregaPage } from './seguimiento-entrega.page';
import { PopoverMenuModule } from 'src/app/components/popover-menu/popover-menu.module';
import { EntregaSeguimientoComponentModule } from 'src/app/components/entrega-seguimiento/entrega-seguimiento.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientoEntregaPageRoutingModule,
    PopoverMenuModule,
    EntregaSeguimientoComponentModule,
  ],
  declarations: [SeguimientoEntregaPage],
})
export class SeguimientoEntregaPageModule {}
