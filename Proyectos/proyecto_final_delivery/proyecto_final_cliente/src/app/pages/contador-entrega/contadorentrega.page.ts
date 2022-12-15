import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteHttpService } from 'src/app/services/cliente-http.service';

@Component({
  selector: 'app-contadorentrega',
  templateUrl: './contadorentrega.page.html',
  styleUrls: ['./contadorentrega.page.scss'],
})
export class ContadorentregaPage implements OnInit {
  idEntrega: any;
  seconds = 120;
  clock: any;
  source = timer(0, 1000);

  constructor(
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public clientHttp: ClienteHttpService
  ) {}

  ngOnInit() {
    this.idEntrega = this.activatedRoute.snapshot.paramMap.get("idEntrega");

    this.clock = this.source.subscribe((t) => {
      this.seconds--;
      
      this.clientHttp.getEntrega(parseInt(this.idEntrega)).subscribe((result) => {
        if (result.chofer_id != null) {
          this.clock.unsubscribe();
          console.log('Entrega aceptada');
          this.router.navigate([`/seguimiento-entrega`, this.idEntrega]);
        } else {
          console.log('Entrega no aceptada');
        }
      });

      if (this.seconds === 0) {
        this.clock.unsubscribe();
        this.navigateToHome()
      }
    });
  }

  navigateToHome() {
    this.mostrarAlerta('Tiempo de espera agotado', 'No se ha aceptado la entrega');
    this.router.navigate(['/home']);
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
