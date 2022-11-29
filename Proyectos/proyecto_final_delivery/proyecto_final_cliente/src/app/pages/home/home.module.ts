import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { GooglemapsModule } from '../../components/googlemaps/googlemaps.module';
import { PopoverMenuModule } from 'src/app/components/popover-menu/popover-menu.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GooglemapsModule,
    PopoverMenuModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
