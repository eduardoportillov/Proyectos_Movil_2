import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import EntregaSeguimientoComponent from './entrega-seguimiento.component';


@NgModule({
  declarations: [
    EntregaSeguimientoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    EntregaSeguimientoComponent
  ]
})
export class EntregaSeguimientoComponentModule { }