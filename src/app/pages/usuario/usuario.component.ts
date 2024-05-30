import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
// Interfaces
import { Tipousr } from '../../interfaces/catalogos.interface';
import { Usuarios } from '../../interfaces/usuarios.interface';
// Servicios
import { CatalogosService } from '../../servicios/catalogos.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})

export class UsuarioComponent implements OnInit {

  usuario!: Usuarios;

  tipogetusr!: Tipousr[];

  tipogetsuarios!: Tipousr;

  tipousuario!: any;

  dictamenData: any = [];

  ipClient: any;

  form!: FormGroup;

  selectedDictamList: [] = [];

  dataFiltersb!: any;

  tipodeusr!: string;

  displayModalFormErr = false;

  headerModalM!: string;

  messageModalM!: string;

  t_usuario = new FormControl({value:"", disabled: true}, [Validators.required]);
  c_sam = new FormControl({value:"", disabled: true}, [Validators.required]);
  t_nombre = new FormControl({value:"", disabled: true}, [Validators.required]);
  i_despacho = new FormControl({value:"", disabled: true}, [Validators.required]);
  mail = new FormControl(null, [Validators.required, Validators.email]);
  t_telefono = new FormControl(null, [Validators.required]);


  constructor( private _route: ActivatedRoute,
               public _router:  Router,
               private fb: FormBuilder,
               private _usuarios: UsuariosService,
               private _catalogos: CatalogosService,
               private _bearerToken: BearerTokenService ) {

        this.dataFiltersb = {};

  }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.getTipoDit();

    this.getUsuario();

    this.form = this.fb.group({
      name: this.fb.array([])
    });

    this.getTipoUsuarios();

  }

  getUsuario() {

      const localip = localStorage.getItem("ipC");
      this.ipClient = localip;
      const idUsuario = ''
      const tipoUsuario = '';
      const region = '';
      const idAbogado = this._route.snapshot.paramMap.get( 'id' );
      const session = '';
      
      this._usuarios.getUsuario( idUsuario, tipoUsuario, region, idAbogado, this.ipClient, session )
          .subscribe( ( resp: any ) => {
            
            this.usuario = resp[0];
            this.usuario.idusr = idAbogado;
            this.selectedDictamList = resp[0].dictamenes;
            this.tipousuario = this.usuario.tipoUsuario;
            this.mail.setValue(this.usuario.correo);
            this.lawyerType(this.usuario.tipoUsuario);

      }, (error) => {
          return error;
      });

  }

  guardarUsuario() {

    const updObj = {
                      "idAbogado" : this.usuario.idAbogado,
                      "telefono" : this.usuario.telefono,
                      "email" : this.usuario.correo,
                      "noFolios" : this.usuario.folios === null ? '' : this.usuario.folios,
                      "tipoAbogado" : this.tipodeusr,
                      "dictamenes": this.selectedDictamList,
                      "regiones": []
                    }              

      this._usuarios.updUsuario( updObj )
          .subscribe( (resp: any) => {
            this.headerModalM = "Actualización de usuario";
            this.messageModalM = 'Se han actualizado correctamente los datos.';
            this.displayModalFormErr = true;
            this.getUsuario();

      }, (error: any) => {
        this.headerModalM = "Actualización de usuario";
        this.messageModalM =  error.error ? error.error.errors[0].message: 'Error al actualizar los datos.';
        this.displayModalFormErr = true;
      });

  }

  private lawyerType(value: string | undefined): void {
    if( value === 'ABOGADO DE SEGUIMIENTO' ) {
      this.tipodeusr = 'S';
    } else if( value === 'ABOGADO EXTERNO' ) {
      this.tipodeusr = 'E';
    } else if( value === 'CALIDAD' ) {
      this.tipodeusr = 'C';
    } else if(  value === 'CONFIRMING' ) {
      this.tipodeusr = 'A';
    }
  }

  getData( event: any, field: string ) {
    
    switch ( field ) {
      case 'tipusuarios':

        if( event.value === 'ABOGADO DE SEGUIMIENTO' ) {
          this.tipodeusr = 'S';
        } else if( event.value === 'ABOGADO EXTERNO' ) {
          this.tipodeusr = 'E';
        } else if( event.value === 'CALIDAD' ) {
          this.tipodeusr = 'C';
        } else if( event.value === 'CONFIRMING' ) {
          this.tipodeusr = 'A';
        }
        
        
        break;
    }

  }

  getTipoUsuarios() {
    this._catalogos.getTypeUsr()
        .subscribe( ( resp:any ) => {
          
          this.tipogetusr = resp;

          return resp;

        })
  }

  closeModalForm() {
    this.displayModalFormErr = false;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/usuarios']);
    });
  }

  getTipoDit() {
    this._catalogos.getTypeDict()
        .subscribe( ( resp: any ) => {
          this.dictamenData = resp;
        })
  }

  limpiarFormulario() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/usuario']);
    });
  }




}
