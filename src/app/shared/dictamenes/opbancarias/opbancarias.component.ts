import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
// Interfaces
import { Apoderados } from '../../../interfaces/apoderados.interface';
import { Datosfedatario } from '../../../interfaces/datosfedatario.interface';
import { Datosinsc } from '../../../interfaces/datosinsc.interface';
import { Docsdictaminados } from 'src/app/interfaces/docsdictaminados.interface';
import { Entidades } from '../../../interfaces/entidades.interface';
import { Facultades } from '../../../interfaces/facultades.interface';
import { Municipios } from '../../../interfaces/municipios.interface';
// Servicios
import { CatalogosService } from '../../../servicios/catalogos.service';
import { DictamenesService } from '../../../servicios/dictamenes.service';
import { DictaminacionService } from '../../../servicios/dictaminacion.service';
import { IntervinienteService } from '../../../servicios/intervinientes.service';
import { ProfileService } from '../../../servicios/profile.service';

@Component({
  selector: 'app-opbancarias',
  templateUrl: './opbancarias.component.html',
  styles: [
  ]
})

export class OpbancariasComponent implements OnInit {

  @Output() closeMod = new EventEmitter<any>();

  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

  public domainActsCheck: any = false;
  public domainActsExeType : number = -1;
  public domainActsLimit : string = "";
  public domainActsValidity : string = "";
  //Admin acts
  public adminActsCheck : any = false;
  public adminActsExeType : number = -1;
  public adminActsLimit : string = "";
  public adminActsValidity : string = "";
  //Collections
  public collectionCheck : any = false;
  public collectionExeType : number = -1;
  public collectionLimit : string = "";
  public collectionValidity : string = "";
  //Credits titles
  public creditsTitlesCheck : any = false;
  public creditsTitlesExeType : number = -1;
  public creditsTitlesLimit : string = "";
  public creditsTitlesValidity : string = "";
  //Substitution
  public substitutionCheck : any = false;
  public substitutionExeType : number = -1;
  public substitutionLimit : string = "";
  public substitutionValidity : string = "";
  //Special might
  public specialMightCheck : any = false;
  public specialMightExeType : number = -1;
  public specialMightLimit : string = "";
  public specialMightValidity : string = "";

  private _faculties : Array<object> = [];
  private _faculties_back : Array<object> = [];
  private _indexToDeleteItem! : number;
  private _indexRowEditRepresentative: number = -1;
  private _indexRowDuplicateRepresentative: number = -1;

  private _idLongRepresentativesData: number = -1;


  closeM: boolean = true;

  nombre_razon!: string;

  idTipoDict!: string;

  info_ref!: string;

  domicilio!: string;

  duracion!: any;

  admin_fac!: any;

  tot_soc!: string;

  otorg_sol!: any;

  otorg_solval!: any;
  
  otor_ava!: any;

  otor_avaval!: any;
  
  otor_gara!: any;

  otor_garaval!: any;
  
  otor_fian!: any;

  otor_fianval!: any;

  fecha_vence!: string;

  objeto!: string;

  fecha_const!: string;

  nacionalidad!: string;

  admext!: string;

  totacciones!: string;

  otorgarse!: any;

  isReady = true;

  persona!: string;

  numeroAcciones!: string;

  valor!: string;

  dataFiltersb!: any;

  idfolio!: any;

  id!: string;

  uid: string = '';

  buc!: string;

  idDictamen!: string;

  idSubDictamen: string = "";

  idcliente!: string;

  nombre_corto!: string;

  observaciones!: string;

  arrayFiles: any[] = new Array;

  respFiles: any[] = new Array;

  rowIndexActive: number = -1;

  rowIndexDocumentosDictaminadosActive: number = -1;

  rowIndexFederatarioActive: number = -1;

  rowIndexDatosJuzActive: number = -1;
  
  clonedDocumentosDictaminados: { [s: string]: Docsdictaminados; } = {};

  clonedDocumentosCapSoc: { [s: string]: Docsdictaminados; } = {};

  clonedDatosFederatario: { [s: string]: Datosfedatario; } = {};

  cloneDatosIns: { [s: string]: Datosinsc; } = {};

  indexActiveEdit: number = -1;

  indexActiveEditCapSoc: number = -1;

  foliodata!: any;

  origin!: any;

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

  nomFedatario!: string;

  num_escritura_fed!: string;

  numFedatario!: string;

  estado!: string;

  numpoliza!: any;

  nombre!: string;

  nombreCompleto!: string;

  apPaterno!: string;

  apMaterno!: string;

  rfc!: string;

  cargoSociedad!: string;

  considLegal!: string;

  consleg!: string;

  dateactdom!: string;
  
  dateactadm!: string;

  datepleicob!: string;

  dateotorgtitul!: string;

  dateotredesu!: string;

  datepodesp!: string

  faclegis!: Facultades[];

  selectedfaclegis!: Facultades[];

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

  page: number = 1;

  customers!: string[];

  listdocs!: [];

  totalPages: number = 0;

  submitted: boolean = false;

  maxDate: Date = new Date();

  minDate: Date = new Date();

  entidadesDatadi!: Entidades[];
  
  municipiosDatadi: Municipios[] = [];

  entidadesDatafe!: Entidades[];
  
  municipiosDatafe: Municipios[] = [];

  recEntNomdi!: any[];

  recMunNomdi!: any[];

  entidaddi!: string;

  nomEntidaddi!: Entidades[];

  nomEntidadfe!: Entidades[];

  municipiodi!: string;

  nomMunicipiodi: Municipios[] = [];

  nomMunicipiofe: Municipios[] = [];

  entidadfe!: string;

  municipiofe!: string;

  dropcapsocvalue: any[] = [];

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


  capitalsociales!: Docsdictaminados[];

  selectedcapitalsociales!: Docsdictaminados;
  
  capitalsocialesvalue: any[] = new Array;

  capitalsocial: any;
  

  docsdictaminados!: Docsdictaminados[];

  selecteddocsdictaminados!: Docsdictaminados;
  
  docsdictaminadosvalue: any[] = new Array;

