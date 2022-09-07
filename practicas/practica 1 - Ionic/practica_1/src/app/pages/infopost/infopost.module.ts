import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfopostPageRoutingModule } from './infopost-routing.module';

import { InfopostPage } from './infopost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfopostPageRoutingModule
  ],
  declarations: [InfopostPage]
})
export class InfopostPageModule {}
