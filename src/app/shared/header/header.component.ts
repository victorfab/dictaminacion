import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RolUser } from '../../enums/rolUser.enum';
// Servicios
import { ProfileService } from 'src/app/servicios/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() rolUser!: string;
  nombre: any;
  userID: any;
  dateTime: any;
  nameZone: any;
  rolUsuario: any;
  sucursal!: string;
  rolId!: any;
  ipClient: any;

  constructor( public _router: Router,
               public _profile: ProfileService,
               private _cookieService: CookieService ) { }

  ngOnInit(): void {

    this.getProfileData();

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rolUsuario = this.rolUser;
  }

  /**
   *
   * Metodo para obtener data de perfil
   * @memberof HeaderComponent
   */
  getProfileData() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {

      this.userID = localStorage.getItem('uId');
      this.dateTime = localStorage.getItem('fechaH');
      this.nameZone = localStorage.getItem('nombreZona');
      this.rolUsuario = localStorage.getItem('rol');
      this.rolId = localStorage.getItem('roluser');

      
      this._profile.getProfile( this.userID, this.rolId, this.ipClient )
          .subscribe( (resp:any) => {

            this.sucursal = resp.costCenter.nameCostCenter;
            this.nombre = resp.name;
            

          });

    } else {
  
      this._profile.getProfileCookie( this.ipClient )
          .subscribe( ( resp:any ) => {

            this.userID = resp.userId;
            this.dateTime = localStorage.getItem('fechaH');
            this.nameZone = resp.zone.nameZone;
            /* this.rolUsuario = resp.rolUser; */
            this.rolUsuario = localStorage.getItem('rol');
            this.rolId = resp.rolUser;

            this.sucursal = resp.costCenter.nameCostCenter;
            this.nombre = resp.name;
            
          });

    }

  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this._cookieService.deleteAll();

    let myWindow = window.open('/', "_self");
    myWindow!.close();
  }

}
