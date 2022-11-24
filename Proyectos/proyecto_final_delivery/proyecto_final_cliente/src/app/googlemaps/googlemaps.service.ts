import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class GooglemapsService {
  apikey = environment.ApiKeyGoogleMaps;
  mapsLoaded = false;

  constructor() {}

  init(renderer: any, document: any): Promise<any> {
    return new Promise((resolve) => {
      if(this.mapsLoaded) {
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id = 'googleMaps';

      window['mapInit'] = () => {
        this.mapsLoaded = true;
        resolve(true);
        return;
      }

      if (this.apikey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apikey + '&callback=mapInit';
      }else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      renderer.appendChild(document.body, script);
    });
  }
}
