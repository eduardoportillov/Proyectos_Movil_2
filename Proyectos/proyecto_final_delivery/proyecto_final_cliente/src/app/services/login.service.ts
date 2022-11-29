import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { environment } from 'src/environments/environment';
import { ResponseLogin } from '../models/ResponseLogin';
import { NewUser } from '../models/NewUser';
import { ResponseRegister } from '../models/ResponseRegister';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api = environment.UrlApiPFM2;
  constructor(private http: HttpClient) {

  }

  iniciarSesion(usuario: Usuario) {
    const ruta = `${this.api}/login`;
    return this.http.post<ResponseLogin>(ruta, usuario);
  }

  registrarUsuario(newUsuario: NewUser) {
    const ruta = `${this.api}/clientes`;
    return this.http.post<ResponseRegister>(ruta, newUsuario);
  }
}