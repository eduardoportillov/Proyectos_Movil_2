import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { PopoverMenuComponent } from 'src/app/components/popover-menu/popover-menu.component';
import { SelectDirectionInMapComponent } from 'src/app/components/select-direction-in-map/select-direction-in-map.component';
import { ClienteHttpService } from 'src/app/services/cliente-http.service';
import { Preferences } from '@capacitor/preferences';
import { CrearEntregaRequest } from 'src/app/models/CrearEntregaRequest';
import { CalcularPrecioRequest } from 'src/app/models/CalcularPrecioRequest';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  positionOrigen: any = null;
  positionDestino: any = null;

  precio: number = 0;

  constructor(
    public popoverController: PopoverController,
    public modalController: ModalController,
    public clientHttp: ClienteHttpService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
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
      if (this.positionDestino != null) {
        this.calcularPrecio();
      }
    }
  }

  async addPositionDestino() {
    const modalAdd = await this.modalController.create({
      component: SelectDirectionInMapComponent,
      mode: 'ios',
      swipeToClose: true,
    });

    await modalAdd.present();

    const { data, role } = await modalAdd.onWillDismiss();
    if (role === 'position') {
      this.positionDestino = data;
      if (this.positionOrigen != null) {
        this.calcularPrecio();
      }
    }
  }

  async calcularPrecio() {
    const CalcularPrecioRequest: CalcularPrecioRequest = {
      latitudOrigen: this.positionOrigen.lat,
      longitudOrigen: this.positionOrigen.lng,
      latitudDestino: this.positionDestino.lat,
      longitudDestino: this.positionDestino.lng,
    };

    const loading = await this.loadingController.create({
      spinner: 'crescent',
      translucent: false,
    });

    await loading.present();

    this.clientHttp.CalcularPrecio(CalcularPrecioRequest).subscribe(
      async (result) => {
        loading.dismiss();
        this.precio = result.precio;
      },
      async (error) => {
        loading.dismiss();
        this.mostrarAlerta('Error', error.statusText);
      }
    );
  }

  async pedirEntrega() {
    if (this.positionOrigen != null && this.positionDestino != null) {

      const clientId = await (await Preferences.get({ key: 'cliente_id' })).value

      const crearEntregaRequest: CrearEntregaRequest = {
        latitudOrigen: this.positionOrigen.lat,
        longitudOrigen: this.positionOrigen.lng,
        latitudDestino: this.positionDestino.lat,
        longitudDestino: this.positionDestino.lng,
        precio: this.precio,
        client_id: Number(clientId),  
      };

      const loading = await this.loadingController.create({
        spinner: 'crescent',
        translucent: false,
      });

      await loading.present();

      this.clientHttp.CrearEntrega(crearEntregaRequest).subscribe(
        async (result) => {
          loading.dismiss();
          this.mostrarAlerta('Exito', 'Se ha creado la entrega');
          this.router.navigate([`/contadorentrega/${result.id}`]);
        },
        async (error) => {
          loading.dismiss();
          this.mostrarAlerta('Error', error.statusText);
        }
      );
    } else {
      this.mostrarAlerta(
        'Error',
        'Debe seleccionar la posición de origen y destino'
      );
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: '',
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'ACEPTAR',
          cssClass: '',
          id: 'btn-confirmar',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
