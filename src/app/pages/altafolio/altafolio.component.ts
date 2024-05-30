import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
// Interfaces
import { Interviniente } from '../../interfaces/interviniente.interface';
import { Documentos } from '../../interfaces/documentos.interface';
import { Reingreso, Cattipodict, Tipodoc, Tipoempresa } from '../../interfaces/catalogos.interface';
import { Solicitudes } from '../../interfaces/solicitudes.interface';
// Servicios
import { ProfileService } from '../../servicios/profile.service';
import { AltaFolioService } from '../../servicios/alta-folio.service';
import { CatalogosService } from '../../servicios/catalogos.service';
import { IntervinienteService } from '../../servicios/intervinientes.service';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { DictamenesService } from 'src/app/servicios/dictamenes.service';
import { Table } from 'primeng/table';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-altafolio',
  templateUrl: './altafolio.component.html',
  styles: [
  ]
})
export class AltafolioComponent implements OnInit {

  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

  @ViewChildren("checkpol") checkpol!: any;

  @ViewChild("fileInput", {static: false}) fileUpload!: ElementRef;

  @ViewChild('dt4') updateList!: Table;

  nombre = '';

  apellidoP = '';

  uid = '';

  dateTime: Date = new Date;

  pipeDate = new DatePipe('en-US');

  fechaactual: any;

  bucusuario!: string;

  datorfc!: string;

  nacionalidad!: string;

  region = '';

  sucursal = '';

  cc: number = 0;

  codePosition!: string;

  zona = '';

  tipofolio!: any;

  folioorigen!: string;

  foliopadre!: string;

  origen!: any;

  politicas = false;

  displayModalBuc = false;

  intervinienteDialog!: boolean;

  dropintvalue: any[] = [];

  selectedPolitics: any[] = [];

  intervinientesvalue: any[] = new Array;

  intervinientes!: any[];

  interviniente: any;

  intervfacultades!: any;

  selectedIntervinientes!: any;

  submitted: boolean = false;

  tipfolios!: Solicitudes[];

  tiporigen!: Solicitudes[];

  tipodictamen!: Cattipodict[];

  tipodictamenes!: Cattipodict;

  idempresa!: string;

  subDictActivate: boolean = false;

  tipoempresa!: Tipoempresa[];

  tipoempresas!: Tipoempresa | undefined;

  reingresosData!: Reingreso[];
  
  subreingresosData!: Reingreso[];

  tipodocumento!: Tipodoc[];

  descdoc!: any;

  iddoc!: string | undefined;

  idtipodict!: any;

  idtipoemp!: any;

  selectedarrayFiles!: any;

  tipodoc!: any;

  checkdoc!: any[];

  comreingreso!: any;

  folioreingreso!: any;

  razonsocial!: string;

  centrocostoscli!: string;

  buc!: string;

  banbusqueda!: boolean;

  reingresos!: any;

  subreingresos!: any;

  dataFiltersb!: any;

  displayModal!:  boolean;

  displayModalM = false;

  displayModalInit = false;

  displayModalFormErr = false;

  displayModalP = false;

  displayModalF = false;

  displayModalAd = false;

  messageModalM!: string;

  messageModalR!: string

  headerModalM!: string;

  detIntervOtros!: boolean;

  title: string = 'ng2-pdf-viewer';

  selectPdf!: any;
  
  pdfSrc!: any;

  arrayFiles: Array<any> = [];

  resultArrayFiles: any[] = new Array;

  idFilenet!: string;

  upldfiles: any;

  totaldocs: any;

  rs: any;

  rst: any;

  filePDF!: File;

  filename!: string;

  filesize!: number;

  uploadsuccess: boolean = false;

  pdffile!: any;

  filenetBase64!: any;

  page = 1;

  totalPages = 0;

  countDocs = 0;
  
  isLoaded = false;

  tipopersona!: string;

  bloqueoff: Boolean = true;

  validatecountdocs!: any;

  ipClient: any;


  constructor( private _router: Router,
               public _profile: ProfileService,
               private _interviniente: IntervinienteService,
               private message: MessageService,
               public _altaFolio: AltaFolioService,
               public _dictamenes: DictamenesService,
               private _confirmation: ConfirmationService,
               private _catalogos: CatalogosService,
               private _bearerToken: BearerTokenService,
               private _cookieService: CookieService,
               private _sanitizer: DomSanitizer ) {

                this.dataFiltersb = {};

               }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    this._interviniente.getIntervinientes().then(data => this.intervinientes = data);

    this.obtenerPerfil();

