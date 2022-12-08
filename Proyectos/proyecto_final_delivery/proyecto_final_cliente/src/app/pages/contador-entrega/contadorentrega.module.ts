import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContadorentregaPageRoutingModule } from './contadorentrega-routing.module';

import { ContadorentregaPage } from './contadorentrega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContadorentregaPageRoutingModule
  ],
  declarations: [ContadorentregaPage]
})
export class ContadorentregaPageModule {}
