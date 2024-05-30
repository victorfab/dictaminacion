import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor( private _http:    HttpClient, 
               private _router: Router ) { }



  sessionPixel() {
    let url = 'http://mejico.isban.dev.corp/SEMMEX_ENS/EarEstatico/SEMMEX_ENS/BtoChannelDriver.ssobto?dse_operationName=sesionManager&appID=INTRAMX-APPEB-SSO_DICTA&ts=1678380283194';

    return new Promise(resolve => { 
          this._http.get( url )
          .toPromise()
          .then(resp => resolve(resp))
    });

  }


}
