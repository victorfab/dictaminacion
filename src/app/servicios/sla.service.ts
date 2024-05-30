import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Diainhabil } from '../interfaces/diainhabil.interface';
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SlaService {

  diainhabilNames: string[] = [];

  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }


  /**
   *
   * Funcíón para obtener el metacatalogo de SLA
   * @return {*} 
   * @memberof SlaService
   */
  getMetacatalogoSLA() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    const SLA: any = 'SLA';

    let url = `${ this._conf.config.catalogo }/metacatalogo?tipo=${SLA}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                 map( ( resp: any ) => resp.data ),
                  catchError( (err: any ) => {
                    return throwError(err);
                  })
               );

  }

  /**
   *
   * Función para obtener el metacatalogo HL
   * @return {*} 
   * @memberof SlaService
   */
  getMetacatalogoHL() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    const HORARIO_LABORAL: any = 'HORARIO_LABORAL';

    let url = `${ this._conf.config.catalogo }/metacatalogo?tipo=${HORARIO_LABORAL}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                 map( ( resp: any ) => resp.data ),
                  catchError( (err: any ) => {
                    return throwError(err);
                  })
               );

  }

  /**
   *
   * Función para guardar los horarios laborales
   * @param {*} data
   * @return {*} 
   * @memberof SlaService
   */
  saveMetaSLA_HL( data: any ){

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/metacatalogo`;
    let urlenc = encodeURI( url );

    return this._http.put( urlenc, data )
               .pipe(
                 map( ( resp:any ) => resp ),
                   catchError( ( err: any ) => {
                     return throwError(err)
                   })
               );

  }

  /**
   *
   * Función para guardar los dias inhabiles
   * @param {*} data
   * @return {*} 
   * @memberof SlaService
   */
  saveDiasInhabiles( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/dias_inhabiles`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                 map( (resp:any ) => resp),
                  catchError( ( err: any ) => {
                    return throwError(err)
                 })
               );

  }

  /**
   *
   * Función para obtener los dias inhabiles
   * @return {*} 
   * @memberof SlaService
   */
  getDiasInhabiles() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/dias_inhabiles`;
    let urlenc = encodeURI( url );

      return this._http.get<any>( urlenc )
                  .toPromise()
                  .then(res => <Diainhabil[]>res.data.dias)
                  .then(data => { return data })

  }

  /**
   *
   * Función para actualizar los dias inhabiles
   * @param {*} data
   * @return {*} 
   * @memberof SlaService
   */
  updtDiasinhabiles( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/dias_inhabiles`;
    let urlenc = encodeURI( url );

    return this._http.put( urlenc, data )
               .pipe(
                map( ( resp:any ) => resp ),
                  catchError( ( err: any ) => {
                    return throwError(err)
                  })
               );

  }

  /**
   *
   * Función para borrar un dia inhabil
   * @param {*} idFecha
   * @return {*} 
   * @memberof SlaService
   */
  deleteDiasInhabiles( idFecha: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.catalogo }/dias_inhabiles?idFecha=${idFecha}`;
    let urlenc = encodeURI( url );

    return this._http.delete( urlenc )
               .pipe(
                map( ( resp:any ) => resp ),
                  catchError( ( err: any ) => {
                    return throwError(err)
                  })
                );

  }

  /**
   *
   * Función para generar un id
   * @return {*} 
   * @memberof SlaService
   */
  generateId() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
      for (let i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      
      return text;
  }

  /**
   *
   * Función para generar un numbre
   * @return {*} 
   * @memberof SlaService
   */
  generateName() {
      return this.diainhabilNames[Math.floor(Math.random() * Math.floor(30))];
  }

}
