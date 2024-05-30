import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, retry } from 'rxjs/operators';
// Servicios
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor( private _http: HttpClient,
    private _conf: ConfigService,
    private _bearerToken: BearerTokenService ) { }


  /**
   *
   * Función para obtener reporte de central de cuentas
   * @param {*} data
   * @return {*} 
   * @memberof ReportesService
   */
  getReportesCentralCtas( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.reportes }/centralCuentas/reporte`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
                .pipe(
                retry(3),
                map( ( resp:any, message: any ) => {
                  if( resp.length > 0 ) {
                    return resp;

                  } else {
                    return message.message;
                  }

                }),
                  catchError( ( err: any ) => {
                    return throwError(err)
                  })
                );

  }

  /**
   *
   * Función para obtener reporte calidad juridica
   * @param {*} data
   * @return {*} 
   * @memberof ReportesService
   */
  getReportesCalidadJuridica( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.reportes }/calidadJuridica/reporte`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
                .pipe(
                retry(3),
                map( ( resp:any ) => resp ),
                  catchError( ( err: any ) => {
                    return throwError(err)
                  })
                );

  }

  /**
   *
   * Función para obtener reporte dictaminación
   * @param {*} data
   * @return {*} 
   * @memberof ReportesService
   */
  getReportesDictaminacion( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.reportes }/dictaminacion/reporte`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => resp ),
                  catchError( ( err: any ) => {
                    return throwError(err)
                  })
               );

  }

  /**
   *
   * Función para obtener reportes para descargar
   * @param {*} data
   * @return {*} 
   * @memberof ReportesService
   */
  getReprotes( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.reportes }/dictaminacion/reporte/excel`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
               map( ( resp:any ) => resp ),
                 catchError( ( err: any ) => {
                   return throwError(err)
                 })
               );

  }

  /**
   *
   * Función para descargar archivos de reportes
   * @param {*} filename
   * @return {*} 
   * @memberof ReportesService
   */
  descargaReporte( filename: any ) {
     
    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.reportes }/dictaminacion/reporte/descarga?archivo=${ filename }`;
    let urlenc = encodeURI( url );
    
    return this._http.get( urlenc )
               .pipe(
                retry(3),
                map( ( resp:any ) => { return resp} ),
                  catchError( ( err: any ) => {
                    return throwError(err)
                  })
               );
    

  }

}
