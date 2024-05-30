import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Servicios
import { ConfigService } from './config.service';
import { BearerTokenService } from './bearer-token.service';

@Injectable({
  providedIn: 'root'
})
export class MisSolicitudesService {

  private _changeProfileAdmin = new Subject<boolean>();
  changeProfileAdminObservable = this._changeProfileAdmin.asObservable();

  constructor( private _http: HttpClient,
               private _conf: ConfigService,
               private _bearerToken: BearerTokenService ) { }

  /**
   *
   * Función para obtener dictamenes
   * @param {*} dataSolicitud
   * @return {*} 
   * @memberof MisSolicitudesService
   */
  getDictamentes( dataSolicitud: any ) {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    let url = `${ this._conf.config.folio }/missolicitudes/buscarMisSolicitudes`;
    let urlenc = encodeURI( url );

    return this._http.post<any>( urlenc, dataSolicitud )
        .pipe(
          retry(3),
          map( ( resp:any ) => {

            return resp;
          
          })
        )

  }

  setChangeProfileAdmin(value: boolean) {
    this._changeProfileAdmin.next(value);
  }


}
