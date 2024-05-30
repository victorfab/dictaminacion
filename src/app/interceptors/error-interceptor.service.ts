import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BearerTokenService } from '../servicios/bearer-token.service';
import { ConfigService } from '../servicios/config.service';
import { ModalErrorService } from '../servicios/modal-error.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor {

  public http401 : boolean = false;
  public counter : number = 0;

  constructor( public modalErrorService : ModalErrorService,
               public _conf: ConfigService,
               public _bearerToken: BearerTokenService,
               public _router:  Router, ) {}

  updateHeader(req: HttpRequest<any>, next: HttpHandler) {
    
    const dataauth = `${'Basic' + ' ' + this._conf.datap}`;

    req = req.clone({
          headers: req.headers.set("Authorization", `Basic ${dataauth}`)
    });

    this._bearerToken.setBearerToken();

    return;

}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

      return next.handle(req).pipe( tap(() => { return },
          ( error ) => {
              if ([401, 403].includes(error.status)) {
                
                  this.updateHeader( req, next );
              
              }
              if ( error instanceof HttpErrorResponse ) {
                  if ( error.status === 500 || error.status === 404 ) {
                      /* this.counter ++;
                      if( this.counter === 4 ) {
                          this.http401 = true;
                          this.modalErrorService.http401.next(true);
                          this.counter = 0;
                      } 
 */                   
                      return;
                  }
                  
              }

              return;
          }
      ));
  }
  
}