    this.getReingresos();

    this.getSubReingresos();

    this.tipofolio = [
      {
        "id": 0,
        "nombre": "NUEVO",
      },
      {
        "id": 1,
        "nombre": "COMPLEMENTO"
      }
    ]

    this.origen = [
      {
        "id": 1,
        "nombre": "BANCO",
      },
      {
        "id": 2,
        "nombre": "CASA DE BOLSA"
      }
    ]
    
    localStorage.removeItem('cnt');

    this.interviniente = {};
    this.submitted = false;
    this.upldfiles = 0;
    this.totaldocs = 1;

    this.displayModalInit = true;

  }

  /**
   * Metodo para obtener perfil del usuario
   *
   * @return {*} 
   * @memberof AltafolioComponent
   */
  obtenerPerfil() {

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {
    
        let user = localStorage.getItem('usuario');
        let roluser = localStorage.getItem('roluser');
        const localip = localStorage.getItem("ipC");
        this.ipClient = localip;

        return this._profile.getProfile(user, roluser, this.ipClient)
                  .subscribe( ( resp: any ) => {

                      this.nombre = resp.name;
                      this.apellidoP = resp.lastNameDad;
                      this.uid = resp.userId;
                      this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
                      this.region = resp.region.nameRegion;
                      this.sucursal = resp.costCenter.nameCostCenter;
                      this.cc = resp.costCenter.cveCostCenter;
                      this.zona = resp.zone.nameZone;
                      this.codePosition = resp.userPosition.codePosition;
                      
                      this.codePosition === 'SCON01' ? this.dataFiltersb.buc = '00000000' : this.dataFiltersb.buc = '';

                  });

    } else {

      return this._profile.getProfileCookie( this.ipClient )
                    .subscribe( ( resp: any ) => {

                      this.nombre = resp.name;
                      this.apellidoP = resp.lastNameDad;
                      this.uid = resp.userId;
                      this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
                      this.region = resp.region.nameRegion;
                      this.sucursal = resp.costCenter.nameCostCenter;
                      this.cc = resp.costCenter.cveCostCenter;
                      this.zona = resp.zone.nameZone;
                      this.codePosition = resp.userPosition.codePosition;
                      
                      this.codePosition === 'SCON01' ? this.dataFiltersb.buc = '00000000' : this.dataFiltersb.buc = '';
                      
                    });

    }

  }

  /**
   * Metodo para obtener los eventos de los inputs
   *
   * @param {*} event
   * @param {string} field
   * @memberof AltafolioComponent
   */
  getFirstData( event: any, field: string ) {

    switch ( field ) {
      case 'tipfolios':
        this.dataFiltersb.tipfolios = event.value.id;
        break;
      case 'tiporigen':
        this.dataFiltersb.tiporigen = event.value.id;
        break;
      case 'buc':
        this.dataFiltersb.buc = event;
        break;
      case 'rfc':
        this.dataFiltersb.rfc = event;
        this.datorfc = this.dataFiltersb.rfc;

        if(this.datorfc === '') {
          this.uploadsuccess = false;
        } 
        break;
      case 'tipodictamen':
        this.dataFiltersb.tipoempresas = '';
        this.arrayFiles = [];
        this.tipoempresas = { clave: ''};
        this.uploadsuccess = false;
        this.tipodoc = {descripcion: '', idDocumento: null};
        this.iddoc = undefined;
        this.dataFiltersb.tipodocumento = '';
        this.dataFiltersb.tipodictamenes = event.value.valor;
        this.getTipoEmp();
        this.getTipoDoc();
        break; 
      case 'tipoempresa':
        this.arrayFiles = [];
        this.dataFiltersb.tipoempresas = event.value.clave;
        this.getTipoDoc();
        break;  
      case 'folioo':
        this.dataFiltersb.folioorigen = event;
        break;
      case 'tiporeing':
        this.dataFiltersb.tiporeing = event.value.id;
        break;
      default:
        break;
    }

  }

  /**
   * Metodo para obtener los eventos de los inputs
   *
   * @param {*} event
   * @param {string} field
   * @memberof AltafolioComponent
   */
  getSecondData( event: any, field: string ) {
    
    switch ( field ) {
      case 'subtiporeing':
        this.dataFiltersb.subtiporeing = event.value.valor;
        break;
      case 'optionsRadios2':
        this.asignrbcred( event.srcElement.checked );
        break;
      case 'optionsRadios3':
        this.asignrbape( event.srcElement.checked );
        break;
      case 'optionsRadios1': 
        this.asignrdesig( event.srcElement.checked );
        break;
      case 'optionsRadios5':
        this.asignarbanc( event.srcElement.checked );
        break;
      case 'optionsRadios4':
        this.interviniente.otras = event.srcElement.defaultValue;
        this.detIntervOtros = event.srcElement.checked;
        break;
      case 'tipodocumento':
        this.dataFiltersb.tipodocumento = event.value.descripcion;
        this.descdoc = this.dataFiltersb.tipodocumento;
        this.iddoc = event.value.idDocumento;
        this.validarCargaArchivo( event );
        break;
      default:
        break;
      }

  }

  /**
   * Asignación de id de intervinientes
   *
   * @param {*} event
   * @memberof AltafolioComponent
   */
  asignrbcred( event: any ) {

    if( event === true ) {
      this.interviniente.credito = "1";
    }

  }

  /**
   *  Asignación de id de intervinientes
   *
   * @param {*} event
   * @memberof AltafolioComponent
   */
  asignrbape( event: any ) {

    if( event === true ) {
      this.interviniente.apertura = "4";
    }

  }

  /**
   *  Asignación de id de intervinientes
   *
   * @param {*} event
   * @memberof AltafolioComponent
   */
  asignrdesig( event: any ) {

    if( event === true ) {
      this.interviniente.designacion = "2";
    }
    
  }

  /**
   *  Asignación de id de intervinientes
   *
   * @param {*} event
   * @memberof AltafolioComponent
   */
  asignarbanc( event: any ) {

    if( event === true ) {
      this.interviniente.contratarbanca = "3";
    }

  }

  /**
   * Metodo para eliminar intervinientes
   *
   * @param {Interviniente} interviniente
   * @param {*} rowIndex
   * @memberof AltafolioComponent
   */
  eliminarInterviniente(interviniente: Interviniente, rowIndex: any) {

    this._confirmation.confirm({

        message: `Estas seguro de que quieres borrar ${interviniente.nombre} ?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        
        accept: () => {
            
            this.intervinientes = this.intervinientes.filter(val => val.id !== interviniente.id);
            this.interviniente = {};

            this.intervinientesvalue.forEach((element,index) => {
              this.intervinientesvalue = this.intervinientesvalue.filter(val => val.id !== interviniente.id);

            });
        
          }
    });
  }

  /**
   * MEtodo para guardar intervinietnes
   *
   * @memberof AltafolioComponent
   */
  guardarInterviniente() {
    this.submitted = true;

    if (this.interviniente.nombre.trim()) {

        this.dropintvalue.push(this.interviniente.credito);
        this.dropintvalue.push(this.interviniente.apertura);
        this.dropintvalue.push(this.interviniente.designacion);
        this.dropintvalue.push(this.interviniente.contratarbanca);
        this.dropintvalue.push(this.interviniente.otras);

        const dropint = this.dropintvalue.filter( item => item );

        this.successIntervinienteMsg();

        this.intervinientes = [...this.intervinientes];

        this.resetIntervinienteVal();

        this.intervinientesvalue.push({ 
                                          "id": this.interviniente.id, 
                                          "nombre": this.interviniente.nombre, 
                                          "buc": this.interviniente.buc, 
                                          "tiposInterviniente": dropint, 
                                          "otros": this.interviniente.otrasText, 
                                          "rfc": this.interviniente.rfc 
                                      });

        this.interviniente = {};
        this.dropintvalue = [];
        
        this.interviniente.credito = "";
        this.interviniente.apertura = "";
        this.interviniente.designacion = "";
        this.interviniente.contratarbanca = "";
        this.interviniente.otrasText = '';
        this.interviniente.otras = "";

        this.checkboxes.forEach((element) => {
          element.nativeElement.checked = false;
        });
        
    }
  }

  /**
   * Confirmación de guardado de intervinientes
   *
   * @memberof AltafolioComponent
   */
  successIntervinienteMsg() {

    if (this.interviniente.id) {
      this.intervinientes[this.findIndexById(this.interviniente.id)] = this.interviniente;
      this.message.add({severity:'success', summary: 'Successful', detail: 'Interviniente actualizado', life: 3000});
    }
    else {
        this.interviniente.id = this.createId();
        this.intervinientes.push(this.interviniente);
        this.message.add({severity:'success', summary: 'Successful', detail: 'Interviniente Agregado', life: 3000});
    }

  }

  /**
   * Reinicio de intervinientes
   *
   * @memberof AltafolioComponent
   */
  resetIntervinienteVal() {
    if( this.interviniente.credito === undefined ) {
      this.interviniente.credito = "";
    }

    if( this.interviniente.apertura === undefined ) {
      this.interviniente.apertura = "";
    }

    if( this.interviniente.designacion === undefined ) {
      this.interviniente.designacion = "";
    }

    if( this.interviniente.contratarbanca === undefined ) {
      this.interviniente.contratarbanca = "";
    }

    if( this.interviniente.rfc === undefined ) {
      this.interviniente.rfc = "";
    }
    
    if( this.interviniente.otras === undefined ) {
      this.interviniente.otras = "";
    }

    if( this.interviniente.otrasText === undefined ) {
      this.interviniente.otrasText = "";
    }
  }


  /**
   *
   * Funcion para actiar la carga de archivos
   * @param {*} event
   * @return {*} 
   * @memberof AltafolioComponent
   */
  validarCargaArchivo( event: any ) {

    if( this.razonsocial === undefined ) {
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de capturar la razón social para subir un archivo";
      return;
    }

    if(this.validatebBuc()) {
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de capturar el B.U.C para subir un archivo";
      return;
    }
    
    if(this.validateRFC()) {
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de capturar un RFC para subir un archivo";
      return;
    }
    
    
    if(this.validateRazonSocial()){
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de tener una razón social para subir un archivo";
      return;
    }

    if(this.validateTipoDictamen()){
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de tener un tipo de dictamen seleccionado";
      return;
    }

    if(this.validateSubDictamen()){      
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de tener un sub tipo de dictamen seleccionado";
      return;
    }

    
    if( this.iddoc === undefined || this.dataFiltersb.tipodocumento === '' ) {
      
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de seleccionar un tipo de documento";
      return;
    }

    this.uploadsuccess = true;

  }

  private validatebBuc(): boolean {
    return this.buc === undefined && this.dataFiltersb.buc === '';
  }


  private validateRFC(): boolean {
    return this.datorfc === undefined || this.datorfc === '';
  }

  private validateRazonSocial(): boolean {
    return this.razonsocial === undefined || this.razonsocial === '';
  }

  private validateTipoDictamen(): boolean {
    return this.dataFiltersb.tipodictamenes === undefined || this.dataFiltersb.tipodictamenes === '';
  }

  private validateSubDictamen(): boolean {
    return this.subDictActivate && !(this.dataFiltersb.tipodictamenes === undefined || this.dataFiltersb.tipodictamenes === '' ) && (this.dataFiltersb.tipoempresas === undefined || this.dataFiltersb.tipoempresas === '' );
  }

  /**
   * Metodo para validar complemento
   *
   * @return {*} 
   * @memberof AltafolioComponent
   */
  validarComplemento() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    
    if(this.selectedPolitics.length !== 1) {

      this.displayModalFormErr = true;
      this.messageModalM = "Debe haber leído y estar de acuerdo con la declaratoria y responsabilidad";
      return;
    } else if(this.validatecountdocs < this.totaldocs || this.upldfiles === 0) {

      this.displayModalFormErr = true;
      this.messageModalM = "Debe de subir todos los documentos obligatorios";
      return;
    } else {
      
      if( this.dataFiltersb.tipfolios.toString() === "1" ) {
        const usrRed = this.uid;
        const ipClient = this.ipClient;
        const session = "";
  
        this._altaFolio.getFolioPadre( this.folioorigen, usrRed, ipClient, session )
            .subscribe( resp => {
  
              this.foliopadre = resp.data.beanRespuestaConsulta.beanComplementoRespuesta.id;
  
              this.folioreingreso = {
                                        "folioOrigen" : this.folioorigen,
                                        "tipoReingreso" : this.dataFiltersb.tiporeing,
                                        "subTipoReingreso": this.dataFiltersb.subtiporeing,
                                        "comentarioReingreso" : this.comreingreso,
                                        "idFolioPadre" : this.foliopadre
                                      }
              
  
              this.guardarFolio();
  
            }, (error) => {
              return error;
            });
      } else {
  
        this.folioreingreso = {
                                  "folioOrigen" : "",
                                  "tipoReingreso" : "",
                                  "subTipoReingreso": "",
                                  "comentarioReingreso" : "",
                                  "idFolioPadre" : ""
                                }
  
        this.guardarFolio();
      }

    }

  }

  /**
   * Metodo para guardar Folio
   *
   * @memberof AltafolioComponent
   */
  guardarFolio() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const dataFolio = {
                        "beanDocumentos" : this.arrayFiles,
                        "beanIntervinientes" : this.intervinientesvalue,
                        "beanZonaRespuesta" : {
                          "sucursal" : this.sucursal,
                          "region" : this.region,
                          "zona" : this.zona,
                          "banca" : this.cc
                        },
                        "beanFolioDatos" : {
                          "origen" : this.dataFiltersb.tiporigen.toString(),
                          "solicitante" : this.nombre,
                          "tipoFolio" : this.dataFiltersb.tipfolios.toString(),
                          "nombreDenominacion" : this.razonsocial,
                          "buc" : this.dataFiltersb.buc,
                          "tipoDictamen" : this.dataFiltersb.tipodictamenes,
                          "tipoEmpresa" : this.dataFiltersb.tipoempresas,
                          "rfc": this.datorfc,
                          "prioridad": 1,
                          "tipoPersona": this.tipopersona,
                          "nacionalidad": this.nacionalidad !== 'NAC' && 'EXT' ? 'NAC' : this.nacionalidad,
                          "centroCostoCli": this.centrocostoscli
                        },
                        "usrRed" : this.uid,
                        "ipClient" : this.ipClient,
                        "conn" : "",
                        "beanFolioReingreso" : this.folioreingreso
                    }

    this._altaFolio.createFolio( dataFolio )
        .subscribe( resp => {

            this.banbusqueda = resp.data.clienteDto.data.banBusqueda;

            if( this.banbusqueda === true ) {

              const idCliente = resp.data.clienteDto.data.cliente.idCliente;
              const razonSocialtest = resp.data.clienteDto.data.cliente.razonSocial;
              const razonSocial = razonSocialtest;

              const dataClient = {

                                    "cliente":{
                                        "idCliente": idCliente,
                                        "razonSocial": razonSocial,
                                        "buc": this.dataFiltersb.buc,
                                    },
                                    "usrRed": this.uid,
                                    "ipClient": this.ipClient,
                                    "conn": ""

                                  }

                this._altaFolio.updtClienteFolio( dataClient )
                                .then(( response: any ) => {
                                  console.log(response);
                                  return response;
                                })

            }

            this.headerModalM = "¡Te estamos atendiendo! ";
            this.messageModalM = `El folio se ha agregado correctamente, con el número 
                                  ${resp.data.salida} Espera la resolución dentro de la fecha compromiso.
                                  Si necesitas asesoría envía un correo al buzón de ayuda.`;
            this.displayModalM = true;

        }, (errors) => {
          this.displayModalFormErr = true;
          this.messageModalM = errors.error.errors[0].message;
        });

  }

  /**
   * Metodo para obtener la Razon Social
   *
   * @memberof AltafolioComponent
   */
  obtenerRazonS() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const databuc = {
                      "buc": this.dataFiltersb.buc,
                      "codePosition": this.codePosition,
                      "usrRed": this.uid,
                      "ipClient": this.ipClient,
                      "conn": ""
                    }
    
    this._catalogos.getBuc( databuc )
        .subscribe( ( resp: any ) => {

          this.razonsocial = resp.nombre;
          this.centrocostoscli = resp.centroCosto;
          this.datorfc = resp.rfc;
          this.nacionalidad = resp.nacionalidad;
          this.tipopersona = resp.tipoPersona;
          
          if( this.razonsocial === 'NO_EXISTE_BUC') {
              this.bucusuario = '';
              this.razonsocial = '';
              this.centrocostoscli = '';

              this.displayModalBuc = true;
          }

          if(this.datorfc !== "") {
            this.getTypeDictRFC();
          }

        })

  }

  validarBuc() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const databuc = {
                      "buc": this.dataFiltersb.buc,
                      "codePosition": this.codePosition,
                      "usrRed": this.uid,
                      "ipClient": this.ipClient,
                      "conn": ""
                    }
    
    this._catalogos.getBuc( databuc )
        .subscribe( ( resp: any ) => {

          this.centrocostoscli = resp.centroCosto;
          
          if( resp.validado === 'NO_EXISTE_BUC') {
              
              this.centrocostoscli = '';
              this.bucusuario = '';
              this.displayModalBuc = true;
          }

        })

  }

  /**
   * Metodo para redireccionar a complelemento
   *
   * @memberof AltafolioComponent
   */
  generarComplemento() {

    this._router.navigate(['/foliocomplemento', this.folioorigen]);

  }

  /**
   * Metodo para buscar index
   *
   * @param {*} id
   * @return {*}  {number}
   * @memberof AltafolioComponent
   */
  findIndexById(id: any): number {
    let index = -1;
    for (let i = 0; i < this.intervinientes.length; i++) {
        if (this.intervinientes[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  /**
   * Metodo para crear id
   *
   * @return {*}  {string}
   * @memberof AltafolioComponent
   */
  createId(): string {

    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  
  }

  /**
   * Metodo para cargar total de paginas
   *
   * @param {*} pdfData
   * @memberof AltafolioComponent
   */
  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  /**
   * Metodo para cargar archivos
   *
   * @param {*} event
   * @memberof AltafolioComponent
   */
  onFileSelected( event: any ) {

    this.filePDF = event.srcElement.files[0];
    this.filename = event.srcElement.files[0].name;
    this.filesize = event.srcElement.files[0].size;
    this.displayModalF = true;
    
    let $file: any = document.querySelector('#up_doct_bttn');

    if( this.filesize > 12000000 ) {

      this.fileUpload.nativeElement.value = "";
      this.displayModalFormErr = true;
      this.messageModalM = 'El tamaño del archivo no debe ser mayor a 12 MB.';
      this.displayModalF = false;
   
    } else if ( typeof (FileReader) !== 'undefined' ) {
      
      const reader = new FileReader();
      reader.readAsDataURL(this.filePDF);
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        this.nuevoDocumentoObj();
      };
      
      reader.readAsArrayBuffer($file.files[0]);
    }

  }

  /**
   * Metodo para descargar archivos
   *
   * @param {*} base64
   * @param {*} nombre
   * @memberof AltafolioComponent
   */
  descargarArchivo( base64: any, nombre:any, descrip: any ) {

    if( base64 === undefined ) {

      this.arrayFiles.forEach( (item: any) => {

        if( nombre === item.nombreDocumento && descrip === item.descripcionTipoDocumento) {
          let downloadBase64 = item.docBase64;
          const basefile = `data:application/pdf;base64,${downloadBase64}`;
          const link = document.createElement("a");
          link.href = basefile;
          link.download = `${nombre}`
          link.click();
        }
      });

    } else {

      this._dictamenes.getBase64FileNet( base64, nombre )
      .subscribe( resp => {

              let sanitizedBase: any = '';
              let downloadBase64 = resp.docBase64;
              const basefile = `data:application/pdf;base64,${downloadBase64}`;
              const link = document.createElement("a");
              sanitizedBase = this._sanitizer.sanitize(SecurityContext.HTML, basefile)
              link.href = sanitizedBase
              link.download = `${nombre}`
              link.click();

      }, (error) => {
        return error;
      });
    
    }

  }

  /**
   * Metodo para previsualizar archivo
   *
   * @param {*} codeb
   * @param {string} nombre
   * @memberof AltafolioComponent
   */
  previewArchivo( codeb: any, nombre: string, descrip: any ) {

    if( codeb === undefined ) {

      this.arrayFiles.forEach( (item: any) => {
        if( nombre === item.nombreDocumento && descrip === item.descripcionTipoDocumento) {
          
          this.filenetBase64 = item.docBase64;
          let filepb64 = 'data:application/pdf;base64,' + this.filenetBase64;
          this.filePDF =  this.filenetBase64;
          this.displayModalF = true;
      
          const b64toUrl = async (base64Data: any) => {
            const r = await fetch(base64Data);
            const blob = await r.blob();
            return blob
          }
          const load = async () => {
          
            const pdfvew = await b64toUrl(filepb64);
            if (typeof (FileReader) !== 'undefined') {
            
              const reader = new FileReader();
              reader.readAsDataURL(pdfvew);
              reader.onload = (e: any) => {
                this.pdfSrc = e.target.result;
                
              };
      
            }
      
          }
          load();

        }
      });

    } else {

        this._dictamenes.getBase64FileNet( codeb, nombre )
            .subscribe( resp => {
              let filenetBase64 = resp.docBase64;
              let filepb64 = 'data:application/pdf;base64,' + filenetBase64;
              this.filePDF =  filenetBase64;
              this.displayModalF = true;
          
              const b64toUrl = async (base64Data: any) => {
                const r = await fetch(base64Data);
                const blob = await r.blob();
                return blob
              }
              const load = async () => {
              
                const pdfvew = await b64toUrl(filepb64);
                if (typeof (FileReader) !== 'undefined') {
                
                  const reader = new FileReader();
                  reader.readAsDataURL(pdfvew);
                  reader.onload = (e: any) => {
                    this.pdfSrc = e.target.result;
                    
                  };
          
                }
          
              }
              load();

            }, (error) => {
              return error;
            });
    }

  }

  /**
   * Metodo para cargar nuevo documento
   *
   * @memberof AltafolioComponent
   */
  nuevoDocumentoObj() {

    this.pdffile = this.createId();
    const base64result = this.pdfSrc.split(',')[1];
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    let data = {
                  "nombreDocumento": this.filename,
                  "docBase64": base64result,
                  "bucUsuario": this.dataFiltersb.buc,
                  "idFilenet": "",
                  "idTipoDocumento": this.iddoc,
                  "denRazSoc": this.razonsocial,
                  "rfc": this.datorfc,
                  "solicitante": this.uid,
                  "ipClient": this.ipClient,
                  "usrRed": this.uid,
                  "conn": "",
              }

    this._dictamenes.upDocFileNet( data )
        .subscribe((resp:any) => {

          this.idFilenet = resp.data.message;

          this.arrayFiles.push({  "idTipoDocumento": this.iddoc,
                                  "nombreDocumento": this.filename, 
                                  "idFilenet": this.idFilenet,
                                  "bucUsuario": this.dataFiltersb.buc,
                                  "tipoDocumento": this.descdoc
                              });
          
          this.updateList.reset();
          this.countdocs();
          
        }, (errors) => {
          this.displayModalF = false;
          this.fileUpload.nativeElement.value = "";
          this.displayModalFormErr = true;
          this.messageModalM = errors.error.message;
        });

  }

  /**
   * Metodo para contar el numero de documentos adjuntados
   *
   * @memberof AltafolioComponent
   */
  countdocs() {

    let afname = '';
    let getoblig: any = [];

    this.upldfiles = this.arrayFiles.length;
  
    this.tipodocumento.forEach(function(obl) {
      getoblig.push({'tipoDocumento': obl.descDocumento, 'obligatorio': obl.obligatorio});
    });
    
    this.totaldocs = getoblig.reduce((prev: any, curr: any) => {
      return (Number(prev)) + (Number(curr.obligatorio));
    }, 0);

    this.arrayFiles.forEach(( obj: any ) => {
      afname = obj.tipoDocumento; 
    });
      
    const tempgetoblig = getoblig.filter(( oblig: any) => {

      if( oblig.tipoDocumento === afname && oblig.obligatorio === "1" ) {
        this.resultArrayFiles.push(oblig);
      }

    });

    const finalCountDocs = this.resultArrayFiles.filter((obj: any, index:any) => {
      return index === this.resultArrayFiles.findIndex(doc => obj.obligatorio === doc.obligatorio && obj.tipoDocumento === doc.tipoDocumento);
    });

    this.validCountDocs();
      
    this.validatecountdocs = finalCountDocs.length;
  
  }

  validCountDocs() {

    if(this.arrayFiles.length === 0) {
      this.resultArrayFiles = [];
    }

    this.validatecountdocs = this.resultArrayFiles.reduce((accumulator, obj) => {
      return (Number(accumulator) || 0) + (Number(obj.obligatorio) || 0);
    }, 0);
    
  }

  /**
   * Metodo para validar datos obligatorios
   *
   * @param {*} doc
   * @return {*} 
   * @memberof AltafolioComponent
   */
  validarDocsObligatorios( doc: any ) {
    return !!this.arrayFiles.find(x => x.tipoDocumento === doc.descDocumento);
  }

  eliminarDocumento( arrayFiles: Documentos, rowIndex: any ) {

    this.arrayFiles.forEach(() => {
      
      this.arrayFiles = this.arrayFiles.filter((index => index !== arrayFiles));
      
    });

    let newresult = this.resultArrayFiles.filter(item => item.tipoDocumento !== arrayFiles.tipoDocumento);
    
    localStorage.setItem('cnt', this.upldfiles);

    this.resultArrayFiles = newresult;
    this.updateList.reset();
    this.countdocs();

  }

  /**
   * siguiente pagina del preview
   *
   * @memberof AltafolioComponent
   */
  nextPage() {
    this.page++;
  }

  /**
   * Pagina anterior del preview
   *
   * @memberof AltafolioComponent
   */
  prevPage() {
    this.page--;
  }

  /**
   * Metodo para descargar archivo del preview
   *
   * @memberof AltafolioComponent
   */
  downloadFile() {
    
    let downloadURL = window.URL.createObjectURL(this.filePDF);
    let link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.filename;
   
    link.click();

  }

  /**
   * Metodo para cargar pagina
   *
   * @memberof AltafolioComponent
   */
  limpiarFormulario() {
      
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/nva-solicitud']);
    });

  }

  /**
   * Metodo para obtener el RFC
   *
   * @memberof AltafolioComponent
   */
  obtenerRFC() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const data = {
                    "rfc": this.datorfc,
                    "codePosition": this.codePosition,
                    "tipoPersona": this.tipopersona,
                    "usrRed": this.uid,
                    "ipClient": this.ipClient,
                    "conn": ""
                  }

    this._catalogos.getRFC( data )
        .subscribe( ( resp:any ) => {
            this.tipopersona = resp.tipoPersona;
            this.getTypeDictRFC();
        }, (error) => {
          
          this.displayModalFormErr = true;
          this.messageModalM = `${error.error.errors[0].message}` + ' ' + 'intente de nuevo con otro RFC';
        
          return error;
        });

  }

  /**
   * Metodo para obtener catalogo de ingresos
   *
   * @memberof AltafolioComponent
   */
  getReingresos() {
    this._catalogos.getReing()
        .subscribe( ( resp: any ) => {
          
          this.reingresosData = resp;
          return resp;
        
        })
  }

  /**
   * MEtodo para obtener catalogo de sub reingresos
   *
   * @memberof AltafolioComponent
   */
  getSubReingresos() {
    this._catalogos.getReingreso()
        .subscribe( ( resp: any ) => {
          
          this.subreingresosData = resp;
          return resp;
        
        })
  }

  /**
   * obtener catalogo de tipo de persona
   *
   * @memberof AltafolioComponent
   */
  getTypeDictRFC() {

    const tipop = this.tipopersona;

    this._catalogos.getTypeDictRFC( tipop )
        .subscribe( ( resp: Cattipodict[] ) => {
          this.tipodictamen = resp;
        })
  }

  /**
   * Metodo para obtener el tipo de empresa
   *
   * @memberof AltafolioComponent
   */
  getTipoEmp() {
    this.tipoempresa = [];
    const tipoper = this.tipopersona;

    this._catalogos.getTipoEmpresa( this.dataFiltersb.tipodictamenes, tipoper )
        .subscribe( (resp: Tipoempresa[]) => {
          this.subDictActivate = resp.length > 0  ? true : false;
           this.tipoempresa = resp;
        }, (error) => {
          this.subDictActivate = false;
        });

  }

  /**
   * Metodo para obtener catalogo de documentos por emrpesa
   *
   * @memberof AltafolioComponent
   */
  getTipoDoc() {

    let idtipodict;
    let idtipoemp;

    idtipodict = this.dataFiltersb.tipodictamenes;
    idtipoemp = this.dataFiltersb.tipoempresas;
    const tipoper = this.tipopersona;

    this._catalogos.getDocumentosEmpDict( idtipodict, idtipoemp, tipoper )
        .subscribe( (resp: Tipodoc[]) => {
          this.tipodocumento = resp;
        })

  }

  onKeydown(event: any){
    event.preventDefault();
  }

  /**
   * Metodo para cerrar modal
   *
   * @memberof AltafolioComponent
   */
  cerrarDialogF() {
    this.pdfSrc = "";
    this.displayModalF = false
  }

  /**
   * Metodo cerrar modal y redirect
   *
   * @memberof AltafolioComponent
   */
  closeModal() {

    this.displayModalM = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/solicitudes']);
    });

  }

  /**
   * Metodo cerrar modal inicial
   *
   * @memberof AltafolioComponent
   */
  closeModalInit() {
    this.displayModalInit = false;
  }

  /**
   * Metodo cerrar modal politicas
   *
   * @memberof AltafolioComponent
   */
  closePoliticasModal() {
    this.displayModalP = false;
    this.selectedPolitics = ['politics'];
  }

  /**
   * Metodo cerrar modal aviso
   *
   * @memberof AltafolioComponent
   */
  closeAvisoModal() {
    this.displayModalAd = false;
  }

  /**
   * Metodo cerrar modal buc
   *
   * @memberof AltafolioComponent
   */
  closeBucModal() {
    this.displayModalBuc = false;
  }

  /**
   * Metodo cerrar modal error
   *
   * @memberof AltafolioComponent
   */
  closeModalError() {
    this.displayModal = false;
  }

  /**
   * Metodo cerrar modal formulario
   *
   * @memberof AltafolioComponent
   */
  closeModalForm() {
    this.displayModalFormErr = false;
  }

  /**
   * Metodo cerrar modal confirmacion alta
   *
   * @memberof AltafolioComponent
   */
  onAcceptError() {

    this._router.navigateByUrl('/nva-solicitud' );
    this.closeModalError();

  }

}
