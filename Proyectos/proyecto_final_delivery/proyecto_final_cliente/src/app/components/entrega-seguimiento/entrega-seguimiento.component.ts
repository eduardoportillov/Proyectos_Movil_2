import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { GooglemapsService } from 'src/app/services/googlemaps.service';

declare var google: any;
@Component({
  selector: 'app-entrega-seguimiento',
  templateUrl: './entrega-seguimiento.component.html',
  styleUrls: ['./entrega-seguimiento.component.scss'],
})
export default class EntregaSeguimientoComponent implements OnInit {
  map: any;
  marker: any;
  infoWindow: any;
  positionSet: any;

  _positionActual: any = null;
  @Input() _positionOrigen: any;
  @Input() _positionDestino: any;

  @Input()
  set positionActual(position: any) {
    this._positionActual = position;
    this.addMarker(position, 'actual');
  }

  @Input()
  set positionOrigen(position: any) {
    this._positionOrigen = position;
    this.addMarker(position, 'origen');
  }

  @Input()
  set positionDestino(position: any) {
    this._positionDestino = position;
    this.addMarker(position, 'destino');
  }

  @ViewChild('map') divMap: ElementRef | undefined;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    private googlemapsService: GooglemapsService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.googlemapsService
      .init(this.renderer, this.document)
      .then(() => {
        this.initMap();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  initMap() {
    let mapOptions = {
      center: { lat: -17.783779885678957, lng: -63.18217975277995 },
      zoom: 12,
      disableDefaultUI: false,
      clickableIcons: false,
    };

    this.map = new google.maps.Map(this.divMap?.nativeElement, mapOptions);
  }

  addMarker(position: any, type: string): void {
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    let url;
    switch (type) {
      case 'origen':
        url = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        break;

      case 'destino':
        url = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        break;

      case 'actual':
        url = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
    }

    //position en tiempo real
    // this.marker.setPosition(latLng);
    // this.map.panTo(position);
    // this.positionSet = position;

    //Add todos los markers de la ruta
    new google.maps.Marker({
      position: latLng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false,
      icon: {
        url: url,
      },
    });
  }
}
