import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from 'src/app/components/popover-menu/popover-menu.component';
import { SelectDirectionInMapComponent } from 'src/app/components/select-direction-in-map/select-direction-in-map.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  positionOrigen: any = null;

  constructor(
    public popoverController: PopoverController,
    public modalController: ModalController
  ) {}

  ngOnInit(){

  }

  async abrirMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      cssClass: 'popover-menu',
      event: ev,
      dismissOnSelect: true,
      translucent: true,
    });
    await popover.present();
  }

  async addPositionOrigin() {
    const modalAdd = await this.modalController.create({
      component: SelectDirectionInMapComponent,
      mode: 'ios',
      swipeToClose: true,
    });

    await modalAdd.present();

    const { data, role } = await modalAdd.onWillDismiss();
    if (role === 'position') {
      this.positionOrigen = data;
    }
  }
}
