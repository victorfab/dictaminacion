import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';

import { Tipousr } from '../../interfaces/catalogos.interface';
import { Usuarios } from '../../interfaces/usuarios.interface';

import { CatalogosService } from '../../servicios/catalogos.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styles: [
  ]
})
export class AltausuarioComponent implements OnInit {

  usuario!: Usuarios;

  tipogetusr!: Tipousr[];

  tipousuario!: Tipousr;

  limfolios!: number;

  codigosam!: string;

  correo!: string;

  nombre!: string;

  telefono!: string;

  idAbogado!: string;

  dictamenData: any = [];

  selectedDictamList: [] = [];

  dataFiltersb!: any;

  tipodeusr!: string;

  displayModalM = false;

  messageModalM!: string;

  headerModalM!: string;

  ipClient: any;

  t_usuario = new FormControl(null, [Validators.required]);
  c_sam = new FormControl(null, [Validators.required]);
  t_nombre = new FormControl(null, [Validators.required]);
  i_despacho = new FormControl(null, [Validators.required]);
  e_mail = new FormControl(null, [Validators.required]);
  t_telefono = new FormControl(null, [Validators.required]);


  constructor( public _router:  Router,
               private _usuarios: UsuariosService,
               private _catalogos: CatalogosService,
               private _bearerToken: BearerTokenService ) { 

                this.dataFiltersb = {};

               }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.getTipoUsuarios();

    this.getTipoDit();

  }


  guardarUsuario() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const altaOBj = {
      "user" : {
        "nombre" : this.dataFiltersb.name,
        "email" : this.dataFiltersb.email,
        "telefono" : this.dataFiltersb.ntelefono
      },
      "abog" : {
        "usrExterno" : this.dataFiltersb.codsam,
        "noFolios" : this.dataFiltersb.folios,
        "codigo" : this.dataFiltersb.idAbog,
        "tipoAbogado" : this.tipodeusr
      },
      "dictamenes": this.selectedDictamList,
      "regiones": [],
      "ipClient" : this.ipClient,
      "conn" : ""
    }

    this._usuarios.createUsuario( altaOBj )
        .subscribe( ( resp: any ) => {

          this.headerModalM = "ALTA DE USUARIO";
          this.messageModalM = "Usuario agregado correctamente";
          this.displayModalM = true;

        }, (errors) => {
          this.headerModalM = "ALTA DE USUARIO";
          this.messageModalM = errors[0].description;
          this.displayModalM = true;
        });

  }

  getDataFirst( event: any, field: string ) {

    switch ( field ) {
      case 'tipusuario':
        this.dataFiltersb.tipusuario = event;

        if( this.dataFiltersb.tipusuario.value.nombre === 'ABOGADO DE SEGUIMIENTO' ) {
          this.tipodeusr = 'S';
        } else if( this.dataFiltersb.tipusuario.value.nombre === 'ABOGADO EXTERNO' ) {
          this.tipodeusr = 'E';
        } else if( this.dataFiltersb.tipusuario.value.nombre === 'CALIDAD' ) {
          this.tipodeusr = 'C';
        } else if( this.dataFiltersb.tipusuario.value.nombre === 'CONFIRMING' ) {
          this.tipodeusr = 'A';
        }
        
        break;
      case 'folios':
        this.dataFiltersb.folios = event;
        break;

    }

  }


  getDataSecond( event: any, field: string ) {

    switch ( field ) {
      case 'codsam':
        this.dataFiltersb.codsam = event;
        break;
      case 'email':
        this.dataFiltersb.email = event;
        break;
      case 'name':
        this.dataFiltersb.name = event;
        break;
      case 'ntelefono':
        this.dataFiltersb.ntelefono = event;
        break;
      case 'idAbog':
        this.dataFiltersb.idAbog = event;
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

  getTipoDit() {
    this._catalogos.getTypeDict()
        .subscribe( ( resp: any ) => {
          this.dictamenData = resp;
        })
  }

  limpiarFormulario() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/altausuario']);
    });
  }

  closeModal() {

    this.displayModalM=false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/usuarios']);
    });

  }

}
