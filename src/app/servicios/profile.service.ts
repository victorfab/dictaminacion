import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Menu } from '../interfaces/menu.interface';
import { MenuService } from './menu.service';
import { Profile } from '../interfaces/profile.interface';
import { ConfigService } from './config.service';
import { BearerTokenService } from './bearer-token.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile!: any;

  name!: any;

  menus: Menu[] = [];

  permissions: any;

  constructor( private _http: HttpClient,
               private _router: Router,
               private _menuService:  MenuService,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) {

                this.menus = this._menuService.menu;

              }


  /**
   *
   * Función para obtener la cookie aplicativa
   * @param {string} name
   * @return {*} 
   * @memberof ProfileService
   */
  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
  

  /**
   *
   * Función para obtener el perfil del usuario
   * @param {*} usuario
   * @param {*} rol
   * @return {*} 
   * @memberof ProfileService
   */
  getProfile( usuario:any, rol:any, ipClient: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    let url = `${ this._conf.config.usuario }/profiles?idUser=${ usuario }&rol=${ rol }&ipClient=${ ipClient }`;

    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
        .pipe(
          retry(3),
          map(( resp: any ) => {
             this.profile = resp;
             return resp.data.profile;
          
          }),
          catchError((err: any) => {
            
            this._router.navigate(['/']);
            return throwError('Mensaje: ' + err.error.message);
          
          })
        );

  }

  getProfileCookie( ipClient: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    let url = `${ this._conf.config.usuario }/profiles/cookie?ipClient=${ ipClient }`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
        .pipe(
          retry(3),
          map(( resp: any ) => {
            this.profile = resp;
            return resp.data.profile;
          
          }),
          catchError((err: any) => {
            
            this._router.navigate(['/']);
            return throwError('Mensaje: ' + err.error.message);
          
          })
        );

  }

  /**
   *
   * Función para obtener el arreglo del menu
   * @param {*} idUser
   * @param {*} rolUser
   * @return {*} 
   * @memberof ProfileService
   */
  setMenuBar( idUser: any, rolUser: any, typeRol: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.menus.forEach(smenu => {
      smenu.active = false;
    });

    let url = `${ this._conf.config.usuario }/menus?userId=${ idUser }&rolUser=${ rolUser }&typeRol=${ typeRol }&ipClient=0.0.0.0&conn=`;
    let urlenc = encodeURI( url );

    return this._http.get( urlenc )
    .pipe(
      map(( resp: any ) => {
          
          this.permissions = resp.data;
          for ( const menu of this.permissions.menus ) {
            
            this.menus.forEach(smenu => {
             
              if (menu.id === smenu.id) {
                smenu.active = true
              }
            
            });
          
          }
          
        }),
      catchError((err: any) => {
        
        this._router.navigate(['/']);
        return throwError('Mensaje: ' + err.error.message);
      
      })
    );

  }

  /**
   *
   * Función para retornar el perfil
   * @return {*}  {Observable<Profile>}
   * @memberof ProfileService
   */
  returnProfile(): Observable<Profile> {

    let i = 0;
    
    return new Observable<Profile>(observer => {
      const interval = setInterval(() => {
        i++;
        this.name = localStorage.getItem('name');
        if (this.profile !== undefined) {
          observer.next(this.profile);
          clearInterval(interval);
          observer.complete();
        } else if (this.profile === undefined && i === 60) {
          clearInterval(interval);
          observer.error('Error al obtener el perfilamiento.');
        }
      }, 1000);
    });
  
  }

  /**
   *
   * Función para cambiar el perfil
   * @param {*} data
   * @return {*} 
   * @memberof ProfileService
   */
  changeProfile( data: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.usuario }/updateRol`;
    let urlenc = encodeURI( url );

    return this._http.put( urlenc, data)
    .pipe(
      map(( resp: any ) => {
        
        return resp.data.updaeteRolInfo;

      })
    );

  }

}


