import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProfileService } from '../../servicios/profile.service';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  nombre: any;
  userID: any;
  dateTime: Date = new Date;
  pipeDate = new DatePipe('en-US');
  fechaactual: any;
  nameZone: any;
  perfil: any;
  typeRol!: boolean;
  user!: any;
  rol!: any;
  ipClient: any;

  constructor( private _profileService: ProfileService,
               private _bearerTokenService: BearerTokenService,
               private _router: Router ) { }

   obtenerPerfil() {

    this._bearerTokenService.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    this._profileService.getProfile( this.user, this.rol, this.ipClient )
        .subscribe( ( resp:any ) => {
          this.perfil = resp.rolUser;

          localStorage.setItem('usuario', this.user);
          localStorage.setItem('roluser', this.rol);

          if( this.perfil === 'Abogado externo') {

            this.userID = resp.userId;
            this.nombre = resp.name;
            this.typeRol = resp.userPosition.typeRol;
            this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');

            sessionStorage.setItem('dicta_token', '141414142343334343');
            sessionStorage.setItem('currentSession', '1234567890');

            localStorage.setItem('uId', this.userID);
            localStorage.setItem('fechaH', this.fechaactual);
            localStorage.setItem('rol', String(this.perfil));

            this.obtenerMenu( localStorage.getItem('uId'), localStorage.getItem('rol'), this.typeRol);

            this._router.navigate(['/solicitudes']);

          } else {

            this.userID = resp.userId;
            this.nombre = resp.name;
            this.nameZone = resp.zone.nameZone;
            this.typeRol = resp.userPosition.typeRol;
            this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
            
            sessionStorage.setItem('dicta_token', '141414142343334343');
            sessionStorage.setItem('currentSession', '1234567890');
            localStorage.setItem('uId', this.userID);
            localStorage.setItem('fechaH', this.fechaactual);
            localStorage.setItem('nombreZona', this.nameZone);
            localStorage.setItem('rol', String(this.perfil));

            this.obtenerMenu( localStorage.getItem('uId'), localStorage.getItem('rol'), this.typeRol);

            this._router.navigate(['/solicitudes']);

          }

        });

  }

  obtenerMenu( uId: any, rol: any, typeRol: any ) {
    this._profileService.setMenuBar( uId, rol, typeRol )
        .subscribe( ( resp:any ) => {
            return resp;
        
    });

  }


}
