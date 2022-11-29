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
import { NewUser } from 'src/app/models/NewUser';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formRegister: FormGroup;

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
    this.formRegister = this.formBuilder.group({
      name: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

  async register() {
    const valuesForm = this.formRegister.value;

    const usuario: NewUser = {
      name: valuesForm.name,
      lastname: valuesForm.lastname,
      email: valuesForm.email,
      password: valuesForm.password,
    };

    const loading = await this.loadingController.create({
      spinner: 'crescent',
      translucent: false,
    });

    await loading.present();

    this.apiLogin.registrarUsuario(usuario).subscribe(
      async (result) => {
        if (result.error) {
          loading.dismiss();
          this.mostrarAlerta('Error', result.error);
        } else {
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.limpiarFormulario();
          }, 200);
        }
      },
      (error) => {
        loading.dismiss();
        this.mostrarAlerta('Error', `Message Server: ${error.statusText}`);
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
    this.formRegister.reset();
  }
}
