import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
// Interfaces
import { Apoderados } from '../../../interfaces/apoderados.interface';
import { Datosfedatario } from '../../../interfaces/datosfedatario.interface';
import { Docsdictaminados } from '../../../interfaces/docsdictaminados.interface';
import { Entidades } from '../../../interfaces/entidades.interface';
import { Facultades } from '../../../interfaces/facultades.interface';
import { Municipios } from '../../../interfaces/municipios.interface';
// Servicios
import { CatalogosService } from '../../../servicios/catalogos.service';
import { DictamenesService } from '../../../servicios/dictamenes.service';
import { DictaminacionService } from '../../../servicios/dictaminacion.service';
import { IntervinienteService } from '../../../servicios/intervinientes.service';

@Component({
  selector: 'app-gobeinst',
  templateUrl: './gobeinst.component.html',
  styles: [
  ]
})
export class GobeinstComponent implements OnInit {

  @Output() closeMod = new EventEmitter<any>();

  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;
  //Public
  //Domain acts
  public domainActsCheck: any = false;
  public domainActsExeType: number = -1;
  public domainActsLimit: string = "";
  public domainActsValidity: string = "";
  //Admin acts
  public adminActsCheck: any = false;
  public adminActsExeType: number = -1;
  public adminActsLimit: string = "";
  public adminActsValidity: string = "";
  //Collections
  public collectionCheck: any = false;
  public collectionExeType: number = -1;
  public collectionLimit: string = "";
  public collectionValidity: string = "";
  //Credits titles
  public creditsTitlesCheck: any = false;
  public creditsTitlesExeType: number = -1;
  public creditsTitlesLimit: string = "";
  public creditsTitlesValidity: string = "";
  //Substitution
  public substitutionCheck: any = false;
  public substitutionExeType: number = -1;
  public substitutionLimit: string = "";
  public substitutionValidity: string = "";
  //Special might
  public specialMightCheck: any = false;
  public specialMightExeType: number = -1;
  public specialMightLimit: string = "";
  public specialMightValidity: string = "";

  private _faculties : Array<object> = [];
  private _faculties_back : Array<object> = [];
  private _legislative_back : Array<object> = [];
  private _legislativePowers : Array<object> = [];
  private _indexToDeleteItem! : number;
  private _indexRowEditRepresentative: number = -1;
  private _indexRowDuplicateRepresentative: number = -1;

  private _idLongRepresentativesData: number = -1;

  //Contract signature
  public contractSignatureCheck : any = false;
  public contractSignatureLimit : any = "";
  public contractSignatureValidity : string = "";
  //Contract cancellation
  public contractCancellationCheck : any = false;
  public contractCancellationLimit : any = "";
  public contractCancellationValidity : string = "";
  //Electronic bank signature
  public electronicBankSignatureCheck : any = false;
  public electronicBankSignatureLimit : any = "";
  public electronicBankSignatureValidity : string = "";
  //Phone bank signature
  public phoneBankSignatureCheck : any = false;
  public phoneBankSignatureLimit : any = "";
  public phoneBankSignatureValidity : string = "";
  //Contract subscription
  public contractSubscriptionCheck : any = false;
  public contractSubscriptionLimit : any = "";
  public contractSubscriptionValidity : string = "";
  //Warranty required
  public warrantyRequiredCheck : any = false;
  public warrantyRequiredLimit : any = "";
  public warrantyRequiredValidity : string = "";
  //Transfer request
  public transferRequestCheck : any = false;
  public transferRequestLimit : any = "";
  public transferRequestValidity : string = "";
  //Check request
  public checkRequestCheck : any = false;
  public checkRequestLimit : any = "";
  public checkRequestValidity : string = "";
  //Balance query
  public balanceQueryCheck : any = false;
  public balanceQueryLimit : any = "";
  public balanceQueryValidity : string = "";
  //Movements query
  public movementsQueryCheck : any = false;
  public movementsQueryLimit : any = "";
  public movementsQueryValidity : string = "";
  //Account state request
  public accountStateRequestCheck : any = false;
  public accountStateRequestLimit : any = "";
  public accountStateRequestValidity : string = "";
  //Bank drafts purchase
  public bankDraftsPurchaseCheck : any = false;
  public bankDraftsPurchaseLimit : any = "";
  public bankDraftsPurchaseValidity : string = "";
  //Free checks
  public freeChecksCheck : any = false;
  public freeChecksLimit : any = "";
  public freeChecksValidity : string = "";
  //Get payments
  public getPaymentsCheck : any = false;
  public getPaymentsLimit : any = "";
  public getPaymentsValidity : string = "";
  //Checking Accounts
  public checkingAccountsAuthCheck : any = false;
  public checkingAccountsAuthLimit : any = "";
  public checkingAccountsAuthValidity : string = "";
  //Account opening
  public accountOpeningAuthCheck : any = false;
  public accountOpeningAuthLimit : any = "";
  public accountOpeningAuthValidity : string = "";

  isReady = true;

  dataFiltersb!: any;

  idfolio!: any;

  id!: string;

  idTipoDict!: string;

  idSubDictamen!: string;

  idcliente!: string;

  nombre_razon!: string;

  nombre_corto!: string;

  observaciones!: string;

  arrayFiles: any[] = new Array;

  foliodata!: any;

  origin!: any;

  buc!: string;

  idArchivo!: string;

  nomArchivo!: string;

  poliza!: string;

  actos!: string;

  articulo!: string;

  fchEmisionEscr!: string;

  femaviso!: string;

  insart!: any;

  dropdownvalue!: any;

  tipoejercicio!: any;

  consideraciones!: string;

  registro!: string;

  aviso!: string;

  folioMerc!: string;

  fchInscripcion!: string;

  num_escritura_f!: string;

  fedatario!: string;

  num_escritura_fed!: string;

  nomFedatario!: string;

  numFedatario!: string;

  estados!: string;

  municipio!: string;

  estado!: string;

  numpoliza!: any;

  nombre!: string;

  apPaterno!: string;

  apMaterno!: string;

  rfc!: string;

  cargoSociedad!: string;

  considLegal!: any;

  dateactdom!: string;
  
  dateactadm!: string;

  datepleicob!: string;

  dateotorgtitul!: string;

  dateotredesu!: string;

  datepodesp!: string;

  datesignat!: string

  datecancell!: string

  datebank!: string

  datesignatur!: string

  datesubscript!: string

  datewarranty!: string

  datefransfer!: string

  datecheckreq!: string

  datebalance!: string

  datemovements!: string

  dateaccount!: string

  datebankdraft!: string

  datefreecheck!: string

  datepayments!: string

  datecheckaccount!: string

  dateopening!: string

  faclegis!: Facultades[];

  selectedfaclegis!: Facultades[];

  maxDate: Date = new Date();

  minDate: Date = new Date();

  faclegi!: any;

  displayModalInter: boolean = false;

  displayModalFaclegis: boolean =false;

  displayModalAd: boolean = false;

  messageModalM!: string;

  ejercicio!: any;

  limactdom!: string;

  limactadm!: any;

  limpleicob!: any;

  limotorcred!: any;

  limotrepoes!: any;

  limpodesp!: any;

  limfirma!: any;

  limcanccont!: any;

  limfirmcone!: any;

  limfirmcont!: any;

  limsusc!: any;

  limobligprop!: any;

  limsoltransf!: any;

  limsolcheq!: any;

  limconsal!: any;

  limconsmov!: any;

  limsoledoc!: any;

  limcompragir!: any;

  limcheqgra!: any;

  limrecpag!: any;

  limautregch!: any;

  limautbor!: any;

  capsocid!: string;

  entidadesDatadi!: Entidades[];
  
  municipiosDatadi!: Municipios[];

  entidadesDatafe: Entidades[] = [];
  
  municipiosDatafe: Municipios[] = [];

  recEntNomdi!: any[];

  recMunNomdi!: any[];

  entidaddi!: string;

  nomEntidaddi!: Entidades[];

  nomEntidadfe!: Entidades[];

  municipiodi!: string;

  nomMunicipiodi!: Municipios[]; 

  nomMunicipiofe: Municipios[] = [];

  entidadfe!: string;

  municipiofe!: string;

  dropdocvalue: any[] = [];

  dropdatinscvalue: any[] = [];

  dropfedvalue: any[] = [];

  dropapodvalue: any[] = [];

  dropfacvalue: any[] = [];

  dictNotFound: any;

  displayModalM = false;

  headerModalM!: string;

  ipClient: any;

  usrId: any;


  public docsdictaminados!: Docsdictaminados[];

  public selecteddocsdictaminados!: Docsdictaminados;
  
  public docsdictaminadosvalue: any[] = new Array;

  public documentosValue: any[] = new Array;

  public docsdictaminado: any;


  public datosfeds!: Datosfedatario[];

  public selecteddatosfeds!: Datosfedatario;
  
  public datosfedsvalue: any[] = new Array;

  public datosfed: any;


  public apoderados!: Apoderados[];

  public selectedapoderados!: Apoderados;
  
  public apoderadosvalue: any[] = new Array;

  public apoderado: any;


  public facultades!: Facultades[];

  public selectedfacultades!: Facultades[];

  public facultadessvalue: any[] = new Array;

  public facultad!: any;

  public facultiesSaved!: Array<object>;

  confirmDeleteDictum: boolean = false;

  page: number = 1;

  customers!: string[];

  listdocs!: [];

  totalPages: number = 0;

  submitted: boolean = false;

  confirmDuplicateRepresentative: boolean = false;

  editRepresentativeActive: boolean = false;
  
  rowIndexActive: number = -1;

  rowIndexDocumentosDictaminadosActive: number = -1;

