import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//Servicios
import { CookieService } from 'ngx-cookie-service';
import { BearerTokenService } from '../servicios/bearer-token.service';
import { ConfigService } from '../servicios/config.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  private cookie_session = '';
  private ivuser = '';
  private ivremoteaddress;
  private ivcreds;

  constructor( public _conf: ConfigService,
               public _bearerToken: BearerTokenService,
               private _cookieService: CookieService ) {

                  this.cookie_session = this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION');
                  this.ivuser = this._cookieService.get('iv_user');
                  this.ivremoteaddress = this._cookieService.get('iv_remote_address');
                  this.ivcreds = this._cookieService.get('iv_creds');

  }


  updateHeader(req: HttpRequest<any>, next: HttpHandler) {

      const dataauth = `${'Basic' + ' ' + this._conf.datap}`;

      req = req.clone({
            headers: req.headers.set("Authorization", `Basic ${dataauth}`)
                                .set("cookie-aplicativa", this.cookie_session)
                                .set("iv-user", this.ivuser)
                                .set("iv-remote-address", this.ivremoteaddress)
                                .set("iv-creds", this.ivcreds)
      });

      this._bearerToken.setBearerToken();

      return next.handle(req);
  
  }

  
  intercept(req: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {

    const urlgateway = this._conf.tokenbearer;
    const dataauth = `${'Basic' + ' ' + this._conf.datap}`;

    if (req.url === urlgateway) {
      req = req.clone({
        setHeaders: {
          'Authorization': dataauth,
          'cookie-aplicativa': this.cookie_session,
          'iv-user': this.ivuser,
          'iv-remote-address': this.ivremoteaddress,
          'iv-creds': this.ivcreds
        },
        
      });


      return next.handle(req);

    } else {
      req = req.clone({
        setHeaders: {
          'Authorization':  `${'Bearer' + ' ' + this._conf.getBearerToken()}`,
          'cookie-aplicativa': this.cookie_session,
          'iv-user': this.ivuser,
          'iv-remote-address': this.ivremoteaddress,
          'iv-creds': this.ivcreds
        },
      });
      return next.handle(req).pipe(catchError(err => {
        if ([401, 403].includes(err.status)) {
            
            this.updateHeader( req, next );
        
        }

        const error = err;

          return throwError(error);

      }))
      
    }

  }

}