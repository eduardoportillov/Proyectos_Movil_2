import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {
  constructor(public router: Router, public alertController: AlertController) {}

  ngOnInit() {}

  logOut() {
    this.eliminarStorage();

    this.router.navigate(['/login']);
  };

  eliminarStorage = async () => {
    await Preferences.clear();
  };

  async alertSalir() {
    const alert = await this.alertController.create({
      cssClass: 'botones',
      header: '',
      message: '¿Estás seguro que desas cerrar sesión?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'btn-adopciones',
          id: 'btn-cancelar',
          handler: () => {
            console.log('no');
          },
        },
        {
          text: 'ACEPTAR',
          id: 'btn-confirmar',
          handler: () => {
            this.logOut();
          },
        },
      ],
    });

    await alert.present();
  }

}
