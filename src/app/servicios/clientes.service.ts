import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// Servicios
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }


  /**
   * 
   * Función para crear usuarios
   * @param {*} data
   * @return {*} 
   * @memberof ClientesService
   */
  createClientes( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/altaPersona`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                map( (resp:any) => resp ),
                catchError( (error: HttpErrorResponse) => {
                  return throwError(`${error.message}`);
                })
              )
              
  }


}
