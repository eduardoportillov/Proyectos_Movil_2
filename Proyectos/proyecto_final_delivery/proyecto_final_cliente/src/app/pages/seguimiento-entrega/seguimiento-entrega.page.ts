import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';

import { PopoverMenuComponent } from 'src/app/components/popover-menu/popover-menu.component';
import { ClienteHttpService } from 'src/app/services/cliente-http.service';

@Component({
  selector: 'app-seguimiento-entrega',
  templateUrl: './seguimiento-entrega.page.html',
  styleUrls: ['./seguimiento-entrega.page.scss'],
})
export class SeguimientoEntregaPage implements OnInit {
  position: any;

  constructor(
    public popoverController: PopoverController,
    public clientHttp: ClienteHttpService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    // public router: Router
  ) {}

  ngOnInit() {}

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
}
