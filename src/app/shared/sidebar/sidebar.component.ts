import { DatePipe } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RolUser } from 'src/app/enums/rolUser.enum';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
// Servicios
import { MisSolicitudesService } from 'src/app/servicios/missolicitudes.service';
import { ProfileService } from 'src/app/servicios/profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  @Output() rolUser = new EventEmitter<string>();

  rolUsuario: any;
  
  displayModalL!: boolean;

  data: any = {};

  userID: any;

  currentRol: any;

  nombre: any;

  pipeDate = new DatePipe('en-US');

  fechaactual: any;

  nameZone: any;

  typeRol!: boolean;

  modalBuzonActive: boolean = false;

  ipClient: any;

   /**
   * Creates an instance of HeaderComponent.
   * @param {ProfileService} _profileService
   * @param {Router} router
   * @memberof HeaderComponent
   */
  constructor( public _profileService: ProfileService,
               private _misSolicitudesService: MisSolicitudesService,
               private _bearerToken: BearerTokenService,
               private _cookieService: CookieService ) {

    this.displayModalL = false;
  
  }

  ngOnInit(): void {

    //this.getUserData();
    this.obtenerPerfil();

  }

  /**
   *
   * Obtener data de usuario
   * @memberof SidebarComponent
   */
  getUserData() {

    this.rolUsuario = localStorage.getItem('rol');
    this.userID = localStorage.getItem('uId');

  }

  /**
   * Metodo que muestra modal para confirmar si quiere cerrar sesión
   * @memberof HeaderComponent
   */
  confirmLogout() {
    this.displayModalL = true;
  }

  /**
   *
   * Metodo para cambiar de perfil entre abogado externo y abogado de seguimiento
   * @memberof SidebarComponent
   */
  cambiarPerfil() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

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
        .subscribe( ( resp:any) => {

          switch (resp.currentRol) {
            case RolUser.ADMIN:
              localStorage.removeItem('changeRolUserAdmin');
              localStorage.setItem('rol', resp.currentRol);

              this.obtenerPerfil();
              break;
            case RolUser.ABOGADO_SEGUIMIENTO:
              localStorage.setItem('changeRolUserAdmin', RolUser.ABOGADO_SEGUIMIENTO);
              localStorage.setItem('rol', resp.currentRol);
              let rolmenu = 'Administrador';
              //this.obtenerPerfilSwitch();

              this.obtenerMenu( localStorage.getItem('uId'), rolmenu, this.typeRol);

              this._misSolicitudesService.setChangeProfileAdmin(true);
              break;
          }

          this.currentRol = resp.currentRol;
          this.rolUser.emit(resp.currentRol);

        })

  }

  obtenerPerfilSwitch() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

        this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

        let user = localStorage.getItem('uId');
        let roluser = '5';
        let rolmenu = localStorage.getItem('rol');

        this._profileService.getProfile( user, roluser, this.ipClient )
            .subscribe( ( resp:any ) => {

              this.userID = resp.userId;
              this.nombre = resp.name;
              this.nameZone = resp.zone.nameZone;
              this.typeRol = resp.userPosition.typeRol;
              this.rolUsuario = resp.rolUser;
              this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
              sessionStorage.setItem('dicta_token', '141414142343334343');
              sessionStorage.setItem('currentSession', '1234567890');
              localStorage.setItem('uId', this.userID);
              localStorage.setItem('fechaH', this.fechaactual);
              localStorage.setItem('nombreZona', this.nameZone);
              localStorage.setItem('rol', this.currentRol);

              this.obtenerMenu( localStorage.getItem('uId'), rolmenu, this.typeRol);

              this._misSolicitudesService.setChangeProfileAdmin(true);

            });
  }

  /**
   *
   * Metodo para obtener perfil
   * @memberof SidebarComponent
   */
  obtenerPerfil() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {

        let user = localStorage.getItem('usuario');
        let roluser = localStorage.getItem('roluser');

        this._profileService.getProfile( user, roluser, this.ipClient )
            .subscribe( ( resp:any ) => {

              this.userID = resp.userId;
              this.nombre = resp.name;
              this.nameZone = resp.zone.nameZone;
              this.typeRol = resp.userPosition.typeRol;
              this.rolUsuario = resp.rolUser;
              this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');

              localStorage.setItem('nameReg', resp.region.nameRegion);
              localStorage.setItem('nameCC', resp.costCenter.nameCostCenter);
              localStorage.setItem('cveCC', resp.costCenter.cveCostCenter);
              localStorage.setItem('idZone', resp.zone.idZone);

              sessionStorage.setItem('dicta_token', '141414142343334343');
              sessionStorage.setItem('currentSession', '1234567890');
              localStorage.setItem('uId', this.userID);
              localStorage.setItem('fechaH', this.fechaactual);
              localStorage.setItem('nombreZona', this.nameZone);
              localStorage.setItem('rol', this.rolUsuario);

              this.validateRolUser();
              this.obtenerMenu( localStorage.getItem('uId'), localStorage.getItem('rol'), this.typeRol);

              this._misSolicitudesService.setChangeProfileAdmin(true);

            });

    } else {

      this._profileService.getProfileCookie( this.ipClient )
          .subscribe( ( resp:any ) => {

            this.userID = resp.userId;
            this.nombre = resp.name;
            this.nameZone = resp.zone.nameZone;
            this.typeRol = resp.userPosition.typeRol;
            this.rolUsuario = resp.rolUser;
            this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
            this.currentRol = this.rolUsuario;

            sessionStorage.setItem('dicta_token', '141414142343334343');
            sessionStorage.setItem('currentSession', '1234567890');
            /* localStorage.setItem('uId', this.userID); */
            localStorage.setItem('fechaH', this.fechaactual);
            localStorage.setItem('nombreZona', this.nameZone);
            /* localStorage.setItem('rol', this.currentRol); */
            this.validateRolUser();
            this.obtenerMenu( localStorage.getItem('uId'), localStorage.getItem('rol'), this.typeRol);

            this._misSolicitudesService.setChangeProfileAdmin(true);

          });

    }

  }

  /**
   *
   * Metodo para obtener menu
   * @param {*} uId
   * @param {*} rol
   * @memberof SidebarComponent
   */
  obtenerMenu( uId: any, rol: any, typeRol: any ) {

    let rolUser = localStorage.getItem('changeRolUserAdmin');

    if(!rolUser) {

      this._profileService.setMenuBar( uId, rol, typeRol )
          .subscribe( ( resp:any ) => { 
            return resp;
      });

    } else {

      this._profileService.setMenuBar( uId, rolUser, typeRol )
          .subscribe( ( resp:any ) => { 
            return resp;
      });

    }

  }

  validateRolUser() {

    let rolUser = localStorage.getItem('changeRolUserAdmin');
    localStorage.setItem('rol', this.rolUsuario);
     if( rolUser === 'Abogado de seguimiento' ) {
      this.cambiarPerfil();
    }

  }

  /**
   * Cierra modal de confirmación
   * @memberof HeaderComponent
   */
  closeModalL() {
    this.displayModalL = false;
  }

  /**
   * Metodo que realiza logout de la aplicación
   * @memberof HeaderComponent
   */
  logout() {
      return true;
  }

  /**
   *
   * Metodo para abrir modal de buzon
   * @memberof SidebarComponent
   */
  openBuzonModal(): void {
    this.modalBuzonActive = true;
  }

  /**
   *
   * Metodo para cerrar modal de buzon
   * @memberof SidebarComponent
   */
  closeBuzonModal(): void {
    this.modalBuzonActive = false;
  }

}
