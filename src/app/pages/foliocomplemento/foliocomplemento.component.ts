import { ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
import { Table } from 'primeng/table';
// Interfaces
import { Cattipodict, Reingreso, Tipodoc, Tipoempresa } from '../../interfaces/catalogos.interface';
import { Interviniente } from '../../interfaces/interviniente.interface';
import { Solicitudes } from '../../interfaces/solicitudes.interface';
import { Documentos } from '../../interfaces/documentos.interface';
// Servicios
import { DictamenesService } from '../../servicios/dictamenes.service';
import { DictaminacionService } from '../../servicios/dictaminacion.service';
import { IntervinienteService } from '../../servicios/intervinientes.service';
import { CatalogosService } from '../../servicios/catalogos.service';
import { AltaFolioService } from '../../servicios/alta-folio.service';
import { ProfileService } from '../../servicios/profile.service';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentPageService } from 'src/app/servicios/current-page.service';


@Component({
  selector: 'app-foliocomplemento',
  templateUrl: './foliocomplemento.component.html',
  styles: [
  ]
})
export class FoliocomplementoComponent implements OnInit {

  @Input() iconoDictamen: IconDefinition | undefined;

  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

  @ViewChild("fileInput", {static: false}) fileUpload!: ElementRef;

  @ViewChild('dt1') updateList!: Table;

  pipeDate = new DatePipe('en-US');

  nombre!: string;

  apellidoP!: string;

  uid!: string;

  datorfc!: string;

  solicitante!: string;

  region!: string;

  fechaRegistro!: string;

  razonSocial!: string;

  centrocostoscli!: string;

  fechaactual: any;

  sucursal!: string;

  cc!: string;

  codePosition!: string;

  buc!: string;

  banbusqueda!: boolean;

  isReady = true;

  comreingreso!: any;

  tipofolio!: any;

  tipfolios!: Solicitudes[];

  reingresos!: any;

  reingresosData!: Reingreso[];

  subreingresosData!: Reingreso[];

  subreingresos!: any;

  tiporigen!: string;

  folio!: string;

  folioComplemento!: string;

  foliodata!: any;

  folioorigen!: string;

  foliopadre!: string;

  folioreingreso!: any;

  dataFiltersb!: any;

  bucusuario!: string;

  idDictamen!: string;

  idSubDictamen!: string;

  origen!: any;

  zona: string = '';

  tipoFolio!: string;

  submitted: boolean = false;

  interviniente: any;

  intervinientes!: any[];

  selectedIntervinientes!: any;

  detIntervOtros!: boolean;

  dropintvalue: any[] = [];

  intervinientesvalue: any[] = new Array;

  id!: string;

  filePDFv!: any;

  filePDF!: any;

  pdffile!: any;

  filenetBase64!: any;

  filename!: string;

  filesize!: number;

  uploadsuccess: boolean = false;

  upldfiles: any;

  totaldocs: any;

  pdfSrc!: any;

  tipopersona!: string;

  nacionalidad!: string;

  selectedintervinientes!: any;

  comentarios!: any[];

  selectedcomentarios!: any;

  arrayFiles: any[] = new Array;

  validatecountdocs!: any;
  
  selectedarrayFiles!: any;

  tipodictamen!: Cattipodict[];

  tipodictamenes!: Cattipodict;

  tipodocumento: Tipodoc[] = [];

  subDictActivate: boolean = false;

  tipoempresa!: Tipoempresa[];

  tipoempresas!: Tipoempresa;

  tipdict!: any;

  subtipoemp!: any;

  descdoc!: any;

  iddoc!: string | undefined;

  tipodoc!: any;

  resultArrayFiles: any[] = new Array;

  idFilenet!: string;

  selectedPolitics: any[] = [];

  politicas: boolean = false;

  page: number = 1;

  totalPages: number = 0;

  isLoaded: boolean = false;

  headerModalM!: string;

  messageModalM!: string;

  /* Propiedades manejo de errores */
  errorMessage:   string;

  displayModal!:  boolean;

  displayModalM: boolean = false;

  displayModalBuc = false;

  displayModalP: boolean = false;