  rowIndexFederatarioActive: number = -1;
  
  clonedDocumentosDictaminados: { [s: string]: Docsdictaminados; } = {};

  clonedDatosFederatario: { [s: string]: Datosfedatario; } = {};

  n_razong = new FormControl(null, [Validators.required]);
  nombre_cortog = new FormControl(null, [Validators.required]);
  observacionesg = new FormControl(null, [Validators.required]);


  constructor( private _router: Router,
               private _confirmation: ConfirmationService,
               private message: MessageService,
               private _dictaminacion: DictaminacionService,
               private _interviniente: IntervinienteService,
               private _dictamenes: DictamenesService,
               private _route: ActivatedRoute,
               private _catalogos: CatalogosService ) {

                this.dataFiltersb = {};

  }

  ngOnInit(): void {

    this.obtenerIdFolio();

    this.insart = [
      {
        "id": 0,
        "nombre": "SI",
      },
      {
        "id": 1,
        "nombre": "NO"
      },
      {
        "id": 2,
        "nombre": "N/A"
      }
    ]

    this.dropdownvalue = [
      {
        "id": 1,
        "nombre": "SI",
      },
      {
        "id": 0,
        "nombre": "NO"
      },
    ]

    this.tipoejercicio = [
      {
        "id": '3',
        "nombre": "Seleccionar",
      },
      {
        "id": '0',
        "nombre": "Individual/Mancomunado",
      },
      {
        "id": '1',
        "nombre": "Individual",
      },
      {
        "id": '2',
        "nombre": "Mancomunado",
      }
    ]

    this.docsdictaminados = [];
    this.docsdictaminado = {};
    this.datosfeds = [];
    this.datosfed = {}
    this.apoderados = [];
    this.apoderado = {};
    this.facultad = {};

  }

  obtenerIdFolio() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const idfolio = this._route.snapshot.paramMap.get( 'folio' );
    this.usrId = localStorage.getItem("uId");
    const session = '';

