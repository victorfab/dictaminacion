import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { BearerTokenService } from './servicios/bearer-token.service';
(window as any).pdfWorkerSrc = '../assets/js/pdf.worker.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {


  title = 'new-dictaminacionweb';

  private cookie_session = '';
  private ivuser = '';

  constructor( private _cookieService: CookieService  ) {}

  ngOnInit() {
    
    this.cookie_session = this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION');
    this.ivuser = this._cookieService.get('iv_user');


  }


}
