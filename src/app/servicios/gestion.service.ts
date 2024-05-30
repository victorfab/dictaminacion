import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GestionService {


  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }

  /**
   *
   * Función para obtener dictamenes
   * @param {*} dataSolicitud
   * @return {*} 
   * @memberof GestionService
   */
  getDictamentes( dataSolicitud: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/administrador/busquedaGestionDiaria`;
    let urlenc = encodeURI( url );

    return this._http.post<any>( urlenc, dataSolicitud )
        .pipe( 
          retry(3),
          map( ( resp:any ) => {

            return resp;
          
          })
        )

  }

  /**
   *
   * Función para obtneer dictamenes con busqueda avazada
   * @param {*} dataSolicitud
   * @return {*} 
   * @memberof GestionService
   */
  getDictamentesAdv( dataSolicitud: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/administrador/busquedaFiltroGestionDiaria`;
    let urlenc = encodeURI( url );

    return this._http.post<any>( urlenc, dataSolicitud )
        .pipe( 
          retry(3),
          map( ( resp:any ) => {

            return resp;
          
          })
        )

  }

  /**
   *
   * Función para reasignar un dictamen
   * @param {*} data
   * @return {*} 
   * @memberof GestionService
   */
  reasignarDictamenSeg( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/reasignar/reasignaDictamen/seg`;
    let urlenc = encodeURI( url );

    return this._http.put<any>( urlenc, data )
        .pipe( 
          retry(3),
          map( ( resp:any ) => {

            return resp;
          
          })
        )

  }

  /**
   *
   * Función para reasignar un dictamen
   * @param {*} data
   * @return {*} 
   * @memberof GestionService
   */
  reasignarDictamenExt( data:any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/reasignar/reasignaDictamen/ext`;
    let urlenc = encodeURI( url );

    return this._http.put<any>( urlenc, data )
        .pipe( 
          retry(3),
          map( ( resp:any ) => {

            return resp;
          
          })
        )

  }

}
