import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GooglemapsService } from 'src/app/services/googlemaps.service';

declare var google: any;

@Component({
  selector: 'app-select-direction-in-map',
  templateUrl: './select-direction-in-map.component.html',
  styleUrls: ['./select-direction-in-map.component.scss'],
})
export class SelectDirectionInMapComponent implements OnInit {
  position:any = null;

  map: any;
  marker: any;
  infoWindow: any;
  positionSet: any;

  @ViewChild('map') divMap: ElementRef | undefined;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    private googlemapsService: GooglemapsService,
    public modalController: ModalController
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
    // let latLng = new google.maps.LatLng(this.position.lat, this.position.lng);

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

    this.clickHandlerEvent();
    this.infoWindow = new google.maps.InfoWindow();

    this.addMarker(this.position);
  }

  clickHandlerEvent() {
    this.map.addListener('click', (event: any) => {
      this.position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.addMarker(this.position);
      this.setPositionSuper();
    });
  }

  addMarker(position: any): void {
    let latLng = new google.maps.LatLng(position.lat, position.lng);

    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setPositionSuper() {
    this.modalController.dismiss(this.positionSet, 'position');
  }
}
