import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GooglemapsService } from './googlemaps.service';

declare var google: any;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})
export class GooglemapsComponent implements OnInit {
  @Input() position = { lat: 51.678418, lng: 7.809007 };

  label = { title: 'My Location', subtitle: 'My Subtitle' };
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
    const position = this.position;
    let latLng = new google.maps.LatLng(position.lat, position.lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: false,
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
    this.addMarker(position);
  }

  clickHandlerEvent() {
    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.addMarker(position);
    });
  }

  addMarker(position: any): void {
    let latLng = new google.maps.LatLng(position.lat, position.lng);

    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker: any, title: string, subtitle: string): void {
    const contentString =
      '<div id="contentInsideMap">' +
      '<div>' +
      '</div>' +
      '<p style="font-weight: bold; margin-bottom: 5px;">' +
      title +
      '</p>' +
      '<div id="bodyContent">' +
      '<p class"normal m-0">' +
      subtitle +
      '</p>' +
      '</div>' +
      '</div>';

    this.infoWindow.setContent(contentString);
    this.infoWindow.open(this.map, marker);
  }
}