  documentosValue: any[] = new Array;

  docsdictaminado: any;


  datosinscs!: Datosinsc[];

  selecteddatosinscs!: Datosinsc;
  
  datosinscsvalue: any[] = new Array;

  viewdatosinscvalue: any[] = new Array;

  datosinsc: any;


  datosfeds!: Datosfedatario[];

  selecteddatosfeds!: Datosfedatario;
  
  datosfedsvalue: any[] = new Array;

  datosfed: any;


  apoderados!: Apoderados[];

  selectedapoderados!: Apoderados;
  
  apoderadosvalue: any[] = new Array;

  apoderado: any;


  facultades!: Facultades[];

  selectedfacultades!: Facultades[];

  facultadessvalue: any[] = new Array;

  facultad!: any;

  facultiesSaved!: Array<object>;

  confirmDeleteDictum: boolean = false;

  confirmDuplicateRepresentative: boolean = false;

  editRepresentativeActive: boolean = false;
  
  n_razon = new FormControl(null, [Validators.required]);
  domiciliofc = new FormControl(null, [Validators.required]);
  duracionfc = new FormControl(null, [Validators.required]);
  objetofc = new FormControl(null, [Validators.required]);
  fecha_constfc = new FormControl(['', Validators.required]);
  nacionalidadfc = new FormControl(null, [Validators.required]);
  personafc = new FormControl(null, [Validators.required]);
  numeroAccionesfc = new FormControl(null, [Validators.required]);
  valorfc = new FormControl(null, [Validators.required]);


  constructor( private _router: Router,
               private _route: ActivatedRoute,
               public _profile: ProfileService,
               private _dictaminacion: DictaminacionService,
               private _interviniente: IntervinienteService,
               private _dictamenes: DictamenesService,
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
    this.datosinscs = [];
    this.datosinsc = {};
    this.datosfeds = [];
    this.datosfed = {}
    this.apoderados = [];
    this.apoderado = {};
    this.facultad = {};
    this.otorgarse = {};
    this.capitalsociales = [];
    this.capitalsocial = {};

  }

  /**
   *
   * Obtener de numero de folio
   * @memberof OpbancariasComponent
   */
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

