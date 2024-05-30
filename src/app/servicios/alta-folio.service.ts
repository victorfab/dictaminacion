import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
// Servicios
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AltaFolioService {

  // modal Message
  displayModalM!: boolean;
  messageModalM!: string;
  iconModalM!: string

  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }


  /**
   * Función para insertar Folio
   *
   * @param {*} data
   * @return {*} 
   * @memberof AltaFolioService
   */
  createFolio( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/insertfolio`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( (resp:any) => { return resp } ),
                  catchError( (errors: HttpErrorResponse) => {
                    return throwError(errors);
                  })
                )

  }

  /**
   *
   * Función para obtener el folio padre
   * @param {*} folioorigen
   * @param {string} ured
   * @param {string} ip
   * @param {string} session
   * @return {*} 
   * @memberof AltaFolioService
   */
  getFolioPadre( folioorigen: any, ured: string, ip: string, session: string ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.folio }/consultacompletobyidfolio?idfolio=${folioorigen}&usrRed=${ured}&ipClient=${ip}&conn=${session}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                 map( ( resp:any ) => { return resp } ),
                   catchError( (error: HttpErrorResponse) => {
                    this.messageModalM = `${error.error.errors[0].message}`;
                    this.iconModalM = 'warning';
                    this.displayModalM = true;
                    return throwError(`${error.status}\nMessage: ${error.message}`);
                   })
                 )

  }

  /**
   *
   * Función para obtener el tipo de dictamen
   * @param {*} tipo
   * @return {*} 
   * @memberof AltaFolioService
   */
  getTipoDictamen( tipo: any ) {

      this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

      const DICTAMEN_PERSONA: any = 'DICTAMEN_PERSONA';
  
      let url = `${ this._conf.config.catalogo }/metacatalogo?tipo=${DICTAMEN_PERSONA}&clave=${tipo}`;
      let urlenc = encodeURI( url );

      return this._http.get( urlenc )
                 .pipe(
                  retry(3),
                   map( ( resp: any ) => resp.data.informacion ),
                    catchError( (err: any ) => {
                      return throwError(err);
                    })
                 );

  }

  /**
   *
   * Función para actualizar el folio
   * @param {*} data
   * @return {*} 
   * @memberof AltaFolioService
   */
  updtClienteFolio( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/cliente/updateclientefolio`;
    let urlenc = encodeURI( url );

    return new Promise( resolve => {

      this._http.post( urlenc, data )
                         .toPromise()
                         .then( resp => resolve( resp ) )

    });
    

  }

  /**
   *
   * Función para reportar un folio
   * @param {*} data
   * @return {*} 
   * @memberof AltaFolioService
   */
  updtReportFolio(data: any) {
    let url = `${ this._conf.config.folio }/reportfoliobyid`;
    return new Promise(resolve => {
      this._http.post(url, data)
        .toPromise()
        .then(resp => resolve(resp))
    });
  }

}
