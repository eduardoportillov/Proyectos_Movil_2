import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController) {}

  // async addDirection(){
  //   const modalAdd = await this.modalController.create({
  //     component: GooglemapsComponent,
  //     mode: 'ios',
  //     swipeToClose: true,
  //     // componentProps: {position: positioInput}
  //   })
  // }
}