  /**
   *
   * Obtener el folio completo
   * @memberof OpbancariasComponent
   */
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
                          this.idDictamen = resp.beanFolio.idDictamen;
                          this.idSubDictamen = resp.beanFolio.idTipoEmpresaFk;
                          this.buc = resp.beanFolio.buc;
                          this.nombre_razon = resp.beanBusqueda.razonSocial;
                          this.idTipoDict = resp.beanFolio.idTipoDictamen;
                          this.getOpBanLast();
                          this.obtenerDocumentos();
                          this.obtenerEntidadesdi();
                          this.obtenerEntidadesfe();
                        })

  }

  /**
   *
   * Obtener el último dictamen aprobado
   * @memberof OpbancariasComponent
   */
  getOpBanLast() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrId = localStorage.getItem("uId");

                  const dataLast = {

                    "idDictamen": this.idTipoDict,
                    "tipoSubDict": this.idSubDictamen,
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
                        
                            const docsresp = resp.beanDictamenOperBanc;

                            this.info_ref = docsresp.beanBancoGenerales.consRef;
                            this.domicilio = docsresp.beanBancoGenerales.domicilio;
                            this.duracion = docsresp.beanHistorico.duracion;
                            this.admin_fac = docsresp.beanObligaciones.organoAdminFac;
                            this.tot_soc = docsresp.beanObligaciones.totalCapital;
                            this.fecha_vence = docsresp.beanHistorico.vence;
                            this.dataFiltersb.fecha_vence = docsresp.beanHistorico.vence;
                            this.objeto = docsresp.beanObligaciones.objeto;
                            this.fecha_const = docsresp.beanHistorico.fechaConstitucion;
                            this.dataFiltersb.fecha_const = docsresp.beanHistorico.fechaConstitucion;
                            this.nacionalidad = docsresp.beanBancoGenerales.nacionalidad;
                            this.admext = docsresp.beanObligaciones.admExt;
                            this.totacciones = docsresp.beanObligaciones.totalAccion;
                            this.otorg_sol = this.validateCheckBoxGeneralData(docsresp.beanObligaciones.obligarseSolidariamente);
                            this.otor_ava = this.validateCheckBoxGeneralData(docsresp.beanObligaciones.obligarseAvales);
                            this.otor_gara = this.validateCheckBoxGeneralData(docsresp.beanObligaciones.obligarseGarantias);
                            this.otor_fian = this.validateCheckBoxGeneralData(docsresp.beanObligaciones.otorgarFianzas);
                            this.origin = resp.beanDictamenOperBanc;

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
                  
                            if( docsresp.beanHistorico.darAviso === "0" ) {
                              this.dataFiltersb.aviso = 'SI';
                              this.aviso = 'SI';
                            } else if( docsresp.beanHistorico.darAviso === "1" ) {
                              this.dataFiltersb.aviso = "NO";
                              this.aviso = 'NO';
                            } else {
                              this.dataFiltersb.aviso = undefined;
                              this.aviso = '';
                            }

                            this.femaviso = docsresp.beanHistorico.fechaAviso;
                            this.dataFiltersb.femaviso = docsresp.beanHistorico.fechaAviso;

                            const capsoci= docsresp.capitalSocial;
                            const newcapsoci = capsoci.map(( obj: any ) => ({
                                ...obj,
                                id: this.createId(),
                                idSolicitud: this.id
                            }));

                            newcapsoci.forEach( ( item:any ) => {
                              this.capitalsocial.id = this.createId();
                              this.capitalsociales.push(item);
                              this.capitalsocialesvalue.push({
                                "idSolicitud": item.idSolicitud,
                                "persona": item.persona,
                                "numeroAcciones": item.numeroAcciones,
                                "valor": item.valor
                              });
                            });

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
                            //DATOS DE INSCRIPCIÓN
                            const datinsc = docsresp.datosInscrip;
                            const newdatinsc = datinsc.map(( objdatinsc:any ) => ({
                              ...objdatinsc,
                              id: this.createId(),
                              idSolicitud: this.id
                            }));
                            newdatinsc.forEach( ( item:any ) => {
                              this.datosinsc.id = this.createId();                        
                              this.datosinscs.push(item);
                              this.datosinscsvalue.push({
                                  "idArchivo": item.idArchivo,
                                  "idDatosInscrPk": item.idDatosInscrPk,
                                  "folioMerc": item.folioMerc,
                                  "fchInscripcion": item.fchInscripcion,
                                  "estado": item.estado,
                                  "municipio": item.municipio
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

                              this.apoderados.push({
                                "idAux": this._idLongRepresentativesData,
                                "idArchivo": item.idArchivo,
                                "idApoderadoPk": item.idApoderadoPk,
                                "nombre": item.nombre,
                                "apMaterno": item.apMaterno,
                                "apPaterno": item.apPaterno,
                                "rfc": item.rfc,
                                "cargoSociedad": item.cargoSociedad,
                                "considLegal": item.considLegal,
                                "nomArchivo": item.poliza,
                                "facultades": this._faculties,
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
                              });

                            });

                  });

  }

  private validateCheckBoxGeneralData(value: string | undefined): boolean {
    return  value === null || value === "0" ? false : true;
  }

  /**
   *
   * Obtener los documentos del folio
   * @memberof OpbancariasComponent
   */
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

          this.respFiles = resp;

          this.respFiles.forEach( ( item: any ) => {

              this.arrayFiles.push({ "id": item.id, "nombre": item.nombreDocumento });
              this.deleteItemsEquals();
          });

        }, (error) => {
          return error;
        });

  }
  /**
   *
   * Obtener los valores de los eventos del formulario
   * @param {*} event
   * @param {string} field
   * @memberof OpbancariasComponent
   */
  getDataFirst( event: any, field: string ) {

    switch ( field ) {
      case 'fecha_vence':
        this.dataFiltersb.fecha_vence = event;
        break;
      case 'fecha_const':
        this.dataFiltersb.fecha_const = event;
        break;
      default:
        break;
     
    }
    
  }

  /**
   *
   * Obtener los valors de los eventos del formulario
   * @param {*} evnt
   * @param {string} field
   * @memberof OpbancariasComponent
   */
  getDataSecond( evnt: any, field: string ) {

    switch ( field ) {
      case 'personasoc':
        this.capitalsocial.persona = evnt;
        break;
      case 'numaccion':
        this.capitalsocial.numeroAcciones = evnt;
        break;
      case 'valores':
        this.capitalsocial.valor = evnt;
        break;
      case 'idArchivo':
        this.docsdictaminado.idArchivo = evnt.value;
        break;
      case 'polizaval':
        this.docsdictaminado.poliza = evnt;
        break;
      case 'fchEmisionEscr':
        this.fchEmisionEscr = evnt.replaceAll('-', '/');
        this.docsdictaminado.fchEmisionEscr = evnt;
        break;
      case 'actosconst':
        this.docsdictaminado.actos = evnt;
        break;
      default:
        break;
    }
    
  }

  /**
   *
   * OBtener los valores de los eventos del formulario
   * @param {*} evt
   * @param {string} field
   * @memberof OpbancariasComponent
   */
  getDataTrhid( evt: any, field: string ) {

    switch ( field ) {
      case 'articulo':
        this.docsdictaminado.articulo = evt.value;
        break;
      case 'consleg':
        this.docsdictaminado.consideraciones = evt;
        break;
      case 'registro':
        this.dataFiltersb.registro = evt.value;
        break;
      case 'aviso':
        this.dataFiltersb.aviso = evt.value;
        break;
      case 'femaviso':
        this.dataFiltersb.femaviso = evt;
        break;
      case 'num_escritura_f':
        this.datosinsc.num_escritura_f = evt.value;
        break;
      case 'folio':
        this.datosinsc.folioMerc = evt;
        break;
      case 'fchInscripcion':
        this.fchInscripcion = evt.replaceAll('-', '/');
        this.datosinsc.fchInscripcion = evt;
        break;
      case 'entidaddi':
        this.datosinsc.entidaddi = evt.value;
        this.datosinsc.municipiodi = "";
        this.obtenerMunicipiosdi();
        break;
      default:
        break;
    }

  }

  /**
   *
   * Obtener los valores de los eventos del formulario
   * @param {*} events
   * @param {string} field
   * @memberof OpbancariasComponent
   */
  getDataFour( events: any, field: string ) {

    switch ( field ) {
        case 'municipiodi':
          this.datosinsc.municipiodi = events.value;
          break;
        case 'num_escritura_fed':
          this.datosfed.num_escritura_fed = events.value;
          break;
        case 'fedat':
          this.datosfed.nomFedatario = events;
          break;
        case 'numfedat':
          this.datosfed.numFedatario = events;
          break;
        case 'entidadfe':
          this.datosfed.entidadfe = events.value;
          this.datosfed.municipiofe = "";
          this.obtenerMunicipiosfe();
          break;
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
        default:
          break;
    }

  }

  /**
   *
   * Obtener los valores de los eventos del formulario
   * @param {*} evnts
   * @param {string} field
   * @memberof OpbancariasComponent
   */
  getDataFive( evnts: any, field: string ) {

    switch ( field ) {
      case 'apematapod':
        this.apoderado.apMaterno = evnts;
        break;
      case 'datarfc':
        this.apoderado.rfc = evnts;
        break;
      case 'cargosoc':
        this.apoderado.cargoSociedad = evnts;
        break;
      case 'consigleg':
        this.apoderado.considLegal = evnts;
        break;
      case 'dateactadm':
        this.facultad.dateactadm = evnts;
        break;
      case 'datepleicob':
        this.facultad.datepleicob = evnts;
        break;
      case 'dateotorgtitul':
        this.facultad.dateotorgtitul = evnts;
        break;
      case 'dateotredesu':
        this.facultad.dateotredesu = evnts;
        break;
      case 'datepodesp':
        this.facultad.datepodesp = evnts;
        break;
      default:
        break;
    
    }

  }

  /**
   *
   * Obtener los valores de los eventos del formulario
   * @param {*} evnts
   * @param {string} field
   * @memberof OpbancariasComponent
   */
  getDataS( evnts: any, field: string ) {

    switch ( field ) {
      case 'dateactdom':
        this.facultad.dateactdom = evnts;
        break;
    case 'objetoopb':
      this.dataFiltersb.objeto = evnts;
      break;
      default:
        break;
    
    }
  }

  /**
   *
   * Guardar datos de la sección capital social
   * @memberof OpbancariasComponent
   */
  guardarDatosCapSoc() {

    this.capitalsocial.id = this.createId();
    this.capitalsociales.push(this.capitalsocial);
    this.capitalsociales = [...this.capitalsociales];
    
    if( this.capitalsocial.persona === undefined ) {
      this.capitalsocial.persona = "";
    }

    if( this.capitalsocial.numeroAcciones === undefined ) {
      this.capitalsocial.numeroAcciones = "";
    }

    if( this.capitalsocial.valor === undefined ) {
      this.capitalsocial.valor = "";
    }

    this.dropcapsocvalue.push(this.capitalsocial.persona);
    this.dropcapsocvalue.push(this.capitalsocial.numeroAcciones);
    this.dropcapsocvalue.push(this.capitalsocial.valor);

    this.capitalsocialesvalue.push({
                                "idSolicitud": this.id,
                                "persona": this.capitalsocial.persona,
                                "numeroAcciones": this.capitalsocial.numeroAcciones,
                                "valor": this.capitalsocial.valor
                              });

    this.capitalsocial = {};
    this.dropcapsocvalue = [];

    this.persona = "";
    this.numeroAcciones = "";
    this.valor = "";

    this.capitalsocial.persona = "";
    this.capitalsocial.numeroAcciones = "";
    this.capitalsocial.valor = "";

  }

  eliminarDatosCapSoc( rowIndex: any ) {

    this.capitalsociales.splice(rowIndex, 1);
    this.capitalsocialesvalue.splice(rowIndex, 1);

  }

  /**
   *
   * Guardar datos de la sección documentos dictaminados
   * @memberof OpbancariasComponent
   */
  guardarDocsDict() {

    let insArt = '';

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

    this.docsdictaminadosvalue.push({
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

  /**
   *
   * Eliminar datos de registro de la sección documentos dictaminados
   * @param {*} rowIndex
   * @memberof OpbancariasComponent
   */
  eliminarDocsDict( rowIndex: any ) {

    if ((this.datosinscs && this.datosinscs.find(item => item.poliza === this.docsdictaminados[rowIndex].poliza)) || 
        (this.datosfeds && this.datosfeds.find(item => item.poliza === this.docsdictaminados[rowIndex].poliza)) ||
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

  /**
   *
   * Guardar datos de la sección datos de inscripción
   * @memberof OpbancariasComponent
   */
  guardarDatosInsc() {

    this.datosinsc.id = this.createId();
    this.datosinscs.push(this.datosinsc);
    this.datosinscs = [...this.datosinscs];

    if( this.datosinsc.num_escritura_f === undefined ) {
      this.datosinsc.num_escritura_f = "";
    }

    if( this.datosinsc.folioMerc === undefined ) {
      this.datosinsc.folioMerc = "";
    }

    if( this.datosinsc.fchInscripcion === undefined ) {
      this.datosinsc.fchInscripcion = "";
    }

    if( this.datosinsc.entidaddi === undefined ) {
      this.datosinsc.entidaddi = "";
    }

    if( this.datosinsc.municipiodi === undefined ) {
      this.datosinsc.municipiodi = "";
    }

    this.dropdatinscvalue.push(this.datosinsc.num_escritura_f);
    this.dropdatinscvalue.push(this.datosinsc.idDatosInscrPk);
    this.dropdatinscvalue.push(this.datosinsc.folioMerc);
    this.dropdatinscvalue.push(this.datosinsc.fchInscripcion);
    this.dropdatinscvalue.push(this.datosinsc.entidaddi);
    this.dropdatinscvalue.push(this.datosinsc.municipiodi);

    this.datosinscsvalue.push({
                                  "idArchivo": this.datosinsc.num_escritura_f,
                                  "idDatosInscrPk": this.datosinsc.idDatosInscrPk === undefined ? this.datosinsc.idDatosInscrPk = "" : this.datosinsc.idDatosInscrPk,
                                  "folioMerc": this.datosinsc.folioMerc,
                                  "fchInscripcion": this.datosinsc.fchInscripcion,
                                  "estado": this.datosinsc.entidaddi,
                                  "municipio": this.datosinsc.municipiodi
                              });


    const idInsc = this.documentosValue.filter(( obj:any ) => {
      return obj.idArchivo === this.datosinsc.num_escritura_f;
    });

    idInsc.forEach( ( item:any ) => {
      this.datosinsc.poliza = item.poliza;
    });

    this.nomMunicipiodi = this.municipiosDatadi.filter(( entid: any ) => {
      return entid.idMunicipio === this.datosinsc.municipiodi;
    });

    this.nomEntidaddi = this.entidadesDatadi.filter(( munic: any ) => {
      return munic.idEntidadFed === this.datosinsc.entidaddi;
    });

    this.datosinsc.municipioNombre = this.nomMunicipiodi[0]?.nombre;
    this.datosinsc.estadoNombre = this.nomEntidaddi[0]?.nombre;

    this.datosinsc = {};
    this.dropdatinscvalue = [];

    this.num_escritura_f = "";
    this.folioMerc = "";
    this.fchInscripcion = "";
    this.entidaddi = "";
    this.municipiodi = "";

    this.datosinsc.num_escritura_f = "";
    this.datosinsc.folioMerc = "";
    this.datosinsc.fchInscripcion = "";
    this.datosinsc.entidaddi = undefined;
    this.datosinsc.municipiodi = undefined;

  }

  /**
   *
   * Eliminar datos de la sección Datos de inscripción
   * @param {*} rowIndex
   * @memberof OpbancariasComponent
   */
  eliminarDatosInsc( rowIndex: any ) {

    this.datosinscs.splice(rowIndex, 1);
    this.datosinscsvalue.splice(rowIndex, 1);

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
    this.datosfed.entidadfe = undefined;
    this.datosfed.municipiofe = undefined;

  }

  /**
   *
   * Eliminar datos de la sección Fedatario
   * @param {*} rowIndex
   * @memberof OpbancariasComponent
   */
  eliminarFedatario( rowIndex: any ) {

    this.datosfeds.splice(rowIndex, 1);
    this.datosfedsvalue.splice(rowIndex, 1);

  }

  /**
   *
   * Guarda los dtaos de la sección facultades
   * @memberof OpbancariasComponent
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
      this._reInitFacultiesValues();
    }
  }

  /**
   *
   * Validar tipo de dato checkbox
   * @return {*} 
   * @memberof OpbancariasComponent
   */
  domActValidate() {
    if( this.domainActsCheck === true ) {
      return this.domainActsCheck = 1;
    } else {
      return this.domainActsCheck = 0;
    }
  }

  /**
   *
   * Validar tipo de dato checkbox
   * @return {*} 
   * @memberof OpbancariasComponent
   */
  actAdmValidate() {
    if( this.adminActsCheck === true ) {
      return this.adminActsCheck = 1;
    } else {
      return this.adminActsCheck = 0;
    }
  }

  /**
   *
   * Validar tipo de dato checkbox
   * @return {*} 
   * @memberof OpbancariasComponent
   */
  pleyCobValidate() {
    if( this.collectionCheck === true ) {
      return this.collectionCheck = 1;
    } else {
      return this.collectionCheck = 0;
    }
  }

  /**
   *
   * Validar tipo de dato checkbox
   * @return {*} 
   * @memberof OpbancariasComponent
   */
  otoTituCredValidate() {
    if( this.creditsTitlesCheck === true ) {
      return this.creditsTitlesCheck = 1;
    } else {
      return this.creditsTitlesCheck = 0;
    }
  }

  /**
   *
   * Validar tipo de dato checkbox
   * @return {*} 
   * @memberof OpbancariasComponent
   */
  otoDelSusValidate() {
    if( this.substitutionCheck === true ) {
      return this.substitutionCheck = 1;
    } else {
      return this.substitutionCheck = 0;
    }
  }

  /**
   *
   * Validar tipo de dato checkbox
   * @return {*} 
   * @memberof OpbancariasComponent
   */
  podEspValidate() {
    if( this.specialMightCheck === true ) {
      return this.specialMightCheck = 1;
    } else {
      return this.specialMightCheck = 0;
    }
  }

  /**
   *
   * Validar tipo de dato checkbox
   * @param {boolean} selected
   * @param {number} exeType
   * @return {*}  {boolean}
   * @memberof OpbancariasComponent
   */
  public checkIsRequired(selected : boolean, exeType : number) : boolean {
    return selected && exeType === -1 ? true : false;
  }

  public checkIsRequiredInput(check : boolean, exeType : any) : boolean {

    return check && exeType === "" ? true : false;
  }

  /**
   *
   * Validar dato del dropdown
   * @param {number} exeTypeIndex
   * @return {*}  {string}
   * @memberof OpbancariasComponent
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
   *
   * Validar tipo de dato dropdown
   * @param {string} facultyValue
   * @return {*}  {string}
   * @memberof OpbancariasComponent
   */
  public checkIsEmpty(facultyValue: string) : string {
    return facultyValue === "" ? "N/A": facultyValue;
  }

    /**
   *
   * Borrado de facutltades
   * @param {number} indexToDelete
   * @memberof OpbancariasComponent
   */
  public deleteFaculty(indexToDelete:number) : void {

    this.apoderados = this.apoderados.filter((item,index)=>{

      return index !== indexToDelete
      
    });

    this.apoderadosvalue = this.apoderadosvalue.filter((item,index) =>{
      return index !== indexToDelete
    });

  }

    /**
   *
   * Eliminar dato de apoderado
   * @param {*} rowIndex
   * @memberof OpbancariasComponent
   */
  eliminarApoderado( rowIndex: any ) {
    this.apoderadosvalue.splice(rowIndex, 1);
    this.apoderados.splice(rowIndex, 1);
  }

  /**
   *
   * Reinicio checkbox facultades
   * @private
   * @memberof OpbancariasComponent
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


  /**
   *
   * Guardar sección de apoderados
   * @memberof OpbancariasComponent
   */
  guardarApoderado() {

    this.saveFaculties();

    this.apoderados.forEach(( id:any ) => {
      this._idLongRepresentativesData = id.idAux + 2; 
    })
    setTimeout(() => {

      this.nombreCompleto = this.apoderado.nombre + ' ' + this.apoderado.apPaterno + ' ' + this.apoderado.apMaterno;

      this.apoderado.idArchivo = this.apoderado.numpoliza;
      this.apoderado.nombreCompleto = this.nombreCompleto;
      this.apoderado.facultades = this._faculties;
      this.apoderado.idAux = this._idLongRepresentativesData;
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

      this.dropapodvalue.push(this.apoderado.numpoliza);
      this.dropapodvalue.push(this.apoderado.idApoderadoPk);
      this.dropapodvalue.push(this.apoderado.nombre);
      this.dropapodvalue.push(this.apoderado.apPaterno);
      this.dropapodvalue.push(this.apoderado.apMaterno);
      this.dropapodvalue.push(this.apoderado.rfc);
      this.dropapodvalue.push(this.apoderado.cargoSociedad);
      this.dropapodvalue.push(this.apoderado.nombreCompleto);
      this.dropapodvalue.push(this.apoderado.considLegal);
      

      this.apoderadosvalue.push({
                                  "idArchivo": this.apoderado.numpoliza,
                                  "idApoderadoPk": this.apoderado.idApoderadoPk === undefined ? this.apoderado.idApoderadoPk = "" : this.apoderado.idApoderadoPk,
                                  "nombre": this.apoderado.nombre,
                                  "apPaterno": this.apoderado.apPaterno,
                                  "apMaterno": this.apoderado.apMaterno,
                                  "rfc": this.apoderado.rfc,
                                  "cargoSociedad":  this.apoderado.cargoSociedad,
                                  "considLegal": this.apoderado.considLegal,
                                  "facultades": this._faculties_back,
                                });

      const idApo = this.documentosValue.filter(( obj:any ) => {
        return obj.idArchivo === this.apoderado.numpoliza;
      });

      idApo.forEach( ( item:any ) => {
        this.apoderado.poliza = item.poliza;
      });

      this._faculties = [];
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
    }, 200);

  }

  /**
   *
   * Busqueda de ID de registro
   * @param {*} id
   * @return {*}  {number}
   * @memberof OpbancariasComponent
   */
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

  /**
   *
   * Guardar dictamen
   * @memberof OpbancariasComponent
   */
  guardarDictamen() {

    let registro;
    let aviso;

    this.otorg_sol === true ? this.otorg_sol = 1 : this.otorg_sol = 0;
    this.otor_ava === true ? this.otor_ava = 1 : this.otor_ava = 0;
    this.otor_gara === true ? this.otor_gara = 1 : this.otor_gara = 0;
    this.otor_fian === true ? this.otor_fian = 1 : this.otor_fian = 0;

    this.idfolio = this._route.snapshot.paramMap.get( 'folio' );

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrId = localStorage.getItem("uId");

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
      aviso = 0;
    } else if( this.dataFiltersb.aviso === 'NO' ) {
      aviso = 1;
    } else {
      aviso = "";
    }
        
    const data = {

                    "data" : {
                                "razonSocial": this.nombre_razon,
                                "idClienteFk": this.foliodata.beanBusqueda.idCliente,
                                "capitalSocial": this.capitalsocialesvalue,
                                "beanBancoGenerales": {
                                                        "idSolicitud": this.id,
                                                        "consRef": this.info_ref,
                                                        "domicilio": this.domicilio,
                                                        "nacionalidad": this.nacionalidad
                                                      },
                                "beanHistorico": {
                                                    "duracion": this.duracion,
                                                    "vence": this.dataFiltersb.fecha_vence,
                                                    "fechaConstitucion": this.dataFiltersb.fecha_const,
                                                    "fechaAviso": this.dataFiltersb.femaviso,
                                                    "darAviso": aviso,
                                                    "inclRegistro": registro
                                                  },
                                "beanObligaciones": {
                                                      "objeto": this.dataFiltersb.objeto,
                                                      "obligarseSolidariamente": this.otorg_sol,
                                                      "obligarseAvales": this.otor_ava,
                                                      "obligarseGarantias": this.otor_gara,
                                                      "otorgarFianzas": this.otor_fian,
                                                      "totalCapital": this.tot_soc,
                                                      "totalAccion": this.totacciones,
                                                      "admExt": this.admext,
                                                      "organoAdminFac": this.admin_fac
                                                    },
                                "docsDictaminados": this.docsdictaminadosvalue,
                                "datosInscrip": this.datosinscsvalue,
                                "fedatarios": this.datosfedsvalue,
                                "apoderadosLeg": this.apoderadosvalue,
                              },
                              "origin": this.origin,
                              "idSolicitud": this.idDictamen,
                              "ip": this.ipClient,
                              "usrRed": this.usrId,
                              "conn": ""
                      }

    this._dictamenes.insupdOpBanc ( data )
        .subscribe( resp => {

          this.displayModalAd = true;
          this.messageModalM = 'Sus cambios fueron guardados en el folio' + " " + this.idfolio + "  " + 'con éxito';

        }, (errors) => {
          this.displayModalM = true;
          this.messageModalM = errors.error.errors[0].message;
        });

  }

  /**
   *
   * Crea id para registro
   * @return {*} 
   * @memberof OpbancariasComponent
   */
  createId() {

    let id = '';
    let chars = '0123456789';
    for ( let i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  
  }

  /**
   *
   * Obtener entidades
   * @memberof OpbancariasComponent
   */
  obtenerEntidadesdi() {

    this._catalogos.getEntidades()
          .subscribe( ( resp: any ) => {
            this.entidadesDatadi = resp;
          })
    
  }

  /**
   *
   * Obtener Municipios
   * @memberof OpbancariasComponent
   */
  obtenerMunicipiosdi() {

    this._catalogos.getMunicipios( this.datosinsc.entidaddi )
        .subscribe( ( resp: any ) => {
          this.municipiosDatadi = resp;
        })

  }

  /**
   *
   * Obtener Entidades Fedatarios
   * @memberof OpbancariasComponent
   */
  obtenerEntidadesfe() {

    this._catalogos.getEntidades()
          .subscribe( ( resp: any ) => {
            this.entidadesDatafe = resp;
          })
    
  }

  /**
   *
   * Obtener Municipios Fedatario
   * @memberof OpbancariasComponent
   */
  obtenerMunicipiosfe() {

    this._catalogos.getMunicipios( this.datosfed.entidadfe )
        .subscribe( ( resp: any ) => {
          this.municipiosDatafe = resp;
        })

  }

  /**
   *
   * Agrega valores de checkbox
   * @private
   * @param {any[]} list
   * @param {({ id: string | undefined, nombre: string | undefined })} value
   * @memberof OpbancariasComponent
   */
  private addItemList(list: any[], value: { id: string | undefined, nombre: string | undefined }): void {
    list.push(value);
  }

  /**
   *
   * Remueve valores de checkbox
   * @private
   * @param {any[]} list
   * @param {string} value
   * @memberof OpbancariasComponent
   */
  private removeItemList(list: any[], value: string): void {
    const findIndex = list.findIndex(item => item.id === value);
    if (findIndex !== -1) { list.splice(findIndex, 1); }  
  }

  /**
   *
   * Elimina datos de todas las secciones al eliminar un registro de docs dictaminados
   * @memberof OpbancariasComponent
   */
  acceptDeleteFile(): void {
    if ((this.datosinscs && this.datosinscs.find(item => item.poliza === this.docsdictaminados[this._indexToDeleteItem].poliza))) {
      this.datosinscs = this.datosinscs.filter(item => item.poliza !== this.docsdictaminados[this._indexToDeleteItem].poliza);
      this.datosinscsvalue = this.datosinscsvalue.filter(item => item.idArchivo !== this.docsdictaminados[this._indexToDeleteItem].idArchivo);
    }
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

  onRowEditInitDocumentosDictamines(indexRow: number, item: Docsdictaminados): void {
    this.rowIndexDocumentosDictaminadosActive = indexRow;
    this.clonedDocumentosDictaminados[item.id!] = { ... item };
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

    this.updatedatinsc( item );

  }

  private updatedatinsc( item: any ): void {

    const oldData = this.clonedDocumentosDictaminados[item.id!];

    if (this.datosinscs && this.datosinscs.length > 0) {
      this.datosinscs.forEach( itemDatosInscripcion => {
        if (itemDatosInscripcion.poliza === oldData.poliza) {
          itemDatosInscripcion.poliza = item.poliza;
        }
      });
    }

    if (this.datosinscsvalue && this.datosinscsvalue.length > 0) {
      this.datosinscsvalue.forEach( itemDatosInscripcionValue => {
        if (itemDatosInscripcionValue.poliza === oldData.poliza) {
          itemDatosInscripcionValue.poliza = item.poliza;
        }
      });
    }

    this.updateFeds( item );

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

    this.updateApod( item );

  }

  updateApod( item: any ): void {

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

  onRowEditCancelDocumentosDictaminados(indexRow: number, docsdictaminado: Docsdictaminados) {
    this.docsdictaminados[indexRow] = this.clonedDocumentosDictaminados[docsdictaminado.id!];
    delete this.clonedDocumentosDictaminados[docsdictaminado.id!];
    this.indexActiveEdit = -1;
  }

  onRowEditFed(indexRow: number, datosfed: Datosfedatario) {
    this.rowIndexFederatarioActive = indexRow;
    this.clonedDatosFederatario[datosfed.id!] = {...datosfed};

    
    if(!datosfed.entidadfe) {
      this.datosfed.entidadfe = datosfed.estado;
    } else {
      this.datosfed.entidadfe = datosfed.entidadfe;
    }
    
    if(!datosfed.municipiofe) {
      this.datosfed.municipiofe = datosfed.municipio;
    } else {
      this.datosfed.municipiofe = datosfed.municipiofe;
    }
    
    this.datosfed.estadoNombre = datosfed.estadoNombre;
    this.datosfed.municipioNombre = datosfed.municipioNombre;

    this.obtenerMunicipiosfe();
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

  onRowEditDatosInsc(indexRow: number, datosinsc: Datosinsc) {
    this.rowIndexDatosJuzActive = indexRow;
    this.clonedDocumentosDictaminados[datosinsc.id!] = {...datosinsc};

    if(!datosinsc.entidaddi) {
      this.datosinsc.entidaddi = datosinsc.estado;
    } else {
      this.datosinsc.entidaddi = datosinsc.entidaddi
    }
    
    if(!datosinsc.municipiodi) {
      this.datosinsc.municipiodi = datosinsc.municipio;
    } else {
      this.datosinsc.municipiodi = datosinsc.municipiodi;
    }
    
    this.datosinsc.estadoNombre = datosinsc.estadoNombre;
    this.datosinsc.municipioNombre = datosinsc.municipioNombre;

    this.obtenerMunicipiosdi();
  }

  onRowEditSaveDatosInsc(rowIndex: number, datosinsc: Datosinsc) {

    this.nomEntidaddi = this.entidadesDatadi.filter(( munic: any ) => {
      return munic.idEntidadFed === this.datosinsc.entidaddi;
    });

    this.nomMunicipiodi = this.municipiosDatadi.filter(( entid: any ) => {
      return entid.idMunicipio === this.datosinsc.municipiodi;
    });
    
    datosinsc.entidaddi = this.datosinsc.entidaddi;
    datosinsc.municipiodi = this.datosinsc.municipiodi;
    datosinsc.estadoNombre = this.nomEntidaddi[0]?.nombre;

    if(this.datosinsc.municipiodi === datosinsc.municipio) {
      datosinsc.municipioNombre = this.datosinsc.municipioNombre;
    }else if(this.nomMunicipiodi.length <= 0) {
      datosinsc.municipioNombre = '';
    } else {
      datosinsc.municipioNombre = this.nomMunicipiodi[0]?.nombre;
    }

    const datdatosinscsvalue = {
        "idArchivo": datosinsc.num_escritura_f === undefined ? datosinsc.idArchivo : datosinsc.num_escritura_f,
        "idDatosInscrPk": datosinsc.idDatosInscrPk,
        "folioMerc": datosinsc.folioMerc,
        "fchInscripcion": datosinsc.fchInscripcion,
        "estado": datosinsc.entidaddi,
        "municipio": datosinsc.municipiodi
    }

    this.datosinscs.splice(rowIndex, 1, datosinsc);
    this.datosinscsvalue.splice(rowIndex, 1, datdatosinscsvalue);

  }

  onRowEditCancelDatosInsc(indexRow: number, datosinsc: Datosinsc): void {

    this.nomEntidaddi = this.entidadesDatadi.filter(( munic: any ) => {
      return munic.idEntidadFed === this.datosinsc.entidaddi;
    });

    this.nomMunicipiodi = this.municipiosDatadi.filter(( entid: any ) => {
      return entid.idMunicipio === this.datosinsc.municipiodi;
    });

    datosinsc.estadoNombre = this.nomEntidaddi[0]?.nombre;
    datosinsc.municipioNombre = this.nomMunicipiodi[0]?.nombre;

    this.datosinscs[indexRow] = this.clonedDocumentosDictaminados[datosinsc.id];

    this.rowIndexDatosJuzActive = -1;

  }

  onRowEditCapSoc(indexRow: number, capitalSocial: Docsdictaminados) {
    this.indexActiveEditCapSoc = indexRow;
    this.clonedDocumentosCapSoc[capitalSocial.id!] = {...capitalSocial};
  }

  onRowEditSaveCapSoc(rowIndex: number, capitalSocial: Docsdictaminados) {

    const datacapitalsocialesvalue = {
      "idSolicitud": this.id,
      "persona": capitalSocial.persona, 
      "numeroAcciones": capitalSocial.numeroAcciones,
      "valor": capitalSocial.valor
    }
    
    this.capitalsociales.splice(rowIndex, 1, capitalSocial);
    this.capitalsocialesvalue.splice(rowIndex, 1, datacapitalsocialesvalue);

    delete this.clonedDocumentosCapSoc[capitalSocial.id!];

  }

  onRowEditCancelCapSoc(rowIndex: number, capitalSocial: Docsdictaminados) {
    this.capitalsociales[rowIndex] = this.clonedDocumentosCapSoc[capitalSocial.id!];
    delete this.clonedDocumentosCapSoc[capitalSocial.id!];
  }

  /**
   *
   * Cierre de modal eliminar archivo
   * @memberof OpbancariasComponent
   */
  closeDialogDeleteFile(): void {
    this.confirmDeleteDictum = false;
  }

  /**
   *
   * Modal interviniente
   * @memberof OpbancariasComponent
   */
  displayMInter() {
    this.displayModalInter = true;
    this.setDataFaculty(this._faculties); 
  }

  /**
   *
   * Modal Facultades
   * @memberof OpbancariasComponent
   */
  displayMFacleg() {
    this.displayModalFaclegis = true;
  }

  /**
   *
   * Cierre de modal facultades
   * @memberof OpbancariasComponent
   */
  closeFaclegModalFacleg() {
    this.displayModalFaclegis = false;
  }

  /**
   *
   * Cierre de modal Intervinientes
   * @memberof OpbancariasComponent
   */
  closeInterModal() {
    this.displayModalInter = false;
  }

  /**
   * Cerrar modal
   *
   * @memberof AltaclienteComponent
   */
  closeModal() {

    this.displayModalM = false;

  }

  /**
   *
   * Cierre Modal Aviso
   * @memberof OpbancariasComponent
   */
  closeAvisoModal() {
    this.displayModalAd = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/dictaminacion/', this._route.snapshot.paramMap.get( 'folio' )]);
    });
  }

  /**
   *
   * Validar Tab activa
   * @param {*} value
   * @memberof OpbancariasComponent
   */
  tabActive(value: any) {
    switch(value.index) {
      case 2:
        this.deleteItemsEquals();
        break;
      case 5:
        this.cancelUpdateFacultyItem();
        break;
    };
  }

  /**
   *
   * Close interviniente duplicado
   * @memberof OpbancariasComponent
   */
  duplicateItemRepresentative(indexRow: number): void {

    this._indexRowDuplicateRepresentative = indexRow;
    if (this._indexRowDuplicateRepresentative !== -1) {

      this._idLongRepresentativesData++;
      const item: Apoderados = {
        idAux: this._idLongRepresentativesData,
        apMaterno: this.apoderados[this._indexRowDuplicateRepresentative].apMaterno,
        apPaterno: this.apoderados[this._indexRowDuplicateRepresentative].apPaterno,
        cargoSociedad: this.apoderados[this._indexRowDuplicateRepresentative].cargoSociedad,
        considLegal: this.apoderados[this._indexRowDuplicateRepresentative].considLegal,
        facultades: this.apoderados[this._indexRowDuplicateRepresentative].facultades,
        facultadesleg: this.apoderados[this._indexRowDuplicateRepresentative].facultadesleg,
        idArchivo: this.apoderados[this._indexRowDuplicateRepresentative].idArchivo,
        idApoderadoPk: this.apoderados[this._indexRowDuplicateRepresentative].idApoderadoPk,
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
        apMaterno: this.apoderados[this._indexRowDuplicateRepresentative].apMaterno,
        apPaterno: this.apoderados[this._indexRowDuplicateRepresentative].apPaterno,
        cargoSociedad: this.apoderados[this._indexRowDuplicateRepresentative].cargoSociedad,
        considLegal: this.apoderados[this._indexRowDuplicateRepresentative].considLegal,
        facultades: this.apoderadosvalue[this._indexRowDuplicateRepresentative].facultades,
        facultadesleg: this.apoderados[this._indexRowDuplicateRepresentative].facultadesleg,
        nombre: this.apoderados[this._indexRowDuplicateRepresentative].nombre,
        rfc: this.apoderados[this._indexRowDuplicateRepresentative].rfc
      });

      this.confirmDuplicateRepresentative = false;
      this._indexRowDuplicateRepresentative = -1;
    }
  }

  /**
   *
   * Editar Facultad
   * @param {number} rowIndex
   * @memberof OpbancariasComponent
   */
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
      this.rowIndexActive = rowIndex;
    }
  }

  /**
   *
   * Establecer facultad
   * @private
   * @param {(Array<any> | undefined)} facultyList
   * @memberof OpbancariasComponent
   */
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

  /**
   *
   * Validar checkbox
   * @param {number} item
   * @return {*}  {boolean}
   * @memberof OpbancariasComponent
   */
  validateCheck( item: number ): boolean {
    return item ===  1 ? true : false;
  }

  /**
   *
   * Actualizar facultad
   * @memberof OpbancariasComponent
   */
  updateFacultyItem(): void {

    this.saveFaculties();

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
      }

      this.cancelUpdateFacultyItem();
    }, 100);
  }

  /**
   *
   * Cancelar actualización de facultad
   * @memberof OpbancariasComponent
   */
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
  }

  /**
   *
   * Eliminar items documentos dictaminados iguales
   * @private
   * @memberof OpbancariasComponent
   */
  private deleteItemsEquals(): void {
    if ((this.docsdictaminadosvalue && this.docsdictaminadosvalue.length > 0) && (this.arrayFiles && this.arrayFiles.length > 0)) {
      this.docsdictaminadosvalue.forEach(item => {
        const findIndex = this.arrayFiles.findIndex(file => file.id === item.idArchivo);
        if (findIndex !== -1) { this.arrayFiles.splice(findIndex, 1); }
      });
    }
  }

}
