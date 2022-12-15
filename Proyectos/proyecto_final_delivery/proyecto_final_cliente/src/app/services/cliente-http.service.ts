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
    this.auth_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5M2Q1MTg1My0wYmE1LTRhYTAtYjRkNS1kZjU4NDZhNGM2MWEiLCJqdGkiOiJmM2JiODY0ZWQ1ODc2NDQ0ZmYzOTQzMWI1MDMwYTQ0MGRmMGVkMjQzYWRhMTI5MTU5M2M0YjQzMzk1MmI3OTI4MDY5Y2ZkOTYyODhiMDAzMiIsImlhdCI6MTY3MTA4MzIzMi4xMTk2MDUwNjQzOTIwODk4NDM3NSwibmJmIjoxNjcxMDgzMjMyLjExOTYxMTk3ODUzMDg4Mzc4OTA2MjUsImV4cCI6MTcwMjYxOTIzMi4xMTcwNjMwNDU1MDE3MDg5ODQzNzUsInN1YiI6Ijc4Iiwic2NvcGVzIjpbXX0.Mu0KDEjZeTduy7Mgu8TzhQxksvGjjmZi9nNW8RClzRuV7eD3Z1CJ9r74bXCgBI-NBu240El_TVYhxRjkgvDxnUsz0R1d_uiWUuegEStDfYNMTgsD5LH9S4OiaxZa-64tqd9xcHCKHTrp2BH8G7krTs_fCBWQgAJloMeP0_yR1EiCN96Lt1ILUEXpAsqr3E1EvZUnhhGDgTj9IcYry69uNvGPwescMU8N5_nhyU_BQTRn2YSAwtXuNqquy8spJlIP8HzPr4hpv4ednrIHs9I1WoCuQPEDMk9WdYtcmn-HHaEZwN3czCECwSn2n4Evl7VmWwx0TQfQHH6NbORM8HqEmcBUyDRwEF5jB88sGrqUC8Q-_RIDsQXiv1goQjmBfeURKNP8W-8Ixupxv6CctKKv6sfSnboFE71eeTxc5m6xjgaPQV6VSVasA1ZCuRsxuGi4rQ2KvqtLBtN-gk1zvp8rVYQ4AL6rm47ogZuFM0XlwLAktA-bJeXs6YyJKR6_pCNod8CSZiInHgXJ1rCse7rXM_bZXBljOsck7lL4yXYXb8KSoKUvxxSZZWjQCifYeqfzo4cFwhb6eN_uV2pamHwiktALFQ57RqTIQ6bLD3RpJrPf5cLr5au42Td2-L-Dtpe-uGbMyknl-OzAPds0WSZoV4ifLbZIP1cWF5x0xF0TmeA';
    // this.getToken();
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

    return this.http.get<Entrega>(ruta, {
      headers: headers,
    });
  }
}
