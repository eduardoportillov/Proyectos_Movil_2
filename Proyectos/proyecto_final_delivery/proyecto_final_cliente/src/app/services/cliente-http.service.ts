import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CalcularPrecioRequest } from '../models/CalcularPrecioRequest';
import { Preferences } from '@capacitor/preferences';
import { CalcularPrecioResponse } from '../models/CalcularPrecioResponse';
import { CrearEntregaRequest } from '../models/CrearEntregaRequest';
import { CrearEntregaResponse } from '../models/CrearEntregaResponse';
import { Entrega } from '../models/Entrega';

@Injectable({
  providedIn: 'root',
})
export class ClienteHttpService {
  private api = environment.UrlApiPFM2;
  private auth_token: any;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  async getToken() {
    this.auth_token = await (await Preferences.get({ key: 'token' })).value;
  }

  CalcularPrecio(lonLatOriDes: CalcularPrecioRequest) {
    const ruta = `${this.api}/calcularprecio`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth_token}`,
    });
    return this.http.post<CalcularPrecioResponse>(ruta, lonLatOriDes, {
      headers: headers,
    });
  }

  CrearEntrega(Entrega: CrearEntregaRequest) {
    const ruta = `${this.api}/entregas`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth_token}`,
    });
    return this.http.post<CrearEntregaResponse>(ruta, Entrega, {
      headers: headers,
    });
  }

  getEntrega(idEntregas: number) {
    const ruta = `${this.api}/entregas/${idEntregas}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth_token}`,
    });
    return this.http.get<Entrega>(ruta, { headers: headers });
  }
}
