import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, retry } from 'rxjs/operators';
//Interfaces
import { Catbanca } from '../interfaces/catalogos.interface';
//Servicios
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  displayModalM!: boolean;
  messageModalM!: string;
  iconModalM!: string

  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }


  /**
   *
   * Función para obtener obtener catalogo de estado
   * @return {*} 
   * @memberof CatalogosService
   */
  getEstado() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/estatus`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                 map( ( resp: any ) => { return resp.data.beanCatalogos } )
               )

  }

  /**
   *
   * Función para obtener catalogo región
   * @return {*} 
   * @memberof CatalogosService
   */
  getRegion() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/region`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                 map( ( resp: any ) => { return resp.data.beanCatalogos } )
               )

  }

  /**
   *
   * Función para obtener catalogo tipo de dictamen
   * @return {*} 
   * @memberof CatalogosService
   */
  getTypeDict() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/tipodict`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => { return resp.data.beanCatalogos } )
                )

  }

  /**
   *
   * Función para obtener catalogo tipo de dictamen por RFC
   * @param {*} clave
   * @return {*} 
   * @memberof CatalogosService
   */
  getTypeDictRFC( clave: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/metacatalogo?tipo=DICTAMEN_PERSONA&clave=${clave}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
                .pipe(
                  retry(3),
                  map( ( resp: any ) => { return resp.data.informacion; } ),
                    catchError((errors: any) => {
                      return throwError(errors);
                    })
                );
  
  }

  /**
   *
   * Función para obtener catalogo Banca
   * @return {*} 
   * @memberof CatalogosService
   */
  getBank() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/banca`;
    let urlenc = encodeURI( url );

    return this._http.get<Catbanca>( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => resp.data.beanCatalogos ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                  );

  }

  /**
   *
   * Función para obtener catalogo zona
   * @return {*} 
   * @memberof CatalogosService
   */
  getZona() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/zona`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => resp.data.beanCatalogos ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                );

  }

  /**
   *
   * Función para obtener el tipo de usuario
   * @return {*} 
   * @memberof CatalogosService
   */
  getTypeUsr() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/tipousr`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => resp.data.beanCatalogos ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                );

  }

  /**
   *
   * Funcíón para obtener el tipo de reingresos
   * @return {*} 
   * @memberof CatalogosService
   */
  getReing() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/reingresos`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => resp.data.beanCatalogos ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                );

  }

  /**
   *
   * Función para obtener el catalogo de reingresos
   * @return {*} 
   * @memberof CatalogosService
   */
  getReingreso() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/metacatalogo?tipo=REINGRESO_ERROR`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => resp.data.informacion ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                );

  }

  /**
   *
   * Función para obtener el buc
   * @param {*} data
   * @return {*} 
   * @memberof CatalogosService
   */
  getBuc( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let urlbuc = `${ this._conf.config.folio }/apiconnect/validaBucAlt`;
    let bucenc = encodeURI( urlbuc );

    return this._http.post( bucenc, data )
               .pipe(
                retry(3),
                  map( ( resp: any ) => resp.data ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                );    

  }

  /**
   *
   * Función para obtener el RFC
   * @param {*} data
   * @return {*} 
   * @memberof CatalogosService
   */
  getRFC( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/apiconnect/findrfc`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                 map( ( resp: any ) => resp.data ),
                  catchError( (error: any) => {
                    return throwError(error);
                  })
               );

  }

  /**
   *
   * Función para obtener catalogo de tipo de empresa
   * @param {*} id
   * @return {*} 
   * @memberof CatalogosService
   */
  getTipoEmpresa( id: any, tipoPer: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/metacatalogo/dictamen_empresa?idTipoDict=${id}&tipoPer=${tipoPer}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => { return resp.data.informacion } ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                );    

  }

  /**
   *
   * Función para obtener tipo de rechazo
   * @return {*} 
   * @memberof CatalogosService
   */
  getRipoRechazo() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/tiporech`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => resp.data.beanCatalogos ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                );

  }

  /**
   *
   * Función para obtener catalogo sub tipo de rechazo
   * @param {*} tipoId
   * @return {*} 
   * @memberof CatalogosService
   */
  getSubtipoRipoRechazo( tipoId: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/subrech?tipoId=${tipoId}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                  map( ( resp: any ) => resp.data.beanCatalogos ),
                    catchError((err: any) => {
                      return throwError(err);
                    })
                );

  }

  /**
   *
   * Función para obtener catalogo de abogado de seguimiento
   * @return {*} 
   * @memberof CatalogosService
   */
  getAbogadodeSeguimiento() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/abogseguimiento`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                map( ( resp: any ) => resp.data.beanCatalogos ),
                  catchError((err: any) => {
                    return throwError(err);
                  })
               );

  }

  /**
   *
   * Funcion para obtener catalogo de abogado externo
   * @param {*} tipoid
   * @return {*} 
   * @memberof CatalogosService
   */
  getAbogadoExterno( tipoid: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/abogexterno?tipoId=${ tipoid }`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                map( ( resp: any ) => resp.data.beanCatalogos ),
                  catchError((err: any) => {
                    return throwError(err);
                  })
               );

  }

  /**
   *
   * Función para obtener documentos por tipo de dictamen
   * @param {*} idTipoDictamen
   * @param {*} idTipoEmpresa
   * @return {*} 
   * @memberof CatalogosService
   */
  getDocumentosEmpDict( idTipoDictamen: any, idTipoEmpresa: any, tipoPer:any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.catalogo }/documento/getdocbyempresabydictamen?idTipoDictamen=${ idTipoDictamen }&idTipoEmpresa=${ idTipoEmpresa }&tipoPer=${ tipoPer }`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                map( ( resp: any ) => {return resp.dataDto?.listDocumento} ),
                  catchError((errors: any) => {
                    return throwError(errors);
                  })
                );
  }

  /**
   *
   * 
   * Función para obtener catalogo de entidades
   * @return {*} 
   * @memberof CatalogosService
   */
  getEntidades() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.catalogo }/entidadfederativa`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                map( ( resp: any ) => { return resp.dto.entidadess} ),
                  catchError((err: any) => {
                    return throwError(err);
                  })
                );

  }

  /**
   *
   * Función para obtener catalogo de municicpios
   * @param {*} entidad
   * @return {*} 
   * @memberof CatalogosService
   */
  getMunicipios( entidad: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.catalogo }/municipiobyentidad?idEntidad=${ entidad }`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                map(( resp: any ) => {

                  return resp.dto.municipios;

                }),
                  catchError((err: any) => {

                    return throwError(err);
                  })
                );

  }

}
