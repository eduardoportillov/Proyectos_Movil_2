import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PopoverMenuComponent } from './popover-menu.component';

@NgModule({
  declarations: [PopoverMenuComponent],
  imports: [CommonModule, IonicModule],
  exports: [PopoverMenuComponent],
})
export class PopoverMenuModule {}
