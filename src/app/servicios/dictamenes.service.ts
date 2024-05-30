import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DictamenesService {

  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }


  /**
   *
   * Función para obtener el Dictamen de Operaciones Bancarias en pdf
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getDictamentOPBancPDF( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/reporteDictamenOperBanco`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => {
                  return resp;
                }),
                catchError( (error: HttpErrorResponse ) => {
                    return throwError(error);
                  })
                )

  }

  /**
   *
   * Función para obtener el dictamen de operacioens bancarias
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getOpBan( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.dictamen }/reporteDictamenOperBan`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                  map( ( resp:any ) => { return resp } ),
                  catchError( (error: HttpErrorResponse) => {
                      return throwError(error.error.errors);
                    })
                  )

  }

  /**
   *
   * Función para insertar/actualizar dictamen operaciones bancarias
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  insupdOpBanc( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/insertDictamenOperBanco`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                 map( ( resp:any ) => { return resp.data } ),
                  catchError( (error: HttpErrorResponse) => {
                     return throwError(error);
                   })
                 )

  }

  /**
   *
   * Función para botener dictamen gobierno e instituciones en pdf
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getDictamenGobeInstPDF( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getDictamenGobiernoPdf`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => {
                  return resp;
                }),
                catchError( (error: HttpErrorResponse ) => {
                    return throwError(error);
                  })
                )

  }

  /**
   *
   * Función para obtener dictamen gobierno e instituciones
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getGobInst( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.dictamen }/getDictamenGobObjeto`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                  map( ( resp:any ) => { return resp } ),
                  catchError( (error: HttpErrorResponse) => {
                    return throwError(error.error.errors);
                  })
                )

  }

  /**
   *
   * Función para insertar/actualizar dictamen gobierno e instituciones
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  insupdGobInst( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/insertDictamenGob`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(5),
                 map( ( resp:any ) => { return resp.data } ),
                  catchError( (error: HttpErrorResponse) => {
                     return throwError(error);
                   })
                 )

  }

  /**
   *
   * Función para obtener dictamen especial en pdf
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getDictamentEspPDF( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getDictamenEspecialPdf`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => {
                  return resp;
                }),
                catchError( (error: HttpErrorResponse) => {
                    return throwError(error);
                  })
                )

  }

  /**
   *
   * Función para obtener dictamen especial
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getEsp( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.dictamen }/getDictamenEspecial`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => { return resp } ),
                catchError( (error: HttpErrorResponse) => {
                  return throwError(error.error.errors);
                })
              )

  }

  /**
   *
   * Función para insertar/actualizar dictamen especial
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  instupdEsp( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/insertDictamenEspecial`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                  map( ( resp:any ) => { return resp.data } ),
                  catchError( (error: HttpErrorResponse) => {
                      return throwError(error);
                    })
                  )

  }

  /**
   *
   * Función para obtener el dictamen devolución de saldo en pdf
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getDictamentDevSalPDF( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getDictamenDevSaldoPdf`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => {
                  return resp;
                }),
                catchError( (error: HttpErrorResponse) => {
                    return throwError(error);
                  })
                )

  }

  /**
   *
   * Función para obtener el dictamen devolución de saldo
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getDevSal( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getDictamenDevSaldo`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                  retry(3),
                  map( ( resp:any ) => { return resp } ),
                  catchError( (error: HttpErrorResponse) => {
                    return throwError(error.error.errors);
                  })
                )

  }

  /**
   *
   * Función para insertar/actualizar dictamen devolución de saldo
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  insupdDevSal( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/insertDictamenDevSaldo`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                 map( ( resp:any ) => { return resp.data } ),
                  catchError( (error: HttpErrorResponse) => {
                     return throwError(error);
                   })
                 )

  }

  /**
   *
   * Función para obtener dictamen persona fisica en pdf
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getDictamenPerFisPDF( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getDictamenPersonaFisicaPdf`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => {
                  return resp;
                }),
                catchError( (error: HttpErrorResponse) => {
                    return throwError(error);
                  })
                )

  }

  /**
   *
   * Función para obtener el dictamen persona fisica
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getPersFis( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getDictamenPersonaFisica`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                  retry(3),
                  map( ( resp:any ) => { return resp } ),
                  catchError( ( err: any ) => {
                    return throwError(err)
                  })
               )

  }

  /**
   *
   * Función para insertar/actualizar dictamen persona fisica
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  insupdPersFis( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/insertDictamenPersonaFisica`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                 map( ( resp:any ) => { return resp.data } ),
                  catchError( (error: HttpErrorResponse) => {
                     return throwError(error);
                   })
                 )

  }

  /**
   *
   * Función para obtener el dictamen fideicomiso en pdf
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getDictamenFideicomisoPDF( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getDictamenFideicomisoPdf`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => {
                  return resp;
                }),
                catchError( (error: HttpErrorResponse) => {
                    return throwError(error);
                  })
                )

  }

  /**
   *
   * Función para obtener el dictamen de fideicomiso
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getFideicomiso( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getDictamenFideicomiso`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                  retry(3),
                  map( ( resp:any ) => { return resp } ),
                  catchError( (error: HttpErrorResponse) => {
                    return throwError(error.error.errors);
                  })
                )

  }

  /**
   *
   * Función para insertar/actualizar dictamen Fideicomiso
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  insupdFideicomiso( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/insertDictamenFideicomiso`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                 map( ( resp:any ) => { return resp.data } ),
                  catchError( (error: HttpErrorResponse) => {
                     return throwError(error);
                   })
                 )

  }

  /**
   *
   * Función para obtener el ultimo dictamen exitoso
   * @param {*} data
   * @return {*} 
   * @memberof DictamenesService
   */
  getLastDict( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.dictamen }/getUltimoDictamen`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                  map( ( resp:any ) => { return resp.data } ),
                  catchError( (error: HttpErrorResponse) => {
                      return throwError(`${error.message}`);
                    })
                  )

  }

  upDocFileNet( data:any ) {
    
    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.filenet }/cargarArchivo`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                map( ( resp:any ) => { return resp } ),
                  catchError( (errors: HttpErrorResponse) => {
                      return throwError(errors);
                    })
                  )


  }

  getBase64FileNet( id: any, nombre: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.filenet }/consultaDocumento?idFilenet=${id}&nombreDoc=${nombre}`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
               .pipe(
                retry(3),
                map( ( resp:any ) => { return resp } ),
                  catchError( (error: HttpErrorResponse) => {
                      return throwError(`${error.message}`);
                    })
                  )

  }

  getBase64FileNetDictamen( id:any, ) {

  this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

  let url = `${ this._conf.config.filenet }/consultaDictamen?idSol=${id}`;
  let urlenc = encodeURI( url );

    return this._http.get( urlenc )
    .pipe(
    retry(3),
    map( ( resp:any ) => { return resp } ),
      catchError( (error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
  }

}
