import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RolUser } from '../../enums/rolUser.enum';
// Servicios
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from 'src/app/servicios/profile.service';

@Component({
  selector: 'app-header-secundario',
  templateUrl: './header-secundario.component.html',
  styles: [
  ]
})
export class HeaderSecundarioComponent implements OnInit {

  rolUsuario: any;
  currentRol: any;
  data: any = {};
  nombre: any;
  userID: any;
  dateTime: Date = new Date;
  pipeDate = new DatePipe('en-US');
  fechaactual: any;
  nameZone: any;
  typeRol!: boolean;
  perfil: any;
  ipClient!: any;

  constructor( public _profileService: ProfileService,
               private _cookieService: CookieService ) {}

  ngOnInit(): void {

    this.getUserData();

  }

  /**
   * 
   * Metodo para obtener datos de usuario
   * @memberof HeaderSecundarioComponent
   */
  getUserData() {

    this.rolUsuario = localStorage.getItem('rol');
    this.userID = localStorage.getItem('uId');

  }

  /**
   *
   * Metodo para cambiar de perfil
   * @memberof HeaderSecundarioComponent
   */
  cambiarPerfil() {

    if ( localStorage.getItem('rol') === 'Administrador' ) {

      this.data = {
        "userId": this.userID,
        "currentRol": "Administrador",
        "changeToRol": "Abogado de seguimiento",
        "ipClient": this.ipClient,
        "conn": ""
      }

    } else {

      this.data = {
        "userId": this.userID,
        "currentRol": "Abogado de seguimiento",
        "changeToRol": "Administrador",
        "ipClient": this.ipClient,
        "conn": ""
      }

    }

    this._profileService.changeProfile( this.data )
        .pipe()
        .subscribe( ( resp ) => {

            this.currentRol = resp.currentRol;
            localStorage.setItem('rol', this.currentRol);
            this.obtenerPerfil();

        })

  }

  /**
   *
   * Metodo para obtener perfil
   * @memberof HeaderSecundarioComponent
   */
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

            if (localStorage.getItem('changeRolUserAdmin')) {
              localStorage.setItem('rol', RolUser.ABOGADO_SEGUIMIENTO);
            } else {
              localStorage.setItem('rol', this.perfil);
            }

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
            this.rolUsuario = resp.rolUser;
            this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
            this.perfil = resp.rolUser;

            if (localStorage.getItem('changeRolUserAdmin')) {
              localStorage.setItem('rol', RolUser.ABOGADO_SEGUIMIENTO);
            } else {
              localStorage.setItem('rol', this.perfil);
            }

            sessionStorage.setItem('dicta_token', '141414142343334343');
            sessionStorage.setItem('currentSession', '1234567890');
            localStorage.setItem('uId', this.userID);
            localStorage.setItem('fechaH', this.fechaactual);
            localStorage.setItem('nombreZona', this.nameZone);

            this.obtenerMenu( localStorage.getItem('uId'), localStorage.getItem('rol'), this.typeRol);

          });
      
    }

  }

  /**
   *
   * Metodo para obtener menu
   * @param {*} uId
   * @param {*} rol
   * @memberof HeaderSecundarioComponent
   */
  obtenerMenu( uId: any, rol: any, typeRol: any ) {

    this._profileService.setMenuBar( uId, rol, typeRol )
        .subscribe( ( resp:any ) => {
            return resp;
    });

  }


}