    this._dictaminacion.getIdxFolio( idfolio, this.usrId, this.ipClient, session )
                       .subscribe( ( resp:any ) => {

                         this.id = resp.beanRespuestaConsulta.beanComplementoRespuesta.id;
                         
                         this.obtenerFolioDictamen();

                       })

  }

  obtenerFolioDictamen() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const idfolio = this.id;
    this.usrId = localStorage.getItem("uId");
    const session = '';

    this._dictaminacion.getFolioDictamen( idfolio, this.usrId, this.ipClient, session )
                       .subscribe( ( resp: any ) => {

                         this.foliodata = resp;
                         this.idcliente = resp.beanBusqueda.idCliente;
                         this.idSubDictamen = resp.beanFolio.idTipoEmpresaFk;
                         this.buc = resp.beanFolio.buc;
                         this.nombre_razon = resp.beanBusqueda.razonSocial;
                         this.idTipoDict = resp.beanFolio.idTipoDictamen;
                         this.getGobeInstLast();
                         this.obtenerDocumentos();
                         this.obtenerEntidadesfe();

                        })

  }

  getGobeInstLast() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrId = localStorage.getItem("uId");

    const dataLast = {

      "idDictamen": this.idTipoDict,
      "tipoSubDict": this.idSubDictamen === "" ? '0' : this.idSubDictamen,
      "razonSocial": this.nombre_razon,
      "idSolicitud": this.id,
      "folio": this.foliodata.beanFolio.folio,
      "buc": this.buc,
      "ip": this.ipClient,
      "usrRed": this.usrId,
      "conn": ""

    }

    this._dictamenes.getLastDict( dataLast )
        .subscribe( resp => {

                      const docsresp = resp.beanDictamenGob;

                      this.nombre_corto = docsresp.nombreCorto;
                      this.observaciones = docsresp.observaciones;
                      this.origin = resp.beanDictamenGob;

                      if( docsresp.beanHistorico.inclRegistro === "0" ) {
                        this.dataFiltersb.registro = 'SI';
                        this.registro = 'SI';
                      } else if( docsresp.beanHistorico.inclRegistro === "1" ) {
                        this.dataFiltersb.registro = "NO";
                        this.registro = 'NO';
                      } else {
                        this.dataFiltersb.registro = "N/A";
                        this.registro = 'N/A';
                      }
            
                      if( docsresp.beanHistorico.darAviso === "1" ) {
                        this.dataFiltersb.aviso = 'SI';
                        this.aviso = 'SI';
                      } else if( docsresp.beanHistorico.darAviso === "0" ) {
                        this.dataFiltersb.aviso = "NO";
                        this.aviso = 'NO';
                      } else {
                        this.dataFiltersb.aviso = undefined;
                        this.aviso = '';
                      }

                      this.femaviso = docsresp.beanHistorico.fechaAviso;
                      this.dataFiltersb.femaviso = docsresp.beanHistorico.fechaAviso;
            
                      const docdic = docsresp.docsDictaminados;
                      const newdocdic = docdic.map(( obj: any ) => ({
                        ...obj,
                        id: this.createId(),
                        idSolicitud: this.id
                      }));
                      newdocdic.forEach( ( item:any ) => {
                        this.docsdictaminado.id = this.createId();
                        this.docsdictaminados.push(item);
                        this.documentosValue.push({
                          "idArchivo": item.idArchivo,
                          "poliza": item.poliza,
                        });
                        this.docsdictaminadosvalue.push({
                          "idArchivo": item.idArchivo,
                          "idSolicitud": item.idSolicitud,
                          "poliza": item.poliza, 
                          "fchEmisionEscr": item.fchEmisionEscr, 
                          "actos": item.actos, 
                          "articulo": item.articulo, 
                          "consideraciones": item.consideraciones
                        });
                      });

                      const fedat = docsresp.fedatarios;
                      const newfedat = fedat.map(( objfedat: any ) => ({
                        ...objfedat,
                        id: this.createId(),
                        idSolicitud: this.id
                      }));
                      newfedat.forEach( ( item:any ) => {
                        this.datosfed.id = this.createId();

                        this.datosfeds.push(item);
                        this.datosfedsvalue.push({
                            "idArchivo": item.idArchivo,
                            "idFedatarioPk": item.idFedatarioPk,
                            "nomFedatario": item.nomFedatario,
                            "numFedatario": item.numFedatario,
                            "estado": item.estado,
                            "municipio": item.municipio
                        });
                      });

                      const apoder = docsresp.apoderadosLeg;
                      const newapoder = apoder.map(( objapoder: any ) => ({
                        ...objapoder,
                        id: this.createId(),
                        idSolicitud: this.id
                      }));
                      newapoder.forEach( ( item:any ) => {

                        this.apoderado.id = this.createId();

                        this._faculties = item.facultades.filter(( obj:any ) => {
                          return obj.selected === 1;
                        });

                        this._legislativePowers = item.facultadesLeg.filter( (objleg:any ) => {
                          return objleg.selected === 1;
                        });

                        this.apoderados.push({
                          "idAux": this._idLongRepresentativesData,
                          "idArchivo": item.idArchivo,
                          "idApoderadoPk": item.idApoderadoPk,
                          "nombre": item.nombre,
                          "apPaterno": item.apPaterno,
                          "apMaterno": item.apMaterno,
                          "rfc": item.rfc,
                          "cargoSociedad": item.cargoSociedad,
                          "considLegal": item.considLegal,
                          "nomArchivo": item.poliza,
                          "facultades": this._faculties,
                          "facultadesLeg": this._legislativePowers,
                          "nombreCompleto": item.nombre + ' ' + item.apPaterno + ' ' + item.apMaterno,
                          "numpoliza": item.idArchivo,
                          "poliza": item.poliza,
                          
                        });

                        this._idLongRepresentativesData++;

                        this.apoderados = [...this.apoderados];

                        this.apoderadosvalue.push({
                          "idArchivo": item.idArchivo,
                          "idApoderadoPk": item.idApoderadoPk,
                          "nombre": item.nombre,
                          "apPaterno": item.apPaterno,
                          "apMaterno": item.apMaterno,
                          "rfc": item.rfc,
                          "cargoSociedad": item.cargoSociedad,
                          "considLegal": item.considLegal,
                          "facultades": item.facultades,
                          "facultadesLeg": item.facultadesLeg
                        });

                    });

    });
  }

  obtenerDocumentos() {
    
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrId = localStorage.getItem("uId");
    const session = "";

    const data = {
                      "folio": this.foliodata.beanFolio.folio,
                      "folioComp": this.foliodata.beanFolio.complemento !== undefined ? this.foliodata.beanFolio.complemento : "",
                      "tipoDict": this.idTipoDict,
                      "tipoSubDict": this.idSubDictamen,
                      "buc": this.buc,
                      "razonSocial": this.nombre_razon,
                      "ipClient": this.ipClient,
                      "usrRed": this.usrId,
                      "conn":""
                  }

    this._interviniente.getDocumentosByFolio( data )
        .subscribe( resp => {

          const respFiles = resp;

          respFiles.forEach( ( item: any ) => {
              this.arrayFiles.push({ "id": item.id, "nombre": item.nombreDocumento });
              this.deleteItemsEquals();
          });

        }, (error) => {
          return error;
        });

  }

  getDataB1( event: any, field: string ) {

    switch ( field ) {
      case 'idArchivo':
        this.docsdictaminado.idArchivo = event.value;
        break;
      case 'poliza':
        this.docsdictaminado.poliza = event;
        break;
      case 'fchEmisionEscr':
        this.fchEmisionEscr = event.replaceAll('-', '/');
        this.docsdictaminado.fchEmisionEscr = event;
        break;
      case 'actosconst':
        this.docsdictaminado.actos = event;
        break;
      case 'articulo':
        this.docsdictaminado.articulo = event.value;
        break;
      case 'consleg':
        this.docsdictaminado.consideraciones = event;
        break;
      case 'registro':
        this.dataFiltersb.registro = event.value;
        break;
      case 'aviso':
        this.dataFiltersb.aviso = event.value;
        break;
      case 'femaviso':
        this.dataFiltersb.femaviso = event;
        break;
      default:
        break;
    }
    
  }

  getDataB2( evnt: any, field: string ) {
    
    switch ( field ) {
      case 'num_escritura_fed':
        this.datosfed.num_escritura_fed = evnt.value;
        break;
      case 'fedat':
        this.datosfed.nomFedatario = evnt;
        break;
      case 'numfedat':
        this.datosfed.numFedatario = evnt;
        break;
      case 'entidadfe':
        this.datosfed.entidadfe = evnt.value;
        this.datosfed.municipiofe = "";
        this.obtenerMunicipiosfe();
        break;
      default:
        break;
    }

  }

  getDataB3( events: any, field: string ) {

    switch ( field ) {
      case 'municipiofe':
        this.datosfed.municipiofe = events.value;
        break;
      case 'numpoliza':
        this.apoderado.numpoliza = events.value;
        break;
      case 'nombreapod':
        this.apoderado.nombre = events;
        break;
      case 'apepatapod':
        this.apoderado.apPaterno = events;
        break;
      case 'apematapod':
        this.apoderado.apMaterno = events;
        break;
      case 'datarfc':
        this.apoderado.rfc = events;
        break;
      case 'cargosoc':
        this.apoderado.cargoSociedad = events;
        break;
      case 'conslegales':
        this.apoderado.considLegal = events;
        break;
      default:
        break;
    }

  }

  getDataB4( evts: any, field: string ) {

    switch ( field ) {
      case 'dateactdom':
        this.facultad.dateactdom = evts;
        break;
      case 'dateactadm':
        this.facultad.dateactadm = evts;
        break;
      case 'datepleicob':
        this.facultad.datepleicob = evts;
        break;
      case 'dateotorgtitul':
        this.facultad.dateotorgtitul = evts;
        break;
      case 'dateotredesu':
        this.facultad.dateotredesu = evts;
        break;
      case 'datepodesp':
        this.facultad.datepodesp = evts;
        break;
      case 'datesignat':
        this.facultad.datesignat = evts;
        break;
      case 'datecancell':
        this.facultad.datecancell = evts;
        break;
      case 'datebank':
        this.facultad.datebank = evts;
        break;
      default:
        break;
    }

  }

  getDataB5( evento: any, field: string ) {

    switch ( field ) {
      case 'datesignatur':
        this.facultad.datesignatur = evento;
        break;      
      case 'datesubscript':
        this.facultad.datesubscript = evento;
        break;
      case 'datewarranty':
        this.facultad.datewarranty = evento;
        break;
      case 'datefransfer':
        this.facultad.datefransfer = evento;
        break;
      case 'datecheckreq':
        this.facultad.datecheckreq = evento;
        break;
      case 'datebalance':
        this.facultad.datebalance = evento;
        break;
      case 'datemovements':
        this.facultad.datemovements = evento;
        break;
      case 'dateaccount':
        this.facultad.dateaccount = evento;
        break;
      case 'datebankdraft':
        this.facultad.datebankdraft = evento;
        break;
      default:
        break;
    }

  }

  getDataB6( event: any, field: string) {

    switch ( field ) {
      case 'datefreecheck':
        this.facultad.datefreecheck = event;
        break;
      case 'datepayments':
        this.facultad.datepayments = event;
        break;
      case 'datecheckaccount':
        this.facultad.datecheckaccount = event;
        break;
      case 'dateopening':
        this.facultad.dateopening = event;
        break;
      default:
        break;
    }

  }

  guardarDocsDict() {

    let insArt: any;

    this.docsdictaminado.id = this.createId();
    this.docsdictaminados.push(this.docsdictaminado);
    this.docsdictaminados = [...this.docsdictaminados];

    if( this.docsdictaminado.idArchivo === undefined ) {
      this.docsdictaminado.idArchivo = "";
    }

    if( this.docsdictaminado.poliza === undefined ) {
      this.docsdictaminado.poliza = "";
    }

    if( this.docsdictaminado.fchEmisionEscr === undefined ) {
      this.docsdictaminado.fchEmisionEscr = "";
    }

    if( this.docsdictaminado.actos === undefined ) {
      this.docsdictaminado.actos = "";
    }

    if( this.docsdictaminado.articulo === undefined ) {
      this.docsdictaminado.articulo = "";
    }

    if( this.docsdictaminado.consideraciones === undefined ) {
      this.docsdictaminado.consideraciones = "";
    }

    this.dropdocvalue.push(this.docsdictaminado.idArchivo);
    this.dropdocvalue.push(this.docsdictaminado.poliza);
    this.dropdocvalue.push(this.docsdictaminado.fchEmisionEscr);
    this.dropdocvalue.push(this.docsdictaminado.actos);
    this.dropdocvalue.push(this.docsdictaminado.articulo);
    this.dropdocvalue.push(this.docsdictaminado.consideraciones);

    this.docsdictaminadosvalue.push( { 
                                        "idArchivo": this.docsdictaminado.idArchivo, 
                                        "poliza": this.docsdictaminado.poliza, 
                                        "fchEmisionEscr": this.docsdictaminado.fchEmisionEscr, 
                                        "actos": this.docsdictaminado.actos, 
                                        "articulo": this.docsdictaminado.articulo, 
                                        "consideraciones": this.docsdictaminado.consideraciones
                                    });

    const idDoc = this.arrayFiles.filter(( obj:any ) => {
      return obj.id === this.docsdictaminado.idArchivo;
    });

    idDoc.forEach( ( item:any ) => {
      this.docsdictaminado.nomArchivo = item.nombre;

      this.documentosValue.push({
                                    "idArchivo": item.id,
                                    "poliza": this.docsdictaminado.poliza,
                                });
    });

    if ( this.docsdictaminado.articulo === 'SI' ) {
      insArt = "0";
    } else if( this.docsdictaminado.articulo === 'NO' ) {
      insArt = "1";
    } else {
      insArt = "2";
    }

    this.removeItemList(this.arrayFiles, this.idArchivo);
    
    this.docsdictaminado = {};
    this.dropdocvalue = [];

    this.idArchivo = "";
    this.nomArchivo = "";
    this.poliza = "";
    this.fchEmisionEscr = "";
    this.actos = "";
    this.articulo = "";
    this.consideraciones = "";

    this.docsdictaminado.nomArchivo = "";
    this.docsdictaminado.poliza = "";
    this.docsdictaminado.fchEmisionEscr = "";
    this.docsdictaminado.actos = "";
    this.docsdictaminado.articulo = "";
    this.docsdictaminado.consideraciones = "";

  }

  eliminarDocsDict( rowIndex: any ) {

    if ((this.datosfeds && this.datosfeds.find(item => item.poliza === this.docsdictaminados[rowIndex].poliza)) ||
        (this.apoderados && this.apoderados.find(item => item.poliza === this.docsdictaminados[rowIndex].poliza))) {
          this._indexToDeleteItem = rowIndex;
          this.confirmDeleteDictum = true; 
    } else {
      this.addItemList(this.arrayFiles, { id: this.docsdictaminados[rowIndex].idArchivo, nombre: this.docsdictaminados[rowIndex].nomArchivo});
      this.docsdictaminados.splice(rowIndex, 1);
      this.docsdictaminadosvalue.splice(rowIndex, 1);
      this.documentosValue.splice(rowIndex, 1);
    }

  }

  guardarFedatario() {

    this.datosfed.id = this.createId();
    this.datosfeds.push(this.datosfed);
    this.datosfeds = [...this.datosfeds];

    if( this.datosfed.num_escritura_fed === undefined ) {
      this.datosfed.num_escritura_fed = "";
    }

    if( this.datosfed.nomFedatario === undefined ) {
      this.datosfed.nomFedatario = "";
    }

    if( this.datosfed.numFedatario === undefined ) {
      this.datosfed.numFedatario = "";
    }

    if( this.datosfed.entidadfe === undefined ) {
      this.datosfed.entidadfe = "";
    }

    if( this.datosfed.municipiofe === undefined ) {
      this.datosfed.municipiofe = "";
    }

    this.dropfedvalue.push(this.datosfed.num_escritura_fed);
    this.dropfedvalue.push(this.datosfed.idFedatarioPk);
    this.dropfedvalue.push(this.datosfed.nomFedatario);
    this.dropfedvalue.push(this.datosfed.numFedatario);
    this.dropfedvalue.push(this.datosfed.entidadfe);
    this.dropfedvalue.push(this.datosfed.municipiofe);

    this.datosfedsvalue.push({
                                "idArchivo": this.datosfed.num_escritura_fed,
                                "idFedatarioPk": this.datosfed.idFedatarioPk === undefined ? this.datosfed.idFedatarioPk = "" : this.datosfed.idFedatarioPk,
                                "nomFedatario": this.datosfed.nomFedatario,
                                "numFedatario": this.datosfed.numFedatario,
                                "estado": this.datosfed.entidadfe,
                                "municipio": this.datosfed.municipiofe
                            });

    const idFed = this.documentosValue.filter(( obj:any ) => {
      return obj.idArchivo === this.datosfed.num_escritura_fed;
    });

    idFed.forEach( ( item:any ) => {
      this.datosfed.poliza = item.poliza;
    });

    this.nomMunicipiofe = this.municipiosDatafe.filter(( entid: any )  => {
      return entid.idMunicipio === this.datosfed.municipiofe;
    });

    this.nomEntidadfe = this.entidadesDatafe.filter(( munic: any ) => {
      return munic.idEntidadFed === this.datosfed.entidadfe;
    });

    this.datosfed.municipioNombre = this.nomMunicipiofe[0]?.nombre;
    this.datosfed.estadoNombre = this.nomEntidadfe[0]?.nombre;

    this.datosfed = {};
    this.dropfedvalue = [];

    this.num_escritura_fed = "";
    this.nomFedatario = "";
    this.numFedatario = "";
    this.entidadfe = "";
    this.municipiofe = "";

    this.datosfed.num_escritura_fed = "";
    this.datosfed.nomFedatario = "";
    this.datosfed.numFedatario = "";
    this.datosfed.entidadfe = "";
    this.datosfed.municipiofe = "";
    
  }

  eliminarFedatario( rowIndex: any ) {

    this.datosfeds.splice(rowIndex, 1);
    this.datosfedsvalue.splice(rowIndex, 1);

  }

  /**
   * Save faculties to dictamination
   * 
   *
   * @memberof GobeinstComponent
   */
  public saveFaculties() : void {
    this.facultiesSaved = [
      {
        //id: 1,
        tipo: "ACTOS DE DOMINIO",
        selected: this.domActValidate(),
        tipoEj: this.domainActsExeType,
        limit: this.domainActsLimit,
        vig: this.facultad.dateactdom === undefined ? this.domainActsValidity  : this.facultad.dateactdom
      },
      {
        //id: 2,
        tipo: "ACTOS DE ADMINISTRACIÓN",
        selected: this.actAdmValidate(),
        tipoEj: this.adminActsExeType,
        limit: this.adminActsLimit,
        vig: this.facultad.dateactadm === undefined ? this.adminActsValidity : this.facultad.dateactadm
      },
      {
        //id: 3,
        tipo: "PLEITOS Y COBRANZAS",
        selected: this.pleyCobValidate(),
        tipoEj: this.collectionExeType,
        limit: this.collectionLimit,
        vig: this.facultad.datepleicob === undefined ? this.collectionValidity : this.facultad.datepleicob
      },
      {
        //id: 4,
        tipo: "OTORGAMIENTO Y SUSCRIPCIÓN DE TÍTULOS DE CRÉDITO",
        selected: this.otoTituCredValidate(),
        tipoEj: this.creditsTitlesExeType,
        limit: this.creditsTitlesLimit,
        vig: this.facultad.dateotorgtitul === undefined ? this.creditsTitlesValidity : this.facultad.dateotorgtitul
      },
      {
        //id: 5,
        tipo: "OTORGAMIENTO, REVOCACIÓN, DELEGACIÓN Y SUSTITUCIÓN DE PODERES",
        selected: this.otoDelSusValidate(),
        tipoEj: this.substitutionExeType,
        limit: this.substitutionLimit,
        vig: this.facultad.dateotredesu === undefined ? this.substitutionValidity : this.facultad.dateotredesu
      },
      {
        //id: 6,
        tipo: "PODERES ESPECIALES",
        selected: this.podEspValidate(),
        tipoEj: this.specialMightExeType,
        limit: this.specialMightLimit,
        vig: this.facultad.datepodesp === undefined ? this.specialMightValidity : this.facultad.datepodesp
      }
    ];
    this._faculties = this.facultiesSaved.filter((item:any)=>{return item.selected});
    this._faculties_back = this.facultiesSaved;
    const ifIsCheck = this._faculties.find((item : any) => {
      return item.selected && item.exeType === -1
    });
    if(ifIsCheck === undefined) {
      this.closeInterModal();
      //this._reInitFacultiesValues();
    }

  }

  domActValidate() {
    if( this.domainActsCheck === true ) {
      return this.domainActsCheck = 1;
    } else {
      return this.domainActsCheck = 0;
    }
  }

  actAdmValidate() {
    if( this.adminActsCheck === true ) {
      return this.adminActsCheck = 1;
    } else {
      return this.adminActsCheck = 0;
    }
  }

  pleyCobValidate() {
    if( this.collectionCheck === true ) {
      return this.collectionCheck = 1;
    } else {
      return this.collectionCheck = 0;
    }
  }

  otoTituCredValidate() {
    if( this.creditsTitlesCheck === true ) {
      return this.creditsTitlesCheck = 1;
    } else {
      return this.creditsTitlesCheck = 0;
    }
  }

  otoDelSusValidate() {
    if( this.substitutionCheck === true ) {
      return this.substitutionCheck = 1;
    } else {
      return this.substitutionCheck = 0;
    }
  }

  podEspValidate() {
    if( this.specialMightCheck === true ) {
      return this.specialMightCheck = 1;
    } else {
      return this.specialMightCheck = 0;
    }
  }

  /**
   * Save legislative powers values
   *
   * @memberof GobeinstComponent
   */
  public saveLegislativePowers() : void {

    const legislativePowersSaved : Array<object> = [
      {
        descFacLeg: "Firma de contratos (recibo y servicios)",
        selected: this.contractSignatureCheck === true,
        limit: this.contractSignatureLimit,
        vig: this.facultad.datesignat,
      },
      {
        descFacLeg: "Cancelacion de contratos",
        selected: this.contractCancellationCheck === true,
        limit: this.contractCancellationLimit,
        vig: this.facultad.datecancell,
      },
      {
        descFacLeg: "Firma de contratos de banca electronica",
        selected: this.electronicBankSignatureCheck === true,
        limit: this.electronicBankSignatureLimit,
        vig: this.facultad.datebank,
      },
      {
        descFacLeg: "Firma de contratos de banca telefonica",
        selected: this.phoneBankSignatureCheck === true,
        limit: this.phoneBankSignatureLimit,
        vig: this.facultad.datesignatur,
      },
      {
        descFacLeg: "Suscripcion de contratos de prestacion de servicios financieros",
        selected: this.contractSubscriptionCheck === true,
        limit: this.contractSubscriptionLimit,
        vig: this.facultad.datesubscript,
      },
      {
        descFacLeg: "Obligaciones propias de garantia",
        selected: this.warrantyRequiredCheck === true,
        limit: this.warrantyRequiredLimit,
        vig: this.facultad.datewarranty,
      },
      {
        descFacLeg: "Solicitar transferencias",
        selected: this.transferRequestCheck === true,
        limit: this.transferRequestLimit,
        vig: this.facultad.datefransfer,
      },
      {
        descFacLeg: "Solicitud de cheques",
        selected: this.checkRequestCheck === true,
        limit: this.checkRequestLimit,
        vig: this.facultad.datecheckreq,
      },
      {
        descFacLeg: "Consultar saldos",
        selected: this.balanceQueryCheck === true,
        limit: this.balanceQueryLimit,
        vig: this.facultad.datebalance,
      },
      {
        descFacLeg: "Consultar movimientos",
        selected: this.movementsQueryCheck === true,
        limit: this.movementsQueryLimit,
        vig: this.facultad.datemovements,
      },
      {
        descFacLeg: "Solicitud de estados de cuenta",
        selected: this.accountStateRequestCheck === true,
        limit: this.accountStateRequestLimit,
        vig: this.facultad.dateaccount,
      },
      {
        descFacLeg: "Compra giros bancarios, certificados y cheques en efectivo",
        selected: this.bankDraftsPurchaseCheck === true,
        limit: this.bankDraftsPurchaseLimit,
        vig: this.facultad.datebankdraft,
      },
      {
        descFacLeg: "Cheques gratis",
        selected: this.freeChecksCheck === true,
        limit: this.freeChecksLimit,
        vig: this.facultad.datefreecheck,
      },
      {
        descFacLeg: "Recibir pagos",
        selected: this.getPaymentsCheck === true,
        limit: this.getPaymentsLimit,
        vig: this.facultad.datepayments,
      },
      {
        descFacLeg: "Autorizar registro de terceros en cuentas de cheques",
        selected: this.checkingAccountsAuthCheck === true,
        limit: this.checkingAccountsAuthLimit,
        vig: this.facultad.datecheckaccount,
      },
      {
        descFacLeg: "Autorizar borrados de terceros en cheques y apertura de cuentas",
        selected: this.accountOpeningAuthCheck === true,
        limit: this.accountOpeningAuthLimit,
        vig: this.facultad.dateopening,
      }
    ];

    this._legislativePowers = legislativePowersSaved.filter((item:any)=>{return item.selected});

    let selectedtrue = {selected: true, check: 1};
    let selectedfalse = {selected: false, check: 0};
    
    legislativePowersSaved.forEach( ( item:any ) => {
          if( item.selected === selectedtrue.selected) {
            item.selected = selectedtrue.check
          } else {
            item.selected = selectedfalse.check
          }
    });

    this._legislative_back = legislativePowersSaved;

    const ifIsCheckleg = this._legislativePowers.find((item : any) => {
      return item.selected && item.exeType === -1
    });
    if(ifIsCheckleg === undefined) {
      //this._reInitLegislativePowers();
      this.closeFaclegModalFacleg();
    }

  }

  contSignatureValidate() {
    if(this.contractSignatureCheck === true) {
      return this.contractSignatureCheck = 1;
    } else {
      return this.contractSignatureCheck = 0;
    }
  }

  contCancelValidate() {
    if(this.contractCancellationCheck === true) {
      return this.contractCancellationCheck = 1;
    } else {
      return this.contractCancellationCheck = 0;
    }
  }

  electronicBankValidate() {
    if(this.electronicBankSignatureCheck === true) {
      return this.electronicBankSignatureCheck = 1;
    } else {
      return this.electronicBankSignatureCheck = 0;
    }
  }

  phoneBankValidate() {
    if(this.phoneBankSignatureCheck === true) {
      return this.phoneBankSignatureCheck = 1;
    } else {
      return this.phoneBankSignatureCheck = 0;
    }
  }

  contractSubscriptionValidate() {
    if(this.contractSubscriptionCheck === true) {
      return this.contractSubscriptionCheck = 1;
    } else {
      return this.contractSubscriptionCheck = 0;
    }
  }

  warrantyValidate() {
    if(this.warrantyRequiredCheck === true) {
      return this.warrantyRequiredCheck = 1;
    } else {
      return this.warrantyRequiredCheck = 0;
    }
  }

  tranferRequestValidate() {
    if(this.transferRequestCheck === true) {
      return this.transferRequestCheck = 1;
    } else {
      return this.transferRequestCheck = 0;
    }
  }

  checkRequestValidate() {
    if(this.checkRequestCheck === true) {
      return this.checkRequestCheck = 1;
    } else {
      return this.checkRequestCheck = 0;
    }
  }

  balanceQueryValidate() {
    if(this.balanceQueryCheck === true) {
      return this.balanceQueryCheck = 1;
    } else {
      return this.balanceQueryCheck = 0;
    }
  }

  movementsQueryValidate() {
    if(this.movementsQueryCheck === true) {
      return this.movementsQueryCheck = 1;
    } else {
      return this.movementsQueryCheck = 0;
    }
  }

  accountSatateValidate() {
    if(this.accountStateRequestCheck === true) {
      return this.accountStateRequestCheck = 1;
    } else {
      return this.accountStateRequestCheck = 0;
    }
  }

  bankDraftsValidate() {
    if(this.bankDraftsPurchaseCheck === true) {
      return this.bankDraftsPurchaseCheck = 1;
    } else {
      return this.bankDraftsPurchaseCheck = 0;
    }
  }

  freeCheckValidate() {
    if(this.freeChecksCheck === true) {
      return this.freeChecksCheck = 1;
    } else {
      return this.freeChecksCheck = 0;
    }
  }

  getPaymentsValidate() {
    if(this.getPaymentsCheck === true) {
      return this.getPaymentsCheck = 1;
    } else {
      return this.getPaymentsCheck = 0;
    }
  }

  checkingAccountsValidate() {
    if(this.checkingAccountsAuthCheck === true) {
      return this.checkingAccountsAuthCheck = 1;
    } else {
      return this.checkingAccountsAuthCheck = 0;
    }
  }

  accountOpeningValidate() {
    if(this.accountOpeningAuthCheck === true) {
      return this.accountOpeningAuthCheck = 1;
    } else {
      return this.accountOpeningAuthCheck = 0;
    }
  }

  authBorrValidate() {
    if( this.accountOpeningAuthCheck === true ) {
      this.accountOpeningAuthCheck = 1;
    } else {
      this.accountOpeningAuthCheck = 0;
    }
  }
  /**
   * Clear data from legislative powers
   *
   * @private
   * @memberof GobeinstComponent
   */
  private _reInitLegislativePowers() : void {
    this.contractSignatureCheck = false;
    this.contractSignatureLimit = "";
    this.contractSignatureValidity = "";

    this.contractCancellationCheck = false;
    this.contractCancellationLimit = "";
    this.contractCancellationValidity = "";

    this.electronicBankSignatureCheck = false;
    this.electronicBankSignatureLimit = "";
    this.electronicBankSignatureValidity = "";

    this.phoneBankSignatureCheck = false;
    this.phoneBankSignatureLimit = "";
    this.phoneBankSignatureValidity = "";

    this.contractSubscriptionCheck = false;
    this.contractSubscriptionLimit = "";
    this.contractSubscriptionValidity = "";

    this.warrantyRequiredCheck = false;
    this.warrantyRequiredLimit = "";
    this.warrantyRequiredValidity = "";

    this.transferRequestCheck = false;
    this.transferRequestLimit = "";
    this.transferRequestValidity = "";

    this.checkRequestCheck = false;
    this.checkRequestLimit = "";
    this.checkRequestValidity = "";

    this.balanceQueryCheck = false;
    this.balanceQueryLimit = "";
    this.balanceQueryValidity = "";

    this.movementsQueryCheck = false;
    this.movementsQueryLimit = "";
    this.movementsQueryValidity = "";

    this.accountStateRequestCheck = false;
    this.accountStateRequestLimit = "";
    this.accountStateRequestValidity = "";

    this.bankDraftsPurchaseCheck = false;
    this.bankDraftsPurchaseLimit = "";
    this.bankDraftsPurchaseValidity = "";

    this.freeChecksCheck = false;
    this.freeChecksLimit = "";
    this.freeChecksValidity = "";

    this.getPaymentsCheck = false;
    this.getPaymentsLimit = "";
    this.getPaymentsValidity = "";

    this.checkingAccountsAuthCheck = false;
    this.checkingAccountsAuthLimit = "";
    this.checkingAccountsAuthValidity = "";

    this.accountOpeningAuthCheck = false;
    this.accountOpeningAuthLimit = "";
    this.accountOpeningAuthValidity = "";
  }

  /**
   * Verify if excercise type has value
   *
   * @param {boolean} check
   * @return {*}  {boolean}
   * @memberof GobeinstComponent
   */
  public checkIsRequired(check : boolean, exeType : number) : boolean {

    return check && exeType === -1 ? true : false;
  }

  public checkIsRequiredInput(check : boolean, exeType : any) : boolean {

    return check && exeType === "" ? true : false;
  }

  /**
   * Set the type of exercise according index given
   *
   * @param {number} exeTypeIndex
   * @return {*}  {string}
   * @memberof GobeinstComponent
   */
  public getExeType(exeTypeIndex: any) : string {

    let exeTypeLabel : string = "";
    switch (exeTypeIndex) {
      case '0':
        exeTypeLabel = "Individual/Mancomunado";
        break;
      case '1':
        exeTypeLabel = "Individual";
        break;
      case '2':
        exeTypeLabel = "Mancomunado";
        break;
      case '3':
        exeTypeLabel = "";
        break;
      default:
        break;
    }
    return exeTypeLabel;
  }

  /**
   * Replace for N/A if string is empty
   *
   * @param {string} facultyValue
   * @return {*}  {string}
   * @memberof GobeinstComponent
   */
  public checkIsEmpty(facultyValue: string) : string {
    return facultyValue === "" ? "N/A": facultyValue;
  }

  /**
   * Delete proxie's data when button is cliced
   *
   * @param {number} indexToDelete
   * @memberof GobeinstComponent
   */
  public deleteFaculty(indexToDelete:number) : void {

    this.apoderados = this.apoderados.filter((item,index)=>{

      return index !== indexToDelete
      
    });

    this.apoderadosvalue = this.apoderadosvalue.filter((item,index) =>{
      return index !== indexToDelete
    });
  
  }

  eliminarApoderado( rowIndex: any ) {
    this.apoderadosvalue.splice(rowIndex, 1);
    this.apoderados.splice(rowIndex, 1);
  }

  /**
   * Set values with the init faculties values
   *
   * @private
   * @memberof GobeinstComponent
   */
  private _reInitFacultiesValues() : void {
    //Domain acts
    this.domainActsCheck = false;
    this.domainActsExeType = -1;
    this.domainActsLimit = "";
    this.domainActsValidity = "";
    this.facultad.dateactdom = "";
    //Admin acts
    this.adminActsCheck = false;
    this.adminActsExeType = -1;
    this.adminActsLimit = "";
    this.adminActsValidity = "";
    this.facultad.dateactadm = "";
    //Collections
    this.collectionCheck = false;
    this.collectionExeType = -1;
    this.collectionLimit = "";
    this.collectionValidity = "";
    this.facultad.datepleicob = "";
    //Credits titles
    this.creditsTitlesCheck = false;
    this.creditsTitlesExeType = -1;
    this.creditsTitlesLimit = "";
    this.creditsTitlesValidity = "";
    this.facultad.dateotorgtitul = "";
    //Substitution
    this.substitutionCheck = false;
    this.substitutionExeType = -1;
    this.substitutionLimit = "";
    this.substitutionValidity = "";
    this.facultad.dateotredesu = "";
    //Special might
    this.specialMightCheck = false;
    this.specialMightExeType = -1;
    this.specialMightLimit = "";
    this.specialMightValidity = "";
    this.facultad.datepodesp = "";
  }

  guardarApoderado(): void {

    this.saveFaculties();
    this.saveLegislativePowers();

    this.apoderados.forEach(( id:any ) => {
      this._idLongRepresentativesData = id.idAux + 2; 
    })
    setTimeout(() => {
      
      let nombreCompleto = this.apoderado.nombre + ' ' + this.apoderado.apPaterno + ' ' + this.apoderado.apMaterno;

      this.apoderado.idArchivo = this.apoderado.numpoliza;
      this.apoderado.nombreCompleto = nombreCompleto;
      this.apoderado.facultades = this._faculties;
      this.apoderado.idAux = this._idLongRepresentativesData;
      this.apoderado.facultadesLeg = this._legislativePowers
      this.apoderados.push(this.apoderado);
      this.apoderados = [...this.apoderados];

      if( this.apoderado.numpoliza === undefined ) {
        this.apoderado.numpoliza = "";
      }

      if( this.apoderado.nombre === undefined ) {
        this.apoderado.nombre = "";
      }

      if( this.apoderado.apPaterno === undefined ) {
        this.apoderado.apPaterno = "";
      }

      if( this.apoderado.apMaterno === undefined ) {
        this.apoderado.apMaterno = "";
      }

      if( this.apoderado.rfc === undefined ) {
        this.apoderado.rfc = "";
      }

      if( this.apoderado.cargoSociedad === undefined ) {
        this.apoderado.cargoSociedad = "";
      }

      if( this.apoderado.considLegal === undefined ) {
        this.apoderado.considLegal = "";
      }

      this.dropapodvalue.push(this.apoderado.numpoliza);
      this.dropapodvalue.push(this.apoderado.idApoderadoPk);
      this.dropapodvalue.push(this.apoderado.nombre);
      this.dropapodvalue.push(this.apoderado.apPaterno);
      this.dropapodvalue.push(this.apoderado.apMaterno);
      this.dropapodvalue.push(this.apoderado.rfc);
      this.dropapodvalue.push(this.apoderado.cargoSociedad);
      this.dropapodvalue.push(this.apoderado.considLegal);
      this.dropapodvalue.push(this.apoderado.nombreCompleto);

      this.apoderadosvalue.push({
                                  "idArchivo": this.apoderado.numpoliza,
                                  "idApoderadoPk": this.apoderado.idApoderadoPk === undefined ? this.apoderado.idApoderadoPk = "" : this.apoderado.idApoderadoPk,
                                  "nombre": this.apoderado.nombre,
                                  "apPaterno": this.apoderado.apPaterno,
                                  "apMaterno": this.apoderado.apMaterno,
                                  "rfc": this.apoderado.rfc,
                                  "cargoSociedad": this.apoderado.cargoSociedad,
                                  "considLegal": this.apoderado.considLegal,
                                  "nombreCompleto": this.apoderado.nombreCompleto,
                                  "facultades": this._faculties_back,
                                  "facultadesLeg": this._legislative_back
                              });

      const idApo = this.documentosValue.filter(( obj:any ) => {
        return obj.idArchivo === this.apoderado.numpoliza;
      });

      idApo.forEach( ( item:any ) => {
        this.apoderado.poliza = item.poliza;
      });

      this._faculties = [];
      this._legislativePowers = [];
      this.apoderado = {};
      this.dropapodvalue = [];

      this.numpoliza = "";
      this.nombre = "";
      this.apPaterno = "";
      this.apMaterno = "";
      this.rfc = "";
      this.cargoSociedad = "";
      this.considLegal = "";

      this.apoderado.numpoliza = "";
      this.apoderado.nombre = "";
      this.apoderado.apPaterno = "";
      this.apoderado.apMaterno = "";
      this.apoderado.rfc = "";
      this.apoderado.cargoSociedad = "";
      this.apoderado.considLegal = "";
      this._idLongRepresentativesData++;

      this._reInitFacultiesValues();
      this._reInitLegislativePowers();
    }, 200);

  }

  findIndexById(id: any): number {
    let index = -1;
    for (let i = 0; i < this.facultades.length; i++) {
        if (this.facultades[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  guardarDictamen() {

    let registro;
    let aviso;
    const localip = localStorage.getItem("ipC");

    this.idfolio = this._route.snapshot.paramMap.get( 'folio' );
    this.ipClient = localip;

    if ( this.dataFiltersb.registro === 'SI' ) {
      registro = 0;
    } else if( this.dataFiltersb.registro === 'NO' ) {
      registro = 1;
    } else if( this.dataFiltersb.registro === 'N/A' ){
      registro = 2;
    } else {
      registro = "";
    }

    if ( this.dataFiltersb.aviso === 'SI' ) {
      aviso = 1;
    } else if( this.dataFiltersb.aviso === 'NO' ) {
      aviso = 0;
    } else {
      aviso = undefined;
    }
        
    const data = {
                    "data": {
                            "idSolicitud": this.id,
                            "idCliente": this.idcliente,
                            "nombreRazon": this.nombre_razon,
                            "nombreCorto": this.nombre_corto,
                            "observaciones": this.observaciones,
                            "beanHistorico": {
                                "inclRegistro": registro,
                                "darAviso": aviso,
                                "fechaAviso": this.dataFiltersb.femaviso
                                },
                            "docsDictaminados": this.docsdictaminadosvalue,
                            "fedatarios": this.datosfedsvalue,
                            "apoderadosLeg": this.apoderadosvalue
                            },
                            "origin": this.origin,
                            "ipClient": this.ipClient,
                            "usrRed": "",
                            "conn": ""
                }

    this._dictamenes.insupdGobInst ( data )
        .subscribe( resp => {

          this.displayModalAd = true;
          this.messageModalM = 'Sus cambios fueron guardados en el folio' + " " + this.idfolio + "  " + 'con éxito';

        }, (errors) => {
          this.displayModalM = true;
          this.messageModalM = errors.error.errors[0].message;
        });

  }

  createId(): string {

    let id = '';
    let chars = '0123456789';
    for ( let i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  
  }

  obtenerEntidadesfe() {

    this._catalogos.getEntidades()
          .subscribe( ( resp: any ) => {
            this.entidadesDatafe = resp;
          })
    
  }

  obtenerMunicipiosfe() {

    this._catalogos.getMunicipios( this.datosfed.entidadfe )
        .subscribe( ( resp: any ) => {
          this.municipiosDatafe = resp;
        })

  }

  private addItemList(list: any[], value: { id: string | undefined, nombre: string | undefined }): void {
    list.push(value);
  }

  private removeItemList(list: any[], value: string): void {
    const findIndex = list.findIndex(item => item.id === value);
    if (findIndex !== -1) { list.splice(findIndex, 1); }  
  }

  acceptDeleteFile(): void {
    if ((this.datosfeds && this.datosfeds.find(item => item.poliza === this.docsdictaminados[this._indexToDeleteItem].poliza))) {
      this.datosfeds = this.datosfeds.filter(item => item.poliza !== this.docsdictaminados[this._indexToDeleteItem].poliza);
      this.datosfedsvalue = this.datosfedsvalue.filter(item => item.idArchivo !== this.docsdictaminados[this._indexToDeleteItem].idArchivo);
    }

    if ((this.apoderados && this.apoderados.find(item => item.poliza === this.docsdictaminados[this._indexToDeleteItem].poliza))) {
      this.apoderados = this.apoderados.filter(item => item.poliza !== this.docsdictaminados[this._indexToDeleteItem].poliza);
      this.apoderadosvalue = this.apoderadosvalue.filter(item => item.idArchivo !== this.docsdictaminados[this._indexToDeleteItem].idArchivo);
    }
    this.addItemList(this.arrayFiles, { id: this.docsdictaminados[this._indexToDeleteItem].idArchivo, nombre: this.docsdictaminados[this._indexToDeleteItem].nomArchivo});
    this.docsdictaminados.splice(this._indexToDeleteItem, 1);
    this.docsdictaminadosvalue.splice(this._indexToDeleteItem, 1);
    this.documentosValue.splice(this._indexToDeleteItem, 1);
    this.confirmDeleteDictum = false;
   
  }

  closeDialogDeleteFile(): void {
    this.confirmDeleteDictum = false;
  }

  displayMInter() {
    this.displayModalInter = true;
    this.setDataFaculty(this._faculties);
  }

  displayMFacleg() {
    this.displayModalFaclegis = true;
  }

  closeFaclegModalFacleg() {
    this.displayModalFaclegis = false;
  }

  closeInterModal() {
    this.displayModalInter = false;
  }

  closeAvisoModal() {
    this.displayModalAd = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/dictaminacion/', this._route.snapshot.paramMap.get( 'folio' )]);
    });
  }

    /**
   * Cerrar modal
   *
   * @memberof AltaclienteComponent
   */
  closeModal() {

    this.displayModalM = false;

  }

  tabActive(value: any) {
    switch(value.index) {
      case 1:
        this.deleteItemsEquals();
        break;
      case 3:
        this.cancelUpdateFacultyItem();
        break;
    };
  }

  duplicateItemRepresentative(indexRow: number): void {

    this._indexRowDuplicateRepresentative = indexRow;
    if (this._indexRowDuplicateRepresentative !== -1) {

      this._idLongRepresentativesData++;
      const item: Apoderados = {
        idAux: this._idLongRepresentativesData,
        apPaterno: this.apoderados[this._indexRowDuplicateRepresentative].apPaterno,
        apMaterno: this.apoderados[this._indexRowDuplicateRepresentative].apMaterno,
        cargoSociedad: this.apoderados[this._indexRowDuplicateRepresentative].cargoSociedad,
        considLegal: this.apoderados[this._indexRowDuplicateRepresentative].considLegal,
        facultades: this.apoderados[this._indexRowDuplicateRepresentative].facultades,
        facultadesLeg: this.apoderados[this._indexRowDuplicateRepresentative].facultadesLeg,
        idArchivo: this.apoderados[this._indexRowDuplicateRepresentative].idArchivo,
        nombre: this.apoderados[this._indexRowDuplicateRepresentative].nombre,
        nombreCompleto: this.apoderados[this._indexRowDuplicateRepresentative].nombreCompleto,
        numpoliza: this.apoderados[this._indexRowDuplicateRepresentative].idArchivo,
        poliza: this.apoderados[this._indexRowDuplicateRepresentative].poliza,
        rfc: this.apoderados[this._indexRowDuplicateRepresentative].rfc
      };
      this.apoderados.push(item);
      this.apoderadosvalue.push({
        idArchivo: this.apoderados[this._indexRowDuplicateRepresentative].idArchivo,
        idApoderadoPk: "",
        apPaterno: this.apoderados[this._indexRowDuplicateRepresentative].apPaterno,
        apMaterno: this.apoderados[this._indexRowDuplicateRepresentative].apMaterno,
        cargoSociedad: this.apoderados[this._indexRowDuplicateRepresentative].cargoSociedad,
        considLegal: this.apoderados[this._indexRowDuplicateRepresentative].considLegal,
        facultades: this.apoderadosvalue[this._indexRowDuplicateRepresentative].facultades,
        facultadesLeg: this.apoderadosvalue[this._indexRowDuplicateRepresentative].facultadesLeg,
        nombre: this.apoderados[this._indexRowDuplicateRepresentative].nombre,
        rfc: this.apoderados[this._indexRowDuplicateRepresentative].rfc
      });

      this.confirmDuplicateRepresentative = false;
      this._indexRowDuplicateRepresentative = -1;

    }

  }

  editFaculty(rowIndex: number): void {

    this.editRepresentativeActive = true;
    this._indexRowEditRepresentative = rowIndex;
    if (this.apoderados[rowIndex]) {
      this.idArchivo = String(this.apoderados[rowIndex].numpoliza);
      this.numpoliza = String(this.apoderados[rowIndex].idArchivo);
      this.nombre = String(this.apoderados[rowIndex].nombre);
      this.apPaterno = String(this.apoderados[rowIndex].apPaterno);
      this.apMaterno = String(this.apoderados[rowIndex].apMaterno);
      this.rfc = String(this.apoderados[rowIndex].rfc);
      this.cargoSociedad = String(this.apoderados[rowIndex].cargoSociedad);
      this.considLegal = String(this.apoderados[rowIndex].considLegal);

      this.apoderado.idArchivo = String(this.apoderados[rowIndex].numpoliza);
      this.apoderado.idApoderadoPk = "";
      this.apoderado.numpoliza = String(this.apoderados[rowIndex].numpoliza);
      this.apoderado.poliza = String(this.apoderados[rowIndex].poliza);
      this.apoderado.nombre = String(this.apoderados[rowIndex].nombre);
      this.apoderado.apPaterno = String(this.apoderados[rowIndex].apPaterno);
      this.apoderado.apMaterno = this.apoderados[rowIndex].apMaterno;
      this.apoderado.rfc = this.apoderados[rowIndex].rfc;
      this.apoderado.cargoSociedad = this.apoderados[rowIndex].cargoSociedad;
      this.apoderado.considLegal = this.apoderados[rowIndex].considLegal;
      this.setDataFaculty(this.apoderados[rowIndex].facultades);
      this.setDataFacultyLeg(this.apoderados[rowIndex].facultadesLeg);
      this.setDataFacultyLegNext(this.apoderados[rowIndex].facultadesLeg);
      this.rowIndexActive = rowIndex;
    }

  }

  private setDataFaculty(facultyList: Array<any> | undefined): void {

    if (facultyList && facultyList.length > 0) {
      facultyList.forEach(item => {
        switch (item.tipo) {
          case 'ACTOS DE DOMINIO':
            this.domainActsCheck = this.validateCheck( item.selected );
            this.domainActsExeType = item.tipoEj;
            this.domainActsLimit = item.limit;
            this.domainActsValidity = item.vig;
            this.facultad.dateactdom = item.vig;
            break;
          case 'ACTOS DE ADMINISTRACIÓN':
            this.adminActsCheck = this.validateCheck( item.selected );
            this.adminActsExeType = item.tipoEj;
            this.adminActsLimit = item.limit;
            this.adminActsValidity = item.vig;
            this.facultad.dateactadm = item.vig;
            break;
          case 'PLEITOS Y COBRANZAS':
            this.collectionCheck = this.validateCheck( item.selected );
            this.collectionExeType = item.tipoEj;
            this.collectionLimit = item.limit;
            this.collectionValidity = item.vig;
            this.facultad.datepleicob = item.vig;
            break;
          case 'OTORGAMIENTO Y SUSCRIPCIÓN DE TÍTULOS DE CRÉDITO':
            this.creditsTitlesCheck = this.validateCheck( item.selected );
            this.creditsTitlesExeType = item.tipoEj;
            this.creditsTitlesLimit = item.limit;
            this.creditsTitlesValidity = item.vig;
            this.facultad.dateotorgtitul = item.vig;
            break;
          case 'OTORGAMIENTO, REVOCACIÓN, DELEGACIÓN Y SUSTITUCIÓN DE PODERES':
            this.substitutionCheck = this.validateCheck( item.selected );
            this.substitutionExeType = item.tipoEj;
            this.substitutionLimit = item.limit;
            this.substitutionValidity = item.vig;
            this.facultad.dateotredesu = item.vig;
            break;
          case 'PODERES ESPECIALES':
            this.specialMightCheck = this.validateCheck( item.selected );
            this.specialMightExeType = item.tipoEj;
            this.specialMightLimit = item.limit;
            this.specialMightValidity = item.vig;
            this.facultad.datepodesp = item.vig;
            break;
        };
      });
    }
  }

  private setDataFacultyLeg(facultyLegList: Array<any> | undefined): void {

    if (facultyLegList && facultyLegList.length > 0) {
      facultyLegList.forEach(item => {
        switch (item.descFacLeg) {
          case 'Firma de contratos (recibo y servicios)':
            this.contractSignatureCheck = this.validateCheck(item.selected);
            this.contractSignatureLimit = item.limit;
            this.facultad.datesignat = item.vig;
            this.contractSignatureValidity = item.vig;
            break;
          case 'Cancelacion de contratos':
            this.contractCancellationCheck =this.validateCheck(item.selected);
            this.contractCancellationLimit = item.limit;
            this.facultad.datecancell = item.vig;
            this.contractCancellationValidity = item.vig;
            break;
          case 'Firma de contratos de banca electronica':
            this.electronicBankSignatureCheck = this.validateCheck(item.selected);
            this.electronicBankSignatureLimit = item.limit;
            this.facultad.datebank = item.vig;
            this.electronicBankSignatureValidity = item.vig;
            break;
          case 'Firma de contratos de banca telefonica':
            this.phoneBankSignatureCheck = this.validateCheck(item.selected);
            this.phoneBankSignatureLimit = item.limit;
            this.facultad.datesignatur = item.vig;
            this.phoneBankSignatureValidity = item.vig;
            break;
          case 'Suscripcion de contratos de prestacion de servicios financieros':
            this.contractSubscriptionCheck = this.validateCheck(item.selected);
            this.contractSubscriptionLimit = item.limit;
            this.facultad.datesubscript = item.vig;
            this.contractSubscriptionValidity = item.vig
            break;
          case 'Obligaciones propias de garantia':
            this.warrantyRequiredCheck = this.validateCheck(item.selected);
            this.warrantyRequiredLimit = item.limit;
            this.facultad.datewarranty = item.vig;
            this.warrantyRequiredValidity = item.vig;
            break;
          case 'Solicitar transferencias':
            this.transferRequestCheck = this.validateCheck(item.selected);
            this.transferRequestLimit = item.limit;
            this.facultad.datefransfer = item.vig;
            this.transferRequestValidity = item.vig;
            break;
        }
      });
    }
  }

  private setDataFacultyLegNext(facultyLegList: Array<any> | undefined): void {

    if (facultyLegList && facultyLegList.length > 0) {
      facultyLegList.forEach(item => {
        switch (item.descFacLeg) {
          case 'Solicitud de cheques':
            this.checkRequestCheck = this.validateCheck(item.selected);
            this.checkRequestLimit = item.limit;
            this.facultad.datecheckreq = item.vig;
            this.checkRequestValidity = item.vig;
            break;
          case 'Consultar saldos':
            this.balanceQueryCheck = this.validateCheck(item.selected);
            this.balanceQueryLimit = item.limit;
            this.facultad.datebalance = item.vig;
            this.balanceQueryValidity = item.vig;
            break;
          case 'Consultar movimientos':
            this.movementsQueryCheck = this.validateCheck(item.selected);
            this.movementsQueryLimit = item.limit;
            this.facultad.datemovements = item.vig;
            this.movementsQueryValidity = item.vig;
            break;
          case 'Solicitud de estados de cuenta':
            this.accountStateRequestCheck = this.validateCheck(item.selected);
            this.accountStateRequestLimit = item.limit,
            this.facultad.dateaccount = item.vig; 
            this.accountStateRequestValidity = item.vig;
            break;
          case 'Compra giros bancarios, certificados y cheques en efectivo':
            this.bankDraftsPurchaseCheck = this.validateCheck(item.selected);
            this.bankDraftsPurchaseLimit = item.limit;
            this.facultad.datebankdraft = item.vig;
            this.bankDraftsPurchaseValidity = item.vig;
            break;
          case 'Cheques gratis':
            this.freeChecksCheck = this.validateCheck(item.selected);
            this.freeChecksLimit = item.limit;
            this.facultad.datefreecheck = item.vig;
            this.freeChecksValidity = item.vig;
            break;
          case 'Recibir pagos':
            this.getPaymentsCheck = this.validateCheck(item.selected);
            this.getPaymentsLimit = item.limit;
            this.facultad.datepayments = item.vig;
            this.getPaymentsValidity = item.vig;
            break;
          case 'Autorizar registro de terceros en cuentas de cheques':
            this.checkingAccountsAuthCheck = this.validateCheck(item.selected);
            this.checkingAccountsAuthLimit = item.limit;
            this.facultad.datecheckaccount = item.vig;
            this.checkingAccountsAuthValidity = item.vig;
            break;
          case 'Autorizar borrados de terceros en cheques y apertura de cuentas':
            this.accountOpeningAuthCheck = this.validateCheck(item.selected);
            this.accountOpeningAuthLimit = item.limit;
            this.facultad.dateopening = item.vig;
            this.accountOpeningAuthValidity = item.vig;
            break;
        }
      });
    }
  }


  validateCheck( item: number ): boolean {
    return item === 1 ? true : false;
  }

  updateFacultyItem(): void {

    this.saveFaculties();
    this.saveLegislativePowers();

    setTimeout(() => {
      const nameComplet = this.apoderado.nombre + ' ' + this.apoderado.apPaterno + ' ' + this.apoderado.apMaterno;
      this.apoderado.id = this.createId();
      this.apoderado.nombreCompleto = nameComplet;
      this.apoderado.facultades = this._faculties;

      const idApo = this.documentosValue.filter(( obj:any ) => {
        return obj.idArchivo === this.apoderado.numpoliza;
      });

      idApo.forEach( ( item:any ) => {
        this.apoderado.poliza = item.poliza;
      });
      
      const apoderadoObject = this.apoderados.find((item, index) => index === this._indexRowEditRepresentative);

      if (apoderadoObject) {
        apoderadoObject.idArchivo = this.apoderado.numpoliza;
        apoderadoObject.apMaterno = this.apoderado.apMaterno;
        apoderadoObject.apPaterno = this.apoderado.apPaterno;
        apoderadoObject.cargoSociedad = this.apoderado.cargoSociedad;
        apoderadoObject.considLegal = this.apoderado.considLegal;
        apoderadoObject.nombre = this.apoderado.nombre;
        apoderadoObject.facultades = this._faculties;
        apoderadoObject.nombreCompleto = this.apoderado.nombreCompleto;
        apoderadoObject.rfc = this.apoderado.rfc;
        apoderadoObject.facultadesLeg = this._legislativePowers;
        apoderadoObject.poliza = this.apoderado.poliza;
      }

      const apoderadoValueObject = this.apoderadosvalue.find((item, index) => index === this._indexRowEditRepresentative);
      
      if (apoderadoValueObject) {
        apoderadoValueObject.idArchivo = this.apoderado.numpoliza;
        apoderadoValueObject.idApoderadoPk = this.apoderado.idApoderadoPk;
        apoderadoValueObject.nombre = this.apoderado.nombre;
        apoderadoValueObject.apPaterno = this.apoderado.apPaterno;
        apoderadoValueObject.apMaterno = this.apoderado.apMaterno;
        apoderadoValueObject.rfc = this.apoderado.rfc;
        apoderadoValueObject.cargoSociedad = this.apoderado.cargoSociedad;
        apoderadoValueObject.considLegal = this.apoderado.considLegal;
        apoderadoValueObject.facultades = this._faculties_back;
        apoderadoValueObject.facultadesLeg = this._legislative_back;
      }
      
      this.cancelUpdateFacultyItem();

    }, 200);
  }

  cancelUpdateFacultyItem(): void {
    this.rowIndexActive = -1;
    this.editRepresentativeActive = false;
    this._indexRowEditRepresentative = -1;

    this._faculties = [];
    this.apoderado = {};

    this.numpoliza = "";
    this.nombre = "";
    this.apPaterno = "";
    this.apMaterno = "";
    this.rfc = "";
    this.cargoSociedad = "";
    this.considLegal = "";

    this.apoderado.numpoliza = "";
    this.apoderado.nombre = "";
    this.apoderado.apPaterno = "";
    this.apoderado.apMaterno = "";
    this.apoderado.rfc = "";
    this.apoderado.cargoSociedad = "";
    this.apoderado.considLegal = "";
    this._reInitFacultiesValues();
    this._reInitLegislativePowers();
  }

  onRowEditCancelDocumentosDictaminados(indexRow: number, item: Docsdictaminados): void {
    this.docsdictaminados[indexRow] = this.clonedDocumentosDictaminados[item.id!];
    delete this.clonedDocumentosDictaminados[item.id!];
    this.rowIndexDocumentosDictaminadosActive = -1;
  }

  onRowEditSaveDocumentosDictaminados(indexRow: number, item: Docsdictaminados): void {
    const documentosDictaminadosValue = {
      "idArchivo": item.idArchivo,
      "poliza": item.poliza,
      "fchEmisionEscr": item.fchEmisionEscr,
      "actos": item.actos,
      "articulo": item.articulo,
      "consideraciones": item.consideraciones
    };
    
    this.docsdictaminados.splice(indexRow, 1, item);
    this.docsdictaminadosvalue.splice(indexRow, 1, documentosDictaminadosValue);

    const oldData = this.clonedDocumentosDictaminados[item.id!];

    if (oldData.poliza !== item.poliza) {
      this.documentosValue.forEach(itemDocumentos => {
        if (itemDocumentos.poliza === oldData.poliza) {
          itemDocumentos.poliza = item.poliza;
        }
      });
    }

    this.updateFeds( item );
    this.updateApod( item );

  }

  private updateFeds( item: any ): void {

    const oldData = this.clonedDocumentosDictaminados[item.id!];

    if (this.datosfeds && this.datosfeds.length > 0) {
      this.datosfeds.forEach( itemFedatario => {
        if (itemFedatario.poliza === oldData.poliza) {
          itemFedatario.poliza = item.poliza;
        }
      });
    }

    if (this.datosfedsvalue && this.datosfedsvalue.length > 0) {
      this.datosfedsvalue.forEach( itemFedatarioValue => {
        if (itemFedatarioValue.poliza === oldData.poliza) {
          itemFedatarioValue.poliza = item.poliza;
        }
      });
    }
  }

  private updateApod( item: any ): void {

    const oldData = this.clonedDocumentosDictaminados[item.id!];

    if (this.apoderados && this.apoderados.length > 0) {
      this.apoderados.forEach( itemApoderados => {
        if (itemApoderados.poliza === oldData.poliza) {
          itemApoderados.poliza = item.poliza;
        }
      });
    }

    if (this.apoderadosvalue && this.apoderadosvalue.length > 0) {
      this.apoderadosvalue.forEach( itemApoderadosValue => {
        if (itemApoderadosValue.poliza === oldData.poliza) {
          itemApoderadosValue.poliza = item.poliza;
        }
      });
    }

    delete this.clonedDocumentosDictaminados[item.id!];

  }

  onRowEditInitDocumentosDictamines(indexRow: number, item: Docsdictaminados): void {
    this.rowIndexDocumentosDictaminadosActive = indexRow;
    this.clonedDocumentosDictaminados[item.id!] = { ... item };
  }

  onRowEditCancelFederatario(indexRow: number, item: Datosfedatario): void {

    if(!item.entidadfe) {
      this.datosfed.entidadfe = item.estado;
    } else {
      this.datosfed.entidadfe = item.entidadfe;
    }
    
    if(!item.municipiofe) {
      this.datosfed.municipiofe = item.municipio;
    } else {
      this.datosfed.municipiofe = item.municipiofe;
    }

    this.datosfed.estadoNombre = item.estadoNombre;
    this.datosfed.municipioNombre = item.municipioNombre;

    this.datosfeds[indexRow] = this.clonedDatosFederatario[item.id!];
    delete this.clonedDatosFederatario[item.id!];
    this.rowIndexFederatarioActive = -1;
  }

  onRowEditSaveFederatario(indexRow: number, item: Datosfedatario): void {
    
    this.nomEntidadfe = this.entidadesDatafe.filter(( entid: any ) => {

      return entid.idEntidadFed === this.datosfed.entidadfe;
    });

    this.nomMunicipiofe = this.municipiosDatafe.filter(( munic: any )  => {
      return munic.idMunicipio === this.datosfed.municipiofe;
    });

    item.entidadfe = this.datosfed.entidadfe;
    item.municipiofe = this.datosfed.municipiofe;
    item.estadoNombre = this.nomEntidadfe[0]?.nombre;

    if(this.datosfed.municipiofe === item.municipio) {
      item.municipioNombre = this.datosfed.municipioNombre;
    }else if(this.nomMunicipiofe.length <= 0) {
      item.municipioNombre = '';
    } else {
      item.municipioNombre = this.nomMunicipiofe[0]?.nombre;
    }
    
    const federatarioValue = {
      "idArchivo": item.num_escritura_fed === undefined ? item.idArchivo : item.num_escritura_fed,
      "idFedatarioPk": item.idFedatarioPk,
      "nomFedatario": item.nomFedatario,
      "numFedatario": item.numFedatario,
      "estado": item.entidadfe,
      "municipio": item.municipiofe
    };
    this.datosfeds.splice(indexRow, 1, item);
    this.datosfedsvalue.splice(indexRow, 1, federatarioValue);

    delete this.clonedDatosFederatario[item.id!];
  }

  onRowEditInitFederatario(indexRow: number, item: Datosfedatario): void {
    this.rowIndexFederatarioActive = indexRow;
    this.clonedDatosFederatario[item.id!] = { ... item };

    if(!item.entidadfe) {
      this.datosfed.entidadfe = item.estado;
    } else {
      this.datosfed.entidadfe = item.entidadfe;
    }
    
    if(!item.municipiofe) {
      this.datosfed.municipiofe = item.municipio;
    } else {
      this.datosfed.municipiofe = item.municipiofe;
    }
    
    this.datosfed.estadoNombre = item.estadoNombre;
    this.datosfed.municipioNombre = item.municipioNombre;
    
    this.obtenerMunicipiosfe();
  }

  private deleteItemsEquals(): void {
    if ((this.docsdictaminadosvalue && this.docsdictaminadosvalue.length > 0) && (this.arrayFiles && this.arrayFiles.length > 0)) {
      this.docsdictaminadosvalue.forEach(item => {
        const findIndex = this.arrayFiles.findIndex(file => file.id === item.idArchivo);
        if (findIndex !== -1) { this.arrayFiles.splice(findIndex, 1); }
      });
    }
  }

}
