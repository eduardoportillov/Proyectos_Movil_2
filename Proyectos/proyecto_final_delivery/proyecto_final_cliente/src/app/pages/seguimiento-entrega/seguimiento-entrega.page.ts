import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  PopoverController,
} from '@ionic/angular';
import { timer } from 'rxjs';

import { PopoverMenuComponent } from 'src/app/components/popover-menu/popover-menu.component';
import { Entrega } from 'src/app/models/Entrega';
import { ClienteHttpService } from 'src/app/services/cliente-http.service';

@Component({
  selector: 'app-seguimiento-entrega',
  templateUrl: './seguimiento-entrega.page.html',
  styleUrls: ['./seguimiento-entrega.page.scss'],
})
export class SeguimientoEntregaPage implements OnInit {
  source = timer(0, 1000);

  idEntrega: any;

  positionActual: any;
  positionOrigen: any;
  positionDestino: any;

  estado: any;

  constructor(
    public popoverController: PopoverController,
    public clientHttp: ClienteHttpService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.idEntrega = this.activatedRoute.snapshot.paramMap.get('idEntrega');
    this.initRastreoChoferEntrega();
  }

  ngOnInit() {
    this.source.subscribe((t) => {
      this.updatePositionActualEstado();
      console.log("Entrga Actualizada")
    });
  }

  initRastreoChoferEntrega() {
    this.clientHttp.getEntrega(this.idEntrega).subscribe(
      async (result) => {
        this.makeEstadoMensaje(result.estado);
        this.positionOrigen = {
          lat: result.latitudOrigen,
          lng: result.longitudOrigen,
        };

        this.positionDestino = {
          lat: result.latitudDestino,
          lng: result.longitudDestino,
        };
      },
      async (error) => {
        this.mostrarAlerta('Error', error.message);
      }
    );
  }

  updatePositionActualEstado() {
    this.clientHttp.getEntrega(this.idEntrega).subscribe(
      (result) => {
        this.makeEstadoMensaje(result.estado);
        if (result.longitudActual != null || result.latitudActual != null) {
          this.positionActual = {
            lat: result.latitudActual,
            lng: result.longitudActual,
          };
        }
        if(result.estado == 6){
          this.router.navigate(['/home']);
        }
      },
      (err: any) => {
        this.mostrarAlerta('Error', err.message);
      }
    );
  }

  makeEstadoMensaje(idEstado: number) {
    switch (idEstado) {
      case 1:
        this.estado = 'Entrega Solicitada por cliente.';
        break;

      case 2:
        this.estado = 'Entrega Aceptada por chofer.';
        break;

      case 3:
        this.estado = 'Esperando a cliente para recibir entrega.';
        break;

      case 4:
        this.estado = 'Chofer en camino con entrega.';
        break;

      case 5:
        this.estado = 'Entrega en proceso.';
        break;

      case 6:
        this.estado = 'Entrega realizada.';
        break;
    }
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
