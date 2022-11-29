import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from 'src/app/components/popover-menu/popover-menu.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public popoverController: PopoverController) {}

  async abrirMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      cssClass: 'popover-menu',
      event: ev,
      dismissOnSelect: true,
      translucent: true,
      // componentProps: { usuario: this.usuario }
    });
    await popover.present();
  }

  // async addDirection(){
  //   const modalAdd = await this.modalController.create({
  //     component: GooglemapsComponent,
  //     mode: 'ios',
  //     swipeToClose: true,
  //     // componentProps: {position: positioInput}
  //   })
  // }
}
