import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public appConfig!: any;
  public tokenbearer!: any;
  public config: any;
  public txt: any;
  public datap = '';

  constructor( private _http: HttpClient, 
               private _domSanitizer: DomSanitizer) { }


  /**
   *
   * Funcion para obtener los endpoints del config.json para los servicios
   * @param {*} [url]
   * @return {*} 
   * @memberof ConfigService
   */
  public loadConfig( url?: any ) {

    const localHostname = this.getParams('localHostname');
    const localPath = this.getParams('localPath');
    
    let location = (window.location.hostname === 'localhost')
      ? '/assets/config/config.json'
      : (window.location.hostname === localHostname)
        ? `${localPath}/assets/config/config.json`
        : (window.location.href.includes('Dicta2.0')) 
        ? '/backendext' : '/backend';

        

      if (window.location.hostname.match(/^\d/)) {
        location = `${localPath}/assets/config/config.json`;
      }
    
    const locationSecure = this._domSanitizer.sanitize(SecurityContext.URL, location);

    const promise = this._http.get<any>
      (locationSecure!)
      .toPromise()
      .then(settings => {
        const configura = (settings) ? settings : '';
        Object.keys(configura).forEach(key => {
          if (typeof configura[key] === 'string') {
            this.txt = document.createElement('textarea');
            this.txt.innerHTML = this._domSanitizer.sanitize(SecurityContext.HTML, configura[key]);
            configura[key] = this.txt.value;
          }
        });

        this.config = configura;
        this.tokenbearer = configura.tokenbearer;
        this.datap = this.config.datap;
        return this.config;

      });
      
    return promise;
               
  }

  /**
   * Metodo que decodeURIComponent el dato
   * @param  name - Nombre parametro a decodificar de la url.*
   * @returns  results - Valor del parametro devuelto *
   */
  getParams(name: string): string {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regeName = `[\\?&]${name}=([^&#]*)`;
    const regex = new RegExp(regeName);
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  /**
   * Obtener la configuración para ambientes
   * @return {*} 
   * @memberof ConfigService
   */
  getconfig() {
    return this.appConfig;
  }
  
  /**
   *
   * Función para obtener el bearer token
   * @return {*} 
   * @memberof ConfigService
   */
  getBearerToken() {
    return localStorage.getItem('bearer');
  }
  
}
