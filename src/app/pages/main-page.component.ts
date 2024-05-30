import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RolUser } from '../enums/rolUser.enum';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, pairwise } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';

// Servicios
import { ProfileService } from '../servicios/profile.service';
import { BearerTokenService } from '../servicios/bearer-token.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentPageService } from '../servicios/current-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [
  ]
})

export class MainPageComponent implements OnInit, OnDestroy {

  rolUserUpdated : string = "";
  nombre: any;
  userID: any;
  dateTime: Date = new Date;
  pipeDate = new DatePipe('en-US');
  fechaactual: any;
  nameZone: any;
  typeRol!: boolean;
  perfil: any;
  ipClient: any;
  ipUser: any;

  private subscriptions: Array<Subscription> = [];

  constructor(  private _router: Router,
                private _profileService: ProfileService,
                private _bearerTokenService: BearerTokenService,
                private _cookieService: CookieService,
                private _currentPageService: CurrentPageService ) {}


  ngOnInit(): void {

    this._bearerTokenService.setBearerToken().subscribe( ( resp ) => { return resp } );

    if( this._profileService.profile === undefined ){
      
      this.obtenerPerfil();

    }
    this.getCurrentPage();
  }

  private getCurrentPage(): void {
    this.subscriptions.push(this._router.events
        .pipe(filter((event:any) => event instanceof RoutesRecognized), pairwise())
        .subscribe((events: RoutesRecognized[]) => {
          this._currentPageService.setCurrentUrl(events[1].urlAfterRedirects);
          this._currentPageService.setPreviousUrl(events[0].urlAfterRedirects);
        })
    );
  }

  obtenerPerfil() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {

      let user = localStorage.getItem('usuario');
      let roluser = localStorage.getItem('roluser');

      this._profileService.getProfile(user, roluser, this.ipClient)
          .subscribe( ( resp:any ) => {
            this.userID = resp.userId;
            this.nombre = resp.name;
            this.nameZone = resp?.zone?.nameZone;
            this.typeRol = resp.userPosition.typeRol;
            this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
            this.perfil = resp.rolUser;
            this.ipUser = resp.userIp;

            if (localStorage.getItem('changeRolUserAdmin')) {
              localStorage.setItem('rol', RolUser.ABOGADO_SEGUIMIENTO);
            } else {
              localStorage.setItem('rol', this.perfil);
            }

            localStorage.setItem('ipC', this.ipUser);
            sessionStorage.setItem('dicta_token', '141414142343334343');
            sessionStorage.setItem('currentSession', '1234567890');
            localStorage.setItem('uId', this.userID);
            localStorage.setItem('fechaH', this.fechaactual);
            localStorage.setItem('nombreZona', this.nameZone);

            this.obtenerMenu( localStorage.getItem('uId'), localStorage.getItem('rol'), this.typeRol);

          });

    } else {

      this._profileService.getProfileCookie( this.ipClient )
          .subscribe( ( resp:any ) => {

            this.userID = resp.userId;
            this.nombre = resp.name;
            this.nameZone = resp?.zone?.nameZone;
            this.typeRol = resp.userPosition.typeRol;
            this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
            this.perfil = resp.rolUser;
            this.ipUser = resp.userIp;

            if (localStorage.getItem('changeRolUserAdmin')) {
              localStorage.setItem('rol', RolUser.ABOGADO_SEGUIMIENTO);
            } else {
              localStorage.setItem('rol', this.perfil);
            }

            localStorage.setItem('ipC', this.ipUser);
            sessionStorage.setItem('dicta_token', '141414142343334343');
            sessionStorage.setItem('currentSession', '1234567890');
            localStorage.setItem('uId', this.userID);
            localStorage.setItem('fechaH', this.fechaactual);
            localStorage.setItem('nombreZona', this.nameZone);

            this.obtenerMenu( localStorage.getItem('uId'), localStorage.getItem('rol'), this.typeRol);

          });
      
    }

  }

  public updateData(rolUser:string) : void {
    this.rolUserUpdated = rolUser;
  }

  obtenerMenu( uId: any, rol: any, typeRol: any ) {

    this._profileService.setMenuBar( uId, rol, typeRol )
        .subscribe( ( resp:any ) => {
            return resp;
        
    });

  }

  ngOnDestroy(): void {
    localStorage.removeItem('changeRolUserAdmin');
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
