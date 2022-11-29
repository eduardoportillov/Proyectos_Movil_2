import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';

import { Preferences } from '@capacitor/preferences';
import { Usuario } from 'src/app/models/Usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private apiLogin: LoginService,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController,
    public nav: NavController,
    public loadingController: LoadingController,
    public platform: Platform,
    public http: HttpClient
  ) {
    this.formLogin = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

  async login() {
    const valuesForm = this.formLogin.value;

    const usuario: Usuario = {
      email: valuesForm.email,
      password: valuesForm.password,
    };

    const loading = await this.loadingController.create({
      spinner: 'crescent',
      translucent: false,
    });

    await loading.present();

    this.apiLogin.iniciarSesion(usuario).subscribe(
      async (result) => {
        loading.dismiss();
        if (result.access_token) {
          await Preferences.set({
            key: 'token',
            value: result.access_token,
          });

          await Preferences.set({
            key: 'cliente_id',
            value: JSON.stringify(result.cliente),
          });

          setTimeout(() => {
            this.router.navigate(['/home']);
            this.limpiarFormulario();
          }, 200);
        } else {
          this.mostrarAlerta('Error', 'Usuario y/o contraseña incorrectos');
        }
      },

      (error) => {
        loading.dismiss();
        this.mostrarAlerta('Error', `Usuario y/o contraseña incorrectos Message Server: ${error.statusText}`);
      }
    );
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

  limpiarFormulario() {
    this.formLogin.reset();
  }
}
