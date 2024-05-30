import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DictaminacionService {

  displayModalM!: boolean;
  messageModalM!: string;
  iconModalM!: string


  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }

  /**
   *
   * Función para obtener el folio del dictamen
   * @param {*} idfolio
   * @param {string} usrRed
   * @param {string} ipClient
   * @param {string} session
   * @return {*} 
   * @memberof DictaminacionService
   */
  getFolioDictamen( idfolio: any, usrRed: string, ipClient: string, session: string ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/consultabyidfolio?idfolio=${idfolio}&usrRed=${usrRed}&ipClient=${ipClient}&conn=${session}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                 retry(3),
                 map( ( resp:any ) => { return resp.data.beanConsultarFolioDelDictamen } ),
                   catchError( (error: HttpErrorResponse) => {
                     return throwError(`${error.message}`);
                   })
                 )

  }

  /**
   *
   * Función para obtener el folio por id
   * @param {*} idfolio
   * @param {string} usrRed
   * @param {string} ipClient
   * @param {string} session
   * @return {*} 
   * @memberof DictaminacionService
   */
  getIdxFolio( idfolio: any, usrRed: string, ipClient: string, session: string ) {
    
    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/consultacompletobyidfolio?idfolio=${idfolio}&usrRed=${usrRed}&ipClient=${ipClient}&conn=${session}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                 map( ( resp:any ) => { return resp.data } ),
                   catchError( (error: HttpErrorResponse) => {
                    return throwError(`${error.message}`);
                   
                    })
                 )

  }

  /**
   *
   * Función para obtener los comentarios de un folio
   * @param {*} idDictSol
   * @param {string} usrRed
   * @param {string} ipClient
   * @param {string} session
   * @return {*} 
   * @memberof DictaminacionService
   */
  getComments( idDictSol: any, usrRed: string, ipClient: string, session: string ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/estatussolicitudes/obtenerComentarios?idDictSol=${idDictSol}&usrRed=${usrRed}&ipClient=${ipClient}&conn=${session}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
    .pipe(
      retry(3),
      map( ( resp:any ) => { return resp.data.lista } ),
        catchError( (error: HttpErrorResponse) => {
          return throwError(`${error.message}`);
        })
      )

  }

  /**
   *
   * Función para publicar un dictamen
   * @param {*} data
   * @return {*} 
   * @memberof DictaminacionService
   */
  publicDictamen( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.folio }/estatussolicitudes/publicarDictamen`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
    .pipe(
      retry(3),
      map( ( resp:any ) => { return resp } ),
        catchError( (error: HttpErrorResponse) => {
          return throwError(`${error.message}`);
        })
      )

  }

  /**
   *
   * Función para rechazar un dictamen
   * @param {*} data
   * @return {*} 
   * @memberof DictaminacionService
   */
  rejectDictamen( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/estatussolicitudes/rechazaDictamen`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
              .pipe(
                retry(3),
                map( ( resp:any ) => { return resp } ),
                  catchError( (error: HttpErrorResponse) => {
                    return throwError(`${error.message}`);
                  })
                )

  }

  /**
   *
   * Función para salvar los documentos dictaminados
   * @param {*} data
   * @return {*} 
   * @memberof DictaminacionService
   */
  saveDocsDictaminados( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/updateDocumentosbyfolio`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
              .pipe(
                retry(3),
                map( ( resp:any ) => { return resp } ),
                  catchError( (error: HttpErrorResponse) => {
                    return throwError(`${error.message}`);
                  })
                )

  }

  /**
   *
   * Función para actualizar prioridad
   * @param {*} data
   * @return {*} 
   * @memberof DictaminacionService
   */
  updtFolioPrioridad(data: any) {

    let url = `${ this._conf.config.folio }/updatefolioprioridad`;
    let urlenc = encodeURI( url );
    
    return this._http.put(url, data)
               .pipe(
                retry(3),
                map( ( resp:any ) => { return resp } ),
                  catchError( (error: HttpErrorResponse) => {
                    return throwError(`${error.message}`);
                  })
                )
  }


}