  displayModalF: boolean = false;

  displayModalAd: boolean = false;

  displayModalFormErr = false;

  displayModalFormErrRedirect = false;

  bloqueoff: Boolean = true;

  ipClient: any;

  usrRed: any;

  t_dictamen = new FormControl({value:"", disabled: true});

  constructor( public _dictaminacion: DictaminacionService,
               private _route: ActivatedRoute,
               public _router:  Router,
               private _currentPageService: CurrentPageService,
               private _confirmation: ConfirmationService,
               public _profile: ProfileService,
               public _altaFolio: AltaFolioService,
               private _dictamenes: DictamenesService,
               private _interviniente: IntervinienteService,
               private _catalogos: CatalogosService,
               private _bearerToken: BearerTokenService,
               private _cookieService: CookieService,
               private _sanitizer: DomSanitizer ) { 
                  
                  this.dataFiltersb = {};
                  this.errorMessage = '';
              
              }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this._interviniente.getIntervinientes().then(data => this.intervinientes = data);

    this.obtenerIdFolio();

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

    this.interviniente = {};
    this.submitted = false;
    this.upldfiles = 0;
    this.totaldocs = 1;

    localStorage.setItem('previousUrl', 'folioComplemento');

  }

  obtenerPerfil() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {

        let user = localStorage.getItem('usuario');
        let roluser = localStorage.getItem('roluser');

        return this._profile.getProfile(user, roluser, this.ipClient )
                  .subscribe( ( resp: any ) => {

                      this.nombre = resp.name;
                      this.apellidoP = resp.lastNameDad;
                      this.uid = resp.userId;
                      this.fechaactual = this.pipeDate.transform(Date.now(), 'dd/MM/yyyy');
                      this.region = resp.region.nameRegion;
                      this.sucursal = resp.costCenter.nameCostCenter;
                      this.cc = String(resp.costCenter.cveCostCenter);
                      this.zona = String(resp.zone.idZone);
                      this.codePosition = resp.userPosition.codePosition;
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
                      this.cc = String(resp.costCenter.cveCostCenter);
                      this.zona = String(resp.zone.idZone);
                      this.codePosition = resp.userPosition.codePosition;
                  });
            
    }

  }

  getData( event: any, field: string ) {

    switch ( field ) {
      case 'tipfolios':
        this.dataFiltersb.tipfolios = event.value.id;

        if( this.tipoFolio !== "COMPLEMENTO" ) {
          this._router.navigate(['/nva-solicitud']);
        }

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
        this.uploadsuccess = false;
        this.tipodoc = {descripcion: '', idDocumento: null};
        this.iddoc = undefined;
        this.dataFiltersb.tipodocumento = '';
        this.dataFiltersb.tipodictamenes = event.value;
        break; 
      case 'tipoempresa':
        this.arrayFiles = [];
        this.dataFiltersb.tipoempresas = event.value;
        this.getTipoDoc();
        break;  
      case 'folioo':
        this.folioorigen = event;
        break;
      default:
        break;
    }

  }

  getDataA( event: any, field: string ) {

    switch ( field ) {
      case 'tiporeing':
        this.dataFiltersb.tiporeing = event.value.id;
        break;
      case 'subtiporeing':
        this.dataFiltersb.subtiporeing = event.value.valor;
        break;
      case 'optionsRadios2':
        this.asignvalcred( event );
        break;
      case 'optionsRadios3':
        this.asignvalaper( event );
        break;
      case 'optionsRadios1':
        this.asignvaldesig( event );
        break;
      case 'optionsRadios5':
        this.asignvalcontb( event );
        break;
      case 'optionsRadios4':
        this.interviniente.otras = event.srcElement.defaultValue;
        this.detIntervOtros = event.srcElement.checked;
        break;
      case 'tipodocumento':
        this.dataFiltersb.tipodocumento = event.value.descDocumento;
        this.descdoc = this.dataFiltersb.tipodocumento;
        this.iddoc = event.value.idDocumento;
        this.validarCargaArchivo( event );
        break;
    }
  }

  asignvalcred( event: any ) {
    if( event.srcElement.checked === true ) {
      this.interviniente.credito = "1";
    }
  }

  asignvalaper( event: any ) {
    if( event.srcElement.checked === true ) {
      this.interviniente.apertura = "4";
    }
  }

  asignvaldesig( event: any ) {
    if( event.srcElement.checked === true ) {
      this.interviniente.designacion = "2";
    }
  }

  asignvalcontb( event: any ) {
    if( event.srcElement.checked === true ) {
      this.interviniente.contratarbanca = "3";
    }
  }

  obtenerIdFolio() {

    const localip = localStorage.getItem("ipC");
    const idfolio = this._route.snapshot.paramMap.get( 'idfolio' );
    const session = '';
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");


    this._dictaminacion.getIdxFolio( idfolio, this.usrRed, this.ipClient, session )
                       .subscribe( ( resp:any ) => {
                          this.id = resp.beanRespuestaConsulta.beanComplementoRespuesta.id;
                          this.obtenerFolioDictamen( this.id );
                          this.obtenerComentarios( this.id );
                       });

  }

  obtenerFolioDictamen( id: string ) {

    const localip = localStorage.getItem("ipC");
    const idfolio = id;
    const session = '';
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");


    this._dictaminacion.getFolioDictamen( idfolio, this.usrRed, this.ipClient, session )
                       .subscribe( ( resp: any ) => {
 
                         this.foliodata = resp;
                         this.tipoFolio = 'COMPLEMENTO';
                         this.solicitante = resp.beanEmitirDictamen.solicitante
                         this.idDictamen = resp.beanFolio.idTipoDictamen;
                         this.idSubDictamen = resp.beanFolio.idTipoEmpresaFk;
                         this.folioComplemento = resp.beanFolio.complemento;
                         this.tiporigen = resp.beanAbogadoOrigen.origen;
                         this.fechaRegistro = resp.beanFechasRespuesta.fechaRegistro;
                         this.folio = resp.beanFolio.folio;
                         this.datorfc = resp.beanFolio.rfc;
                         this.tipdict = this.foliodata.beanFolio.descTipoDictamen;
                         this.razonSocial = resp.beanEmitirDictamen.nombreDenominacionRazonSocial;
                         this.buc = resp.beanFolio.buc;
                         this.dataFiltersb.tipodictamenes = resp.beanFolio.idTipoDictamen === '0' ? '' : resp.beanFolio.idTipoDictamen;
                         this.dataFiltersb.tipoempresas = resp.beanFolio.idTipoEmpresaFk;
                         this.tipoempresas = resp.beanFolio.idTipoEmpresaFk;
                         this.tipopersona = resp.beanFolio.tipoPersona;
                         this.nacionalidad = resp.beanFolio.nacionalidad;
                         
                         this.obtenerDocumentos();
                         this.getTipoEmp();
                         this.validateDict();
                         this.getTipoDoc();
                         this.obtenerRazonS();

                          if( this.tipopersona !== "PM" && "PF" ) {
                            this.dataFiltersb.rfc = '';
                            this.datorfc = '';
                          }

                        })

  }

  validateDict() {

    const localip = localStorage.getItem("ipC");
    this.usrRed = localStorage.getItem("uId");
    this.ipClient = localip;

    switch ( this.idDictamen ) {
      case '0':
    
        this.displayModalFormErrRedirect = true;
        this.messageModalM = 'No es posible generar un complemento, Por favor genere un folio nuevo';

        break;
      case '1':

        const dataob = {
          "idFolio": this.id,
          "ip": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamentOPBancPDF( dataob )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
            });

        break;
      case '2':

        const datagobi = {
          "idFolio": this.id,
          "ip": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamenGobeInstPDF( datagobi )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });
            
        break;
      case '3':

        const datae = {
          "idFolio": this.id,
          "ip": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamentEspPDF( datae )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });

        break;
      case '4':

        const datads = {
          "idFolio": this.id,
          "ip": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamentDevSalPDF( datads )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });

        break;
      case '5':

        const datafid = {
          "idFolio": this.id,
          "ip": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamenFideicomisoPDF( datafid )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });
        
        break;
      case '6':

        const datapf = {
          "idFolio": this.id,
          "ip": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamenPerFisPDF( datapf )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });

        break;

    }

  }

  validarComplemento() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    if(this.selectedPolitics.length !== 1) {

      this.displayModalFormErr = true;
      this.messageModalM = "Debe haber leído y estar de acuerdo con la declaratoria y responsabilidad";
      return;
    } else if(this.validatecountdocs < this.totaldocs) {

      this.displayModalFormErr = true;
      this.messageModalM = "Debe de subir todos los documentos obligatorios";
      return;
    } else {

      if( this.tipoFolio === "COMPLEMENTO" ) {
        
        const session = "";

        this._altaFolio.getFolioPadre( this.foliodata.beanFolio.folio, this.usrRed, this.ipClient, session )
            .subscribe( resp => {

              this.foliopadre = resp.data.beanRespuestaConsulta.beanComplementoRespuesta.id;

              this.folioreingreso = {
                                        "folioOrigen" : this.foliodata.beanFolio.folio,
                                        "tipoReingreso" : this.dataFiltersb.tiporeing,
                                        "subTipoReingreso": this.dataFiltersb.subtiporeing === undefined ? this.dataFiltersb.subtiporeing = "" : this.dataFiltersb.subtiporeing,
                                        "comentarioReingreso" : this.comreingreso,
                                        "idFolioPadre" : this.foliopadre,
                                        "idAbogExt": this.foliodata.beanAbogadoExterno.idAbogExt === null ? this.foliodata.beanAbogadoExterno.idAbogExt = "" : this.foliodata.beanAbogadoExterno.idAbogExt
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

  guardarFolio() {

    this.tiporigen = this.dataFiltersb.tiporigen;
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
                          "origen" : this.tiporigen === 'BANCO' ? this.tiporigen = "1" : this.tiporigen = "2",
                          "solicitante" : this.foliodata.beanEmitirDictamen.solicitante,
                          "tipoFolio" : this.tipoFolio = 'COMPLEMENTO' ? "1" : "0",
                          "nombreDenominacion" : this.foliodata.beanBusqueda.razonSocial,
                          "buc" : this.foliodata.beanFolio.buc,
                          "tipoDictamen" : this.foliodata.beanFolio.idTipoDictamen,
                          "tipoEmpresa" : this.dataFiltersb.tipoempresas,
                          "rfc": this.datorfc,
                          "prioridad": 0,
                          "tipoPersona": this.tipopersona,
                          "nacionalidad": this.nacionalidad !== 'NAC' && 'EXT' ? 'NAC' : this.nacionalidad
                        },
                        "beanFolioReingreso": {
                          "folioOrigen": this.folio,
                          "tipoReingreso": this.dataFiltersb.tiporeing,
                          "subTipoReingreso": this.dataFiltersb.subtiporeing,
                          "comentarioReingreso": this.comreingreso,
                          "idFolioPadre": this.id,
                          "idAbogExt": this.foliodata.beanAbogadoExterno.idAbogExt
                      },
                        "usrRed" : this.uid,
                        "ipClient" : this.ipClient,
                        "conn" : "",
                    }

        this._altaFolio.createFolio( dataFolio )
        .subscribe( resp => {

          this.banbusqueda = resp.data.clienteDto.data.banBusqueda;

          if( this.banbusqueda === true ) {

            const idCliente = resp.data.clienteDto.data.cliente.idCliente;
            const razonSocialtest = resp.data.clienteDto.data.cliente.razonSocial;
            const razonSocial = razonSocialtest;
            const bucresp = resp.data.clienteDto.data.cliente.buc;

            const dataClient = {

                                  "cliente":{
                                      "idCliente": idCliente,
                                      "razonSocial": razonSocial,
                                      "buc": bucresp,
                                  },
                                  "usrRed": this.uid,
                                  "ipClient": this.ipClient,
                                  "conn": ""

                                }

              this._altaFolio.updtClienteFolio( dataClient )
                              .then(( response: any ) => {
                                return response;
                              })

          }

          this.headerModalM = "¡Te estamos atendiendo! ";
          this.messageModalM = `El folio se ha agregado correctamente, con el número 
                                ${resp.data.salida} Espera la resolución dentro de la fecha compromiso.
                                Si necesitas asesoría envía un correo al buzón de ayuda.`;
          this.displayModalM = true;

          this._currentPageService.setAdvancedSearchRequest(null);
          localStorage.removeItem('searchAdvancedRequest');
          localStorage.removeItem('previousUrl');

        }, (error) => {
              this.displayModalFormErrRedirect = true;
              this.messageModalM = error.error.errors[0].message;
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
                      "buc": this.buc,
                      "codePosition": this.codePosition,
                      "usrRed": this.uid,
                      "ipClient": this.ipClient,
                      "conn": ""
                    }
    
    this._catalogos.getBuc( databuc )
        .subscribe( ( resp: any ) => {

          //this.razonSocial = resp.nombre;
          this.centrocostoscli = resp.centroCosto;
          this.datorfc = resp.rfc;
          this.nacionalidad = resp.nacionalidad;
          this.tipopersona = resp.tipoPersona;
          
          if( this.razonSocial === 'NO_EXISTE_BUC') {
              this.bucusuario = '';
              this.razonSocial = '';
              this.centrocostoscli = '';

              this.displayModalBuc = true;
          }

          if(this.datorfc !== "") {
            this.getTypeDictRFC();
          }

        })

  }

  rstIntervVal() {

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

  eliminarInterviniente(intervinientes: Interviniente, rowIndex: any) {

    this._confirmation.confirm({

        message: 'Estas seguro de que quieres borrar ' + intervinientes.nombre + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        
        accept: () => {
            
            this.intervinientes = this.intervinientes.filter(val => val.id !== intervinientes.id);
            this.interviniente = {};

            this.intervinientesvalue.forEach((element,index) => {
              this.intervinientesvalue = this.intervinientesvalue.filter(val => val.id !== intervinientes.id);
            });
        
          }
    });
  }

  generarComplemento() {

    this._router.navigate(['/foliocomplemento', this.foliodata.beanFolio.folio]);

  }

  obtenerComentarios( id: any ) {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");
    
    const idfolio = id;
    const session = "";

    this._dictaminacion.getComments( idfolio, this.usrRed, this.ipClient, session )
        .subscribe( ( resp:any ) => {

          this.comentarios = resp;

        })
        
  }

  obtenerDocumentos() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");
    const session = "";

    const data = {
                      "folio": this.foliodata.beanFolio.folio,
                      "folioComp": this.foliodata.beanFolio.complemento !== undefined ? this.foliodata.beanFolio.complemento : "",
                      "tipoDict": this.idDictamen,
                      "tipoSubDict": this.idSubDictamen,
                      "buc": this.buc,
                      "razonSocial": this.razonSocial,
                      "ipClient": this.ipClient,
                      "usrRed": this.usrRed,
                      "conn":""
                  }

    this._interviniente.getDocumentosByFolio( data )
        .subscribe( resp => {

          this.arrayFiles = resp.map(((item: any) => {
            const tipodocid = item.idTipoDocumento;
            return {
              "id": item.id,
              "descripcionTipoDocumento": item.descripcionTipoDocumento,
              "resultado": item.resultado,
              "descRechazo": item.descRechazo,
              "descSubRechazo": item.descSubRechazo,
              "comentario": item.comentario,
              "bucUsuario": this.foliodata.beanFolio.buc,
              "idFilenet": item.idFilenet,
              "idTipoDocumento": tipodocid,
              "nombreDocumento": item.nombreDocumento
            };
          }));

          this.getTipoDoc();

        }, (error: any) => {
          return error;
        });

  }

  
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

  eliminarDocumento( arrayFiles: Documentos, rowIndex: any ) {

    
    this.arrayFiles.forEach((element) => {
      
      this.arrayFiles = this.arrayFiles.filter(index => index !== arrayFiles);
      
    });
    
    let newresult = this.resultArrayFiles.filter(item => item.tipoDocumento === arrayFiles.tipoDocumento);
    this.resultArrayFiles = newresult;
    this.countdocs();
    
  }

  createId(): string {

    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  
  }

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
   *
   * Funcion para actiar la carga de archivos
   * @param {*} event
   * @return {*} 
   * @memberof AltafolioComponent
   */
  validarCargaArchivo( event: any ) {

    if( this.buc === '' ) {

      this.displayModalFormErr = true;
      this.messageModalM = "Debe de capturar el B.U.C";
    }

    if(this.validateRazonSocial()) {

      this.displayModalFormErr = true;
      this.messageModalM = "Debe de tener una razón social para subir un archivo";
      return;
    }
    
    if(this.validateRFC()) {
    
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de capturar un rfc para subir un archivo";
      return;
    }

    if( this.validateDictamen()){
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de tener un tipo de dictamen seleccionado";
      return;
    }
    
    
    if(this.validateSubDictamen()){      
      this.displayModalFormErr = true;
      this.messageModalM = "Debe de tener un sub tipo de dictamen seleccionado";
      return;
    }

    
    if( this.iddoc === undefined ) {

      this.displayModalFormErr = true;
      this.messageModalM = "Debe de seleccionar un tipo de documento";
      return;
    }
    
      this.uploadsuccess = true;

  }

  private validateRazonSocial(): boolean {
    return this.razonSocial === undefined || this.razonSocial === '';
  }

  private validateRFC(): boolean {
    return this.datorfc === undefined || this.datorfc === '';
  }

  private validateDictamen(): boolean {
    return this.dataFiltersb.tipodictamenes === undefined || this.dataFiltersb.tipodictamenes === '';
  }

  private validateSubDictamen(): boolean {
    return this.subDictActivate && !(this.dataFiltersb.tipodictamenes === undefined || this.dataFiltersb.tipodictamenes === '' ) && (this.dataFiltersb.tipoempresas === undefined || this.dataFiltersb.tipoempresas === '' || this.dataFiltersb.tipoempresas === '0');
  }


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
   
    } else if (typeof (FileReader) !== 'undefined') {
      
      const reader = new FileReader();
      reader.readAsDataURL(this.filePDF);
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        this.nuevoDocumentoObj();
      };
      
      reader.readAsArrayBuffer($file.files[0]);
    }

  }

  nuevoDocumentoObj() {

    this.pdffile = this.createId();
    const base64result = this.pdfSrc.split(',')[1];
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    let data = {
                    "nombreDocumento": this.filename,
                    "docBase64": base64result,
                    "bucUsuario": this.dataFiltersb.buc,
                    "idFilenet": "",
                    "idTipoDocumento": this.iddoc,
                    "denRazSoc": this.razonSocial,
                    "rfc": this.datorfc,
                    "solicitante": this.uid,
                    "ipClient": this.ipClient,
                    "usrRed": this.usrRed,
                    "conn": "",
                }

    this._dictamenes.upDocFileNet( data )
        .subscribe((resp:any) => {

        this.idFilenet = resp.data.message;
        
        this.arrayFiles.push({  "idTipoDocumento": this.iddoc,
                                "descripcionTipoDocumento": this.dataFiltersb.tipodocumento,
                                "nombreDocumento": this.filename,
                                "idFilenet": this.idFilenet,
                                "bucUsuario": this.buc,
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

  countdocs() {

    let getoblig: any[] = [];

    this.upldfiles = this.arrayFiles.length;
    this.tipodocumento.forEach(function(obl) {
      getoblig.push({'tipoDocumento': obl.descDocumento, 'obligatorio': obl.obligatorio});
    });
    this.totaldocs = getoblig.reduce((prev: any, curr: any) => {
      return (Number(prev) || 0) + (Number(curr.obligatorio) || 0);
    }, 0);

    const tempgetoblig = getoblig.filter(( oblig: any) => {
      this.arrayFiles.forEach(( obj: any ) => {
        if(oblig.tipoDocumento === obj.descripcionTipoDocumento){
          this.resultArrayFiles.push(oblig);
        }
      })

    });

    let cleanRepeatArrayFiles = this.resultArrayFiles.filter( ( value, index, array) => {
      return array.findIndex(valueArr => JSON.stringify(valueArr) === JSON.stringify(value)) === index;
    });

    this.validatecountdocs = cleanRepeatArrayFiles.reduce((accumulator, obj) => {
      return (Number(accumulator) || 0) + (Number(obj.obligatorio) || 0);
    }, 0);
  }

  validarDocsObligatorios( doc: any ) {

    return !!this.arrayFiles.find(x => x.descripcionTipoDocumento === doc.descDocumento);
    
  }

  getTipoEmp() {
    this.tipoempresa = [];
    const tipoper = this.tipopersona;

    this._catalogos.getTipoEmpresa( this.dataFiltersb.tipodictamenes, tipoper )
        .subscribe( (resp: Tipoempresa[]) => {
          this.subDictActivate = resp.length > 0  ? true : false;
           this.tipoempresa = resp;
        }, (error) => {
          this.subDictActivate = false;
        })

  }

  getTipoDoc() {

    let idtipodict;
    let idtipoemp;

    idtipodict = this.dataFiltersb.tipodictamenes;
    idtipoemp = this.dataFiltersb.tipoempresas;
    const tipoper = this.tipopersona;

    this._catalogos.getDocumentosEmpDict( idtipodict, idtipoemp, tipoper )
        .subscribe( (resp: Tipodoc[]) => {
          this.tipodocumento = resp;
          this.countdocs();
        })
  }

  obtenerRFC() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const data = {
                    "rfc": this.datorfc,
                    "codePosition": this.codePosition,
                    "tipoPersona": this.tipopersona,
                    "usrRed": this.usrRed,
                    "ipClient": this.ipClient,
                    "conn": ""
                  }

    this._catalogos.getRFC( data )
        .subscribe( ( resp:any ) => {
            this.tipopersona = resp.tipoPersona;
            
            this.getTypeDictRFC();
            this.getTipoEmp();
            this.getTipoDoc();
        }, (error) => {
          
          this.displayModalFormErr = true;
          this.messageModalM = `${error.error.errors[0].message}` + ' ' + 'intente de nuevo con otro RFC';
        
          return error;
        });

  }

  getReingresos() {
    this._catalogos.getReing()
        .subscribe( ( resp: any ) => {
          
          this.reingresosData = resp;

          return resp;
        
        })
  }

  getSubReingresos() {
    this._catalogos.getReingreso()
        .subscribe( ( resp: any ) => {
          
          this.subreingresosData = resp;

          return resp;
        
        })
  }

  getTypeDictRFC() {

    const tipop = this.tipopersona;
    this.tipdict = this.foliodata.beanFolio.descTipoDictamen; // en folios antiguos no se podria cambiar
    this._catalogos.getTypeDictRFC( tipop )
        .subscribe( ( resp: Cattipodict[] ) => {
          this.tipodictamen = resp;
        })
  }

  closePoliticasModal() {
    this.displayModalP = false;
    this.selectedPolitics = ['politics'];
  }

  closeModal() {

    this.displayModalM = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/solicitudes']);
    });

  }

    /**
   * Metodo cerrar modal buc
   *
   * @memberof AltafolioComponent
   */
  closeBucModal() {
    this.displayModalBuc = false;
  }

  closeAvisoModal() {
    this.displayModalAd = false;
  }

  closeModalForm() {
    this.displayModalFormErr = false;
  }

  closeModalFormRedirect() {
    this.displayModalFormErrRedirect = false;
    this._router.navigateByUrl('/nva-solicitud' );
  }

  cerrarDialogF() {
    this.pdfSrc = "";
    this.displayModalF = false
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  downloadFileDict() {

    let sanitizedBase: any = '';
    let fileName = 'OperacionesBancarias';

    const basefile = `data:application/pdf;base64,${this.filePDF}`;
    const link = document.createElement("a");
    sanitizedBase = this._sanitizer.sanitize(SecurityContext.HTML, basefile)
    link.href = sanitizedBase
    link.download = `${fileName}.pdf`
    link.click();

  }

  dictaminar() {
    this.displayModalP = true;
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  closeModalError() {
    this.displayModal = false;
  }

  onFinishInstrucc() {

    this._router.navigateByUrl('/nva-solicitud' );
    this.closeModalError();

  }

}
