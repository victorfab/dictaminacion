import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { from } from 'rxjs';
import { throwError } from 'rxjs';
// Servicios
import { ConfigService } from './config.service';
// Interfaces
import { TokenBearer } from '../interfaces/tokenBearer.interface';

@Injectable({
  providedIn: 'root'
})
export class BearerTokenService {

  constructor( private _http: HttpClient,
               private _conf: ConfigService ) {}
  

  /**
   * Función para obtener el token de autorización de los web services
   *
   * @return {*} 
   * @memberof BearerTokenService
   */
  setBearerToken() {

   let url = `${ this._conf.config.tokenbearer }`;

    const headers = new HttpHeaders()
          .set('Authorization', `${'Basic' + ' ' + this._conf.config.password }`);

    return this._http.get<TokenBearer>( url, {headers})
      .pipe(
          retry(3),
          map((resp: any) => {
            return localStorage.setItem( 'bearer', resp.access_token );
            
          }),
          catchError((err: any) => {
            return throwError(err);
          })
      );
  }

  /**
   * Almacena el token de autorización
   * @return {*} 
   * @memberof BearerTokenService
   */
  getBearerToken() {
    return localStorage.getItem('bearer');
  }

  /**
   * Servicio para obtener la ip del cliente
   * @return {*} 
   * @memberof AuthService
   */
/*   getIpAdress() {

    let getIp = from(fetch("https://api.ipify.org/?format=json")
    .then(response => { return response.json(); })
    .then(data => { return data.ip; })
    .catch(error => { return error.message; }));

    return getIp;
  } */
  
}

