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
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})
export class GooglemapsComponent implements OnInit {
  originMarker: any;
  destinoMarker: any;

  _positionOrigen: any = null;
  _positionDestino: any = null;

  @Input()
  set positionOrigen(position: any) {
    this._positionOrigen = position;
    this.addMarker(position, 'Origen');
  }

  @Input()
  set positionDestino(position: any) {
    this._positionDestino = position;
    this.addMarker(position, 'Destino');
  }

  map: any;
  infoWindow: any;
  positionSet: any;

  @ViewChild('map') divMap?: ElementRef;

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
        console.log('Google maps ready');
        this.initMap();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  initMap() {
    let mapOptions = {
      center: { lat: -17.783779885678957, lng: -63.18217975277995 },
      zoom: 15,
      disableDefaultUI: false,
      clickableIcons: false,
    };

    this.map = new google.maps.Map(this.divMap?.nativeElement, mapOptions);

    this.originMarker = new google.maps.Marker({
      map: this.map,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      },
    });

    this.destinoMarker = new google.maps.Marker({
      map: this.map,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      },
    });
  }

  addMarker(position: any, destiny: string): void {
    if (destiny == 'Origen') {
      let latLng = new google.maps.LatLng(position.lat, position.lng);

      this.originMarker.setPosition(latLng);
      this.map.panTo(position);
      this.positionSet = position;
    }

    if (destiny == 'Destino') {
      let latLng = new google.maps.LatLng(position.lat, position.lng);

      this.destinoMarker.setPosition(latLng);
      this.map.panTo(position);
      this.positionSet = position;
    }
  }
}
