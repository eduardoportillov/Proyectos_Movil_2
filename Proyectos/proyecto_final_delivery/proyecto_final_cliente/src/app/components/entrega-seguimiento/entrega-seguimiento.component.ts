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
  _position: any = null;

  map: any;
  marker: any;
  infoWindow: any;
  positionSet: any;

  @Input()
  set position(position: any) {
    this._position = position;
    this.addMarker(position);
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
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false,
    };

    this.map = new google.maps.Map(this.divMap?.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
    this.addMarker(this.position);
  }

  addMarker(position: any): void {
    let latLng = new google.maps.LatLng(position.lat, position.lng);

    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }
}
