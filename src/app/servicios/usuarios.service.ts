import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
// Servicios
import { ConfigService } from './config.service';
import { BearerTokenService } from './bearer-token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }

  /**
   *
   * Función para obtener usuarios
   * @param {string} [fechaInicio='']
   * @param {string} [fechaFin='']
   * @param {string} [idUsuario='']
   * @param {string} [tipoUsuario='']
   * @param {string} [region='']
   * @param {*} [idAbogado='']
   * @param {string} ipClient
   * @param {string} session
   * @return {*} 
   * @memberof UsuariosService
   */
  getUsuarios( fechaInicio: string = '', fechaFin: string = '', idUsuario: string = '', tipoUsuario: string = '', region: string = '', idAbogado: any = '', ipClient: string, session: string ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.usuario }/users?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&idUsuario=${idUsuario}&tipoUsuario=${tipoUsuario}&region=${region}&idAbogado=${idAbogado}&ipClient=${ipClient}&conn=${session}`;
    let urlenc = encodeURI( url );

    return this._http.get<any>( urlenc )
        .pipe(
          retry(3),
          map( ( resp:any ) => resp.data.users ),
          catchError( (error: HttpErrorResponse) => {
            return throwError(`${error.message}`);
          })
        )

  }

  /**
   *
   * Función para obtener detalle de usuario
   * @param {string} [idUsuario='']
   * @param {string} [tipoUsuario='']
   * @param {string} [region='']
   * @param {*} [idAbogado='']
   * @param {string} ipClient
   * @param {string} session
   * @return {*} 
   * @memberof UsuariosService
   */
  getUsuario( idUsuario: string = '', tipoUsuario: string = '', region: string = '', idAbogado: any = '', ipClient: string, session: string ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.usuario }/users?idUsuario=${idUsuario}&tipoUsuario=${tipoUsuario}&region=${region}&idAbogado=${idAbogado}&ipClient=${ipClient}&conn=${session}`;
    let urlenc = encodeURI( url );

    return this._http.get<any>( urlenc )
        .pipe(
          retry(3),
          map( ( resp:any ) => { return resp.data.users } ),
          catchError( (error: HttpErrorResponse) => {
            return throwError(`${error.message}`);
          })
        )

  }

  /**
   *
   * Función para crear un usuario
   * @param {*} data
   * @return {*} 
   * @memberof UsuariosService
   */
  createUsuario( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.usuario }/users`;
    let urlenc = encodeURI( url );

    return this._http.post( urlenc, data )
               .pipe(
                retry(3),
                 map( (resp:any) => resp ),
                 catchError( (errors: HttpErrorResponse) => {
                  return throwError(errors);
                })
               )

  }


  /**
   *
   * Función para actualizar usuario
   * @param {*} data
   * @return {*} 
   * @memberof UsuariosService
   */
  updUsuario( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.usuario }/users`;
    let urlenc = encodeURI( url );

    return this._http.put( urlenc, data )
               .pipe(
                retry(3),
                 map( (resp:any) => resp),
                 catchError( (error: HttpErrorResponse) => {
                  return throwError(`${error.message}`);
                })
               )

  }

  /**
   *
   * Función para eliminar usuario
   * @param {*} id
   * @param {*} tipoUsuario
   * @return {*} 
   * @memberof UsuariosService
   */
  delUsuario( id: any, tipoUsuario: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.usuario }/users/${id}?tipoUsuario=${tipoUsuario}`;
    let urlenc = encodeURI( url );

    return this._http.delete( urlenc )
               .pipe(
                  retry(3),
                  map( (resp:any) => resp),
                  catchError( (error: HttpErrorResponse) => {
                    return throwError(`${error.message}`);
                  })
               ) 
  }

}
