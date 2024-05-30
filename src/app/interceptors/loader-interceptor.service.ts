import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

// Servicios
import { LoaderService } from '../servicios/loader.service';

/**
 * Clase para carga de llamadas HTTP y spinner
 * @export
 * @class LoaderInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()

export class LoaderInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor( private loaderService: LoaderService ) { }

  /**
   * @param {HttpRequest<any>} req
   * @memberof LoaderInterceptor
   */
  removeRequest(req: HttpRequest<any>) {

    const i = this.requests.indexOf(req);
      if (i >= 0) {
        this.requests.splice(i, 1);
      }
    this.loaderService.isLoading.next(this.requests.length > 0);

  }

  /**
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @return {*}  {Observable<HttpEvent<any>>}
   * @memberof LoaderInterceptor
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);

    this.loaderService.isLoading.next(true);

    return new Observable((observer: Observer<any>) => {

      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });

      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
        
      };

    });
  }
}
