import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Datosinsc } from 'src/app/interfaces/datosinsc.interface';
// Interfaces
import { Apoderados } from '../../../interfaces/apoderados.interface';
import { Beneficiarios } from '../../../interfaces/beneficiarios.interface';
import { Datosfedatario } from '../../../interfaces/datosfedatario.interface';
import { Docsdictaminados } from '../../../interfaces/docsdictaminados.interface';
import { Entidades } from '../../../interfaces/entidades.interface';
import { Facultades } from '../../../interfaces/facultades.interface';
import { Municipios } from '../../../interfaces/municipios.interface';
import { Titulares } from '../../../interfaces/titulares.interface';
// Servicios
import { CatalogosService } from '../../../servicios/catalogos.service';
import { DictamenesService } from '../../../servicios/dictamenes.service';
import { DictaminacionService } from '../../../servicios/dictaminacion.service';
import { IntervinienteService } from '../../../servicios/intervinientes.service';
import { ProfileService } from '../../../servicios/profile.service';

@Component({
  selector: 'app-devdesaldo',
  templateUrl: './devdesaldo.component.html',
  styles: [
  ]
})
export class DevdesaldoComponent implements OnInit {

  @Output() closeMod = new EventEmitter<any>();

  id!: string;

  foliodata!: any;

  origin!: any;

  idDictamen!: string;

  idfolio!: any;

  idcliente!: string;

  nombre_razon!: string;

  buc!: string;

  idTipoDict!: string;

  idSubDictamen!: string;

  dictNotFound: any;

  page: number = 1;

  displayModalInter: boolean = false;

  displayModalAd: boolean = false;

  messageModalM!: string;

  totalPages: number = 0;

  isReady = true;

  poliza!: string;

  maxDate!: Date;

  idArchivo!: string;

  nomArchivo!: string;

  fchEmisionEscr!: string;

  actos!: string;

  articulo!: string;

  insart!: any;

  consideraciones!: string;

  daravisovalue!: any;

  dataFiltersb!: any;

  nomFedatario!: string;

  num_escritura_fed!: string;

  numFedatario!: string;

  nomEntidadfe!: Entidades[];

  entidadfe!: string;

  municipiofe!: string;

  nomMunicipiofe: Municipios[] = [];

  numpoliza!: any;

  numpolizab!: any;

  nombre!: string;

  nombreCompleto!: string;

  apepatap!: string;

  apematap!: string;

  apPaterno!: string;

  apMaterno: string = "";

  rfc: string = "";

  cargoSociedad!: string;

  considLegal!: string;

  consleg!: string;

  nombreb!: string;

  nombreCompletob!: string;

  rfcb!: string;

  formpago!: any;

  noCuenta!: any;

  formadepago!: any;

  formadepagoupd!: any;

  porcentajeDesignado!: string;

  tipoejercicio!: any;

  dateactdom!: string;
  
  dateactadm!: string;

  datepleicob!: string;

  dateotorgtitul!: string;

  dateotredesu!: string;

  datepodesp!: string;

  displayModalM = false;

  headerModalM!: string;

  ipClient: any;

  usrId: any;


  arrayFiles: any[] = new Array;

  respFiles: any[] = new Array;

  cloneTitular: { [s: string]: Titulares; } = {};

  clonedDocumentos: { [s: string]: Docsdictaminados; } = {};

  cloneFedatario: { [s: string]: Datosfedatario; } = {};

  cloneDatosIns: { [s: string]: Datosinsc; } = {};

  indexActiveEdittitular: number = -1;

  indexActiveEdit: number = -1;

  indexActiveEditFed: number = -1;


  entidadesDatafe!: Entidades[];
  
  municipiosDatafe: Municipios[] = [];

  beneficiarioCheque!: string;


  cuenta!: string;

  titulares!: Titulares[];

  selectedtitulares!: Titulares;
  
  titularesvalue: any[] = new Array;

  titular: any;

  
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


  public beneficiarios!: Beneficiarios[];

  public selectedbeneficiarios!: Beneficiarios;

  public beneficiariosvalue: any[] = new Array;

  public beneficiario: any;
  

  public facultades!: Facultades[];

  public selectedfacultades!: Facultades[];

  public facultadessvalue: any[] = new Array;

  public facultad!: any;

  public facultiesSaved!: Array<object>;


  droptitularvalue: any[] = [];

  dropdocvalue: any[] = [];

  dropapodvalue: any[] = [];

  dropfedvalue: any[] = [];

  dropbenefvalue: any[] = [];

  confirmDeleteDictum: boolean = false;

  confirmDuplicateRepresentative: boolean = false;
  
  editRepresentativeActive: boolean = false;
  
  rowIndexActive: number = -1;

  confirmDuplicateBeneficiary: boolean = false;

  editBeneficiaryActive: boolean = false;

  rowIndexActiveBeneficiary: number = -1;
  
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

  private _faculties: Array<object> = [];
  private _faculties_back: Array<object> = [];
  private _indexToDeleteItem! : number;
  private _indexRowEditRepresentative: number = -1;
  private _indexRowDuplicateRepresentative: number = -1;

  private _idLongRepresentativesData: number = -1;

  private _indexRowDuplicateBeneficiary: number = -1;

  private _indexRowEditBeneficiary: number = -1;

  private _idLongBeneficiarysData: number = -1;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              public _profile: ProfileService,
              private _dictaminacion: DictaminacionService,
              private _interviniente: IntervinienteService,
              private _dictamenes: DictamenesService,
              private _catalogos: CatalogosService) {

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
    ];

    this.daravisovalue = [
      {
        "id": 0,
        "nombre": "SI",
      },
      {
        "id": 1,
        "nombre": "NO"
      },
    ];

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
    ];

    this.formadepago = [
      {
        "id": "1",
        "nombre": "No. de Cheque",
      },
      {
        "id": "2",
        "nombre": "Spei",
      },
      {
        "id": "3",
        "nombre": "Traspaso de valores",
      }
    ]

    this.titulares = [];
    this.titular = {};
    this.docsdictaminados = [];
    this.docsdictaminado = {};
    this.datosfeds = [];
    this.datosfed = {};
    this.apoderados = [];
    this.apoderado = {};
    this.facultad = {};
    this.beneficiarios = [];
    this.beneficiario = {};

    this.maxDate = new Date();
    
  }

  /**
   * Metodo para obtener el id del folio
   *
   * @memberof DevdesaldoComponent
   */
  obtenerIdFolio() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrId = localStorage.getItem("uId");
    const idfolio = this._route.snapshot.paramMap.get('folio');
    const session = '';

    this._dictaminacion.getIdxFolio( idfolio, this.usrId, this.ipClient, session )
                       .subscribe( ( resp:any ) => {

                         this.id = resp.beanRespuestaConsulta.beanComplementoRespuesta.id;

                         this.obtenerFolioDictamen();

                       })

  }

  /**
   * Metodo para obtener el folio dictamen
   *
   * @memberof DevdesaldoComponent
   */
  obtenerFolioDictamen() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const idfolio = this.id;
    const usrRed = 'red';
    const session = '';

    this._dictaminacion.getFolioDictamen( idfolio, usrRed, this.ipClient, session )
                       .subscribe( ( resp: any ) => {

                         this.foliodata = resp;
                         this.idcliente = resp.beanBusqueda.idCliente;
                         this.idDictamen = resp.beanFolio.idDictamen;
                         this.idSubDictamen = resp.beanFolio.idTipoEmpresaFk;
                         this.buc = resp.beanFolio.buc;
                         this.nombre_razon = resp.beanBusqueda.razonSocial;
                         this.idTipoDict = resp.beanFolio.idTipoDictamen;
                         this.beneficiarioCheque = resp.beanBusqueda.razonSocial;
                         this.getDevSalLas();
                         this.obtenerDocumentos();
                         this.obtenerEntidadesfe();

                        })

  }

  /**
   * Metodo para obtener devolución de saldo
   *
   * @memberof DevdesaldoComponent
   */
  getDevSalLas() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

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

                                const docsresp = resp.beanDictamenDevSaldos;

                                this.origin = resp.beanDictamenDevSaldos;

                                const ctas = docsresp.cuentas;
                                const newctas = ctas.map(( obj: any ) => ({
                                  ...obj,
                                  id: this.createId(),
                                  idSolicitud: this.id,
                                }));

                                newctas.forEach( ( item:any ) => {
                                  this.titulares.push(item);
                                  this.titularesvalue.push({
                                    "cuenta": item.cuenta,
                                    "idPlanDevoPk": item.idPlanDevoPk,
                                    "idSolicitud": item.idSolicitud
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
                                    "apPaterno": item.apPaterno,
                                    "apMaterno": item.apMaterno,
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
                                  const benef = docsresp.beneficiarios;

                                  let fomapagval;
                                  const newbenef = benef.map(( objfedat: any ) => ({
                                    ...objfedat,
                                    id: this.createId(),
                                    idSolicitud: this.id
                                  }));
                                  newbenef.forEach( ( itemben:any ) => {
                                    
                                    this.beneficiario.id = this.createId();

                                    this.beneficiarios.push({
                                      "designado": "",
                                      "designadoComo": "",
                                      "formaPago": itemben.formaPago,
                                      "formpago": itemben.formaPagoDesc,
                                      "formaPagoDesc": itemben.formaPagoDesc,
                                      "formaValor": "",
                                      "id": "",
                                      "idArchivo": itemben.idArchivo,
                                      "idPlanDevBenePk": itemben.idPlanDevBenePk,
                                      "idDictTab": "",
                                      "idSolicitud": this.id,
                                      "noCuenta": itemben.noCuenta,
                                      "poliza": itemben.poliza,
                                      "porcentajeDesignado": itemben.porcentajeDesignado,
                                      "priApellido": itemben.priApellido,
                                      "rfc": itemben.rfc,
                                      "segApellido": itemben.segApellido,
                                      "titular": itemben.titular,
                                      "nombreCompleto": itemben.titular + ' ' + itemben.priApellido + ' ' + itemben.segApellido,
                                    });
                                    
                                    this.beneficiarios = [...this.beneficiarios];

                                    this.beneficiariosvalue.push({
                                      "designado": "",
                                      "designadoComo": "",
                                      "formaPago": itemben.formaPago,
                                      "formaPagoDesc": itemben.formaPagoDesc,
                                      "formaValor": itemben.formaValor,
                                      "id": "",
                                      "idArchivo": itemben.idArchivo,
                                      "idPlanDevBenePk": itemben.idPlanDevBenePk,
                                      "idDictTab": "",
                                      "idSolicitud": this.id,
                                      "noCuenta": itemben.noCuenta,
                                      "poliza": itemben.poliza,
                                      "porcentajeDesignado": itemben.porcentajeDesignado,
                                      "priApellido": itemben.priApellido,
                                      "rfc": itemben.rfc,
                                      "segApellido": itemben.segApellido,
                                      "titular": itemben.titular,
                                    });

                                  });
 
    });

  }

  /**
   * Metodo para obtener lista de documentos
   *
   * @memberof DevdesaldoComponent
   */
  obtenerDocumentos() {
    
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrId = localStorage.getItem('uId');
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
   * Metodo para crear un id de registro
   *
   * @return {*} 
   * @memberof DevdesaldoComponent
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
   * Metodo para obtener los eventos de los inputs del formulario
   *
   * @param {*} event
   * @param {string} field
   * @memberof DevdesaldoComponent
   */
  getData( event: any, field: string ) {

    switch ( field ) {
      case 'personasoc':
        this.titular.cuenta = event;
        break;
      case 'ctabenef':
        this.titular.cuenta = event;
        break;
      case 'idArchivo':
        this.docsdictaminado.idArchivo = event.value;
        break;
      case 'polizaval':
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
      case 'num_escritura_fed':
        this.datosfed.num_escritura_fed = event.value;
        break;
    default:
      break;
    }
    
  }

  /**
   * Metodo para obtener los eventos de los inputs del formulario
   *
   * @param {*} evnt
   * @param {string} field
   * @memberof DevdesaldoComponent
   */
  getDataB( evnt: any, field: string ) {

    switch ( field ) {
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
      case 'municipiofe':
        this.datosfed.municipiofe = evnt.value;
        break;
        case 'numpoliza':
        this.apoderado.numpoliza = evnt.value;
        break;
      case 'nombreapod':
        this.apoderado.nombre = evnt;
        break;
      case 'apepatapod':
        this.apoderado.apPaterno = evnt;
        break;
      case 'apematapod':
        this.apoderado.apMaterno = evnt;
        break;
      case 'datarfc':
        this.apoderado.rfc = evnt;
        break;
      default:
        break;
    }
  }

  /**
   * Metodo para obtener los eventos de los inputs del formulario
   *
   * @param {*} evnt
   * @param {string} field
   * @memberof DevdesaldoComponent
   */
  getDataC( evnt:any, field: string ) {

    switch ( field ) {
      case 'cargosoc':
        this.apoderado.cargoSociedad = evnt;
        break;
      case 'consigleg':
        this.apoderado.considLegal = evnt;
        break;
      case 'numpolizab':
        this.beneficiario.numpoliza = evnt.value;
        break;
      case 'nombrebenb':
        this.beneficiario.titular = evnt;
        break;
      case 'apepatbenb':
        this.beneficiario.priApellido = evnt;
        break;
      case 'apematabenb':
        this.beneficiario.segApellido = evnt;
        break;
      case 'datarfcb':
        this.beneficiario.rfc = evnt;
        break;
      case 'pentrega':
        this.beneficiario.porcentajeDesignado = evnt;
        break;
        default:
          break;
    }

  }

  /**
   * Metodo para obtener los eventos de los inputs del formulario
   *
   * @param {*} evnts
   * @param {string} field
   * @memberof DevdesaldoComponent
   */
  getDataS( evnts: any, field: string ) {

    switch ( field ) {
      case 'formpago':
        this.beneficiario.formaPago = evnts.value;
        break;
      case 'dateactdom':
        this.facultad.dateactdom = evnts;
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
      case 'noCuenta':
        this.beneficiario.noCuenta = evnts;
        break
      default:
        break;
    }

  }

  /**
   * Metodo para obtener el catalogo de entidades federativas de fedatarios
   *
   * @memberof DevdesaldoComponent
   */
  obtenerEntidadesfe() {

    this._catalogos.getEntidades()
          .subscribe( ( resp: any ) => {
            this.entidadesDatafe = resp;
          })
    
  }

  /**
   * Metodo para obtener el catalogo de municipios de fedatarios 
   *
   * @memberof DevdesaldoComponent
   */
  obtenerMunicipiosfe() {

    this._catalogos.getMunicipios( this.datosfed.entidadfe )
        .subscribe( ( resp: any ) => {
          this.municipiosDatafe = resp;
        })

  }

  /**
   * MEtodo para guardar dato fallecido
   *
   * @memberof DevdesaldoComponent
   */
  guardarFallecido() {

    this.titular.id = this.createId();
    this.titulares.push(this.titular);
    this.titulares = [...this.titulares];

    if( this.titular.cuenta === undefined ) {
      this.titular.cuenta = "";
    }

    this.droptitularvalue.push(this.titular.cuenta);

    this.titularesvalue.push({
                                "idSolicitud": this.id,
                                "cuenta": this.titular.cuenta,
                              });

    this.titular = {};
    this.droptitularvalue = [];

    this.cuenta = "";

    this.titular.cuenta = "";

  }

  /**
   * Metodo para eliminar titular
   *
   * @param {*} rowIndex
   * @memberof DevdesaldoComponent
   */
  eliminarTitular( rowIndex: any ) {

    this.titulares.splice(rowIndex, 1);
    this.titularesvalue.splice(rowIndex, 1);

  }

  /**
   * Metodo para guardar los documentos dictaminados
   *
   * @memberof DevdesaldoComponent
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
   * Metodo para eliminar documentos dictaminados
   *
   * @param {*} rowIndex
   * @memberof DevdesaldoComponent
   */
  eliminarDocsDict( rowIndex: any ) {

    if ((this.datosfeds && this.datosfeds.find(item => item.poliza === this.docsdictaminados[rowIndex].poliza)) ||
        (this.apoderados && this.apoderados.find(item => item.poliza === this.docsdictaminados[rowIndex].poliza)) ||
        (this.beneficiarios && this.beneficiarios.find(item => item.poliza === this.docsdictaminados[rowIndex].poliza))) {
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
   * Metodo para guardar fedatario
   *
   * @memberof DevdesaldoComponent
   */
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
   * MEtodo para eliminar fedatario
   *
   * @param {*} rowIndex
   * @memberof DevdesaldoComponent
   */
  eliminarFedatario( rowIndex: any ) {

    this.datosfeds.splice(rowIndex, 1);
    this.datosfedsvalue.splice(rowIndex, 1);

  }

  /**
   * Metodo para guardar facultades
   *
   * @memberof DevdesaldoComponent
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
   * Metodo paracambiar el estado del checkbox
   *
   * @return {*} 
   * @memberof DevdesaldoComponent
   */
  domActValidate() {
    if( this.domainActsCheck === true ) {
      return this.domainActsCheck = 1;
    } else {
      return this.domainActsCheck = 0;
    }
  }

  /**
   * Metodo paracambiar el estado del checkbox
   *
   * @return {*} 
   * @memberof DevdesaldoComponent
   */
  actAdmValidate() {
    if( this.adminActsCheck === true ) {
      return this.adminActsCheck = 1;
    } else {
      return this.adminActsCheck = 0;
    }
  }

  /**
   * Metodo paracambiar el estado del checkbox
   *
   * @return {*} 
   * @memberof DevdesaldoComponent
   */
  pleyCobValidate() {
    if( this.collectionCheck === true ) {
      return this.collectionCheck = 1;
    } else {
      return this.collectionCheck = 0;
    }
  }

  /**
   * Metodo paracambiar el estado del checkbox
   *
   * @return {*} 
   * @memberof DevdesaldoComponent
   */
  otoTituCredValidate() {
    if( this.creditsTitlesCheck === true ) {
      return this.creditsTitlesCheck = 1;
    } else {
      return this.creditsTitlesCheck = 0;
    }
  }

  /**
   * Metodo paracambiar el estado del checkbox
   *
   * @return {*} 
   * @memberof DevdesaldoComponent
   */
  otoDelSusValidate() {
    if( this.substitutionCheck === true ) {
      return this.substitutionCheck = 1;
    } else {
      return this.substitutionCheck = 0;
    }
  }

  /**
   * Metodo paracambiar el estado del checkbox
   *
   * @return {*} 
   * @memberof DevdesaldoComponent
   */
  podEspValidate() {
    if( this.specialMightCheck === true ) {
      return this.specialMightCheck = 1;
    } else {
      return this.specialMightCheck = 0;
    }
  }

  /**
   * Metodo para cambiar el estado del checkbox
   *
   * @param {boolean} selected
   * @param {number} exeType
   * @return {*}  {boolean}
   * @memberof DevdesaldoComponent
   */
  public checkIsRequired(selected : boolean, exeType : number) : boolean {
    return selected && exeType === -1 ? true : false;
  }

  /**
   * Metodo para obtener el valor de tipo de ejercicio
   *
   * @param {number} exeTypeIndex
   * @return {*}  {string}
   * @memberof DevdesaldoComponent
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
   * Metodo para validar el estado 
   *
   * @param {string} facultyValue
   * @return {*}  {string}
   * @memberof DevdesaldoComponent
   */
  public checkIsEmpty(facultyValue: string) : string {
    return facultyValue === "" ? "N/A": facultyValue;
  }

  /**
   * Metodo para reinicializar las variables de las facultades
   *
   * @private
   * @memberof DevdesaldoComponent
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
   * Metodo para guardar apoderado
   *
   * @memberof DevdesaldoComponent
   */
  guardarApoderado(): void {

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
   * MEtodo para eliminar facultad
   *
   * @param {number} indexToDelete
   * @memberof DevdesaldoComponent
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
   * Metodo para eliminar apoderados
   *
   * @param {*} rowIndex
   * @memberof DevdesaldoComponent
   */
  eliminarApoderado( rowIndex: any ) {
    this.apoderadosvalue.splice(rowIndex, 1);
    this.apoderados.splice(rowIndex, 1);
  }

  /**
   * Metodo para buscar id
   *
   * @param {*} id
   * @return {*}  {number}
   * @memberof DevdesaldoComponent
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
   * MEtodo para guardar beneficiario
   *
   * @memberof DevdesaldoComponent
   */
  guardarBeneficiario() {

    if( this.beneficiario.apMaterno === undefined ) {
      this.beneficiario.apMaterno = "";
    }

    this.nombreCompletob = this.beneficiario.titular + ' ' + this.beneficiario.priApellido + ' ' + this.beneficiario.segApellido;

    this.beneficiario.id = this.createId();
    this.beneficiario.nombreCompleto = this.nombreCompletob;
    this.beneficiarios.push(this.beneficiario);
    this.beneficiarios = [...this.beneficiarios];    

    if( this.beneficiario.rfc === undefined ) {
      this.beneficiario.rfc = "";
    }

    if( this.beneficiario.formaPago === undefined ) {
      this.beneficiario.formaPago = "";
    }

    if( this.beneficiario.noCuenta === undefined ) {
      this.beneficiario.noCuenta = "";
    }
    
    this.dropbenefvalue.push(this.beneficiario.numpoliza);
    this.dropbenefvalue.push(this.beneficiario.idPlanDevBenePk);
    this.dropbenefvalue.push(this.beneficiario.titular);
    this.dropbenefvalue.push(this.beneficiario.priApellido);
    this.dropbenefvalue.push(this.beneficiario.segApellido);
    this.dropbenefvalue.push(this.beneficiario.rfc);
    this.dropbenefvalue.push(this.beneficiario.formaPago);
    this.dropbenefvalue.push(this.beneficiario.porcentajeDesignado);
    this.dropbenefvalue.push(this.beneficiario.noCuenta);
    

    this.beneficiariosvalue.push({
                                    "idSolicitud": this.id,
                                    "idPlanDevBenePk": this.beneficiario.idPlanDevBenePk,
                                    "idDictTab": null,
                                    "idArchivo": this.beneficiario.numpoliza,
                                    "porcentajeDesignado": this.beneficiario.porcentajeDesignado,
                                    "titular": this.beneficiario.titular, 
                                    "priApellido": this.beneficiario.priApellido,
                                    "segApellido": this.beneficiario.segApellido,
                                    "rfc": this.beneficiario.rfc,
                                    "formaPago":  this.beneficiario.formaPago,
                                    "formaValor": this.beneficiario.entrega,
                                    "noCuenta": this.beneficiario.noCuenta,
                                  });

    const idApo = this.documentosValue.filter(( obj:any ) => {
      return obj.idArchivo === this.beneficiario.numpoliza;
    });

    idApo.forEach( ( item:any ) => {
      this.beneficiario.poliza = item.poliza;
    });

    if ( this.beneficiario.formaPago === "1" ) {
      this.beneficiario.formpago= 'No. de Cheque';
    } else if( this.beneficiario.formaPago === "2" ) {
      this.beneficiario.formpago = 'Spei';
    } else {
      this.beneficiario.formpago = 'Traspaso de valores';
    }

    this.beneficiario = {};
    this.dropbenefvalue = [];

    this.numpolizab = "";
    this.nombreb = "";
    this.apepatap = "";
    this.apematap = "";
    this.rfc = "";
    this.formpago = "";
    this.porcentajeDesignado = "";
    this.noCuenta = "";

    this.beneficiario.numpoliza = "";
    this.beneficiario.titular = "";
    this.beneficiario.priApellido = "";
    this.beneficiario.segApellido = "";
    this.beneficiario.rfc = "";
    this.beneficiario.formaPago = "";
    this.beneficiario.porcentajeDesignado = "";
    this.beneficiario.noCuenta = "";

  }

  /**
   * MEtodo para eliminar beneficiario
   *
   * @param {*} rowIndex
   * @memberof DevdesaldoComponent
   */
  eliminarBeneficiario( rowIndex: any ) {

    this.beneficiariosvalue.splice(rowIndex, 1);
    this.beneficiarios.splice(rowIndex, 1);

  }

  /**
   * Metodo para guardar data del dictamen
   *
   * @memberof DevdesaldoComponent
   */
  guardarDictamen() {

    this.idfolio = this._route.snapshot.paramMap.get( 'folio' );
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
        
    const data = {

                  "data" : {
                              "idSolicitud": this.id,
                              "razonSocial": this.beneficiarioCheque,
                              "beneficiarioCheque": this.beneficiarioCheque,
                              "idClienteFk": this.foliodata.beanBusqueda.idCliente,
                              "cuentas": this.titularesvalue,
                              "docsDictaminados": this.docsdictaminadosvalue,
                              "fedatarios": this.datosfedsvalue,
                              "apoderadosLeg": this.apoderadosvalue,
                              "beneficiarios": this.beneficiariosvalue
                            },
                        "origin": this.origin,
                        "idSolicitud": this.idDictamen,
                        "ip": this.ipClient,
                        "usrRed": this.usrId,
                        "conn": ""
 
                  }

    this._dictamenes.insupdDevSal ( data )
        .subscribe( resp => {

          this.displayModalAd = true;
          this.messageModalM = 'Sus cambios fueron guardados en el folio' + " " + this.idfolio + "  " + 'con éxito';

        }, (errors) => {
              this.displayModalM = true;
              this.messageModalM = errors.error.errors[0].message;
        });

  }

  /**
   * MEtodo para agregar la lita de items
   *
   * @private
   * @param {any[]} list
   * @param {({ id: string | undefined, nombre: string | undefined })} value
   * @memberof DevdesaldoComponent
   */
  private addItemList(list: any[], value: { id: string | undefined, nombre: string | undefined }): void {
    list.push(value);
 }

  /**
   * Metodo para remover la lista
   *
   * @private
   * @param {any[]} list
   * @param {string} value
   * @memberof DevdesaldoComponent
   */
  private removeItemList(list: any[], value: string): void {
    const findIndex = list.findIndex(item => item.id === value);
    if (findIndex !== -1) { list.splice(findIndex, 1); }  
  }

  /**
   * MEtodo para aceptar borrar registros de documentos
   *
   * @memberof DevdesaldoComponent
   */
  acceptDeleteFile(): void {
    if ((this.datosfeds && this.datosfeds.find(item => item.poliza === this.docsdictaminados[this._indexToDeleteItem].poliza))) {
      this.datosfeds = this.datosfeds.filter(item => item.poliza !== this.docsdictaminados[this._indexToDeleteItem].poliza);
      this.datosfedsvalue = this.datosfedsvalue.filter(item => item.idArchivo !== this.docsdictaminados[this._indexToDeleteItem].idArchivo);
    }
    if ((this.apoderados && this.apoderados.find(item => item.poliza === this.docsdictaminados[this._indexToDeleteItem].poliza))) {
      this.apoderados = this.apoderados.filter(item => item.poliza !== this.docsdictaminados[this._indexToDeleteItem].poliza);
      this.apoderadosvalue = this.apoderadosvalue.filter(item => item.idArchivo !== this.docsdictaminados[this._indexToDeleteItem].idArchivo);
    }
    if ((this.beneficiarios && this.beneficiarios.find(item => item.poliza === this.docsdictaminados[this._indexToDeleteItem].poliza))) {
      this.beneficiarios = this.beneficiarios.filter(item => item.poliza !== this.docsdictaminados[this._indexToDeleteItem].poliza);
      this.beneficiariosvalue = this.beneficiariosvalue.filter(item => item.idArchivo !== this.docsdictaminados[this._indexToDeleteItem].idArchivo);
    }
    this.addItemList(this.arrayFiles, { id: this.docsdictaminados[this._indexToDeleteItem].idArchivo, nombre: this.docsdictaminados[this._indexToDeleteItem].nomArchivo });
    this.docsdictaminados.splice(this._indexToDeleteItem, 1);
    this.docsdictaminadosvalue.splice(this._indexToDeleteItem, 1);
    this.documentosValue.splice(this._indexToDeleteItem, 1);
    this.confirmDeleteDictum = false;

  }

  onRowEditInittitular(indexRow: number, titular: Titulares) {
    this.indexActiveEdittitular = indexRow;
    this.cloneTitular[titular.id!] = {...titular};
  }

  onRowEditSavetitular(rowIndex: number, titular: Titulares) {

    const datatitularesvalue = {
      "idSolicitud": this.id,
      "cuenta": titular.cuenta,
    }
    
    this.titulares.splice(rowIndex, 1, titular);
    this.titularesvalue.splice(rowIndex, 1, datatitularesvalue);

  }

  onRowEditCanceltitular(indexRow: number, titular: Titulares): void {
    this.titulares[indexRow] = this.cloneTitular[titular.id!];
    delete this.cloneTitular[titular.id!];
    this.indexActiveEdittitular = -1;
  }


  onRowEditInit(indexRow: number, docsdictaminado: Docsdictaminados) {
    this.indexActiveEdit = indexRow;
    this.clonedDocumentos[docsdictaminado.id!] = {...docsdictaminado};
  }

  onRowEditSave(rowIndex: number, docsdictaminado: Docsdictaminados) {

    const datadocsdictaminadosvalue = {
      "idArchivo": docsdictaminado.idArchivo,
      "poliza": docsdictaminado.poliza, 
      "fchEmisionEscr": docsdictaminado.fchEmisionEscr,
      "actos": docsdictaminado.actos, 
      "articulo": docsdictaminado.articulo, 
      "consideraciones": docsdictaminado.consideraciones,
    }
    
    this.docsdictaminados.splice(rowIndex, 1, docsdictaminado);
    this.docsdictaminadosvalue.splice(rowIndex, 1, datadocsdictaminadosvalue);

    const oldData = this.clonedDocumentos[docsdictaminado.id!];

    if (oldData.poliza !== docsdictaminado.poliza) {
      this.documentosValue.forEach(itemDocumentos => {
        if (itemDocumentos.poliza === oldData.poliza) {
          itemDocumentos.poliza = docsdictaminado.poliza;
        }
      });
    }

    this.updateFeds( docsdictaminado );

  }

  private updateFeds( item: any ): void {

    const oldData = this.clonedDocumentos[item.id!];

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

  private updateApod( item: any ): void {

    const oldData = this.clonedDocumentos[item.id!];

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

    this.updateBenef( item );

  }

  private updateBenef( item: any ): void {

    const oldData = this.clonedDocumentos[item.id!];

    if(this.beneficiarios && this.beneficiarios.length > 0) {
      this.beneficiarios.forEach( itemBeneficiarios => {
        if(itemBeneficiarios.poliza === oldData.poliza) {
          itemBeneficiarios.poliza = item.poliza;
        }
      });
    }

    if (this.beneficiario && this.beneficiariosvalue.length > 0) {
      this.beneficiariosvalue.forEach( itemBeneficiariosValue => {
        if(itemBeneficiariosValue.poliza === oldData.poliza) {
          itemBeneficiariosValue.poliza = item.poliza;
        }
      });
    }

    delete this.clonedDocumentos[item.id!];
  
  }

  onRowEditCancel(indexRow: number, item: Docsdictaminados): void {
    this.docsdictaminados[indexRow] = this.clonedDocumentos[item.id!];
    delete this.clonedDocumentos[item.id!];
    this.indexActiveEdit = -1;
  }

  onRowEditFed(indexRow: number, datosfed: Datosfedatario): void {
    this.indexActiveEditFed = indexRow;
    this.cloneFedatario[datosfed.id!] = {...datosfed};

    
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

    this.datosfeds[indexRow] = this.cloneFedatario[item.id!];
    delete this.cloneFedatario[item.id!];
    this.indexActiveEditFed = -1;
  }

  onRowEditSaveFed(rowIndex: number, datosfed: Datosfedatario) {

    this.nomEntidadfe = this.entidadesDatafe.filter(( entid: any ) => {
      return entid.idEntidadFed === this.datosfed.entidadfe;
    });

    this.nomMunicipiofe = this.municipiosDatafe.filter(( munic: any )  => {
      return munic.idMunicipio === this.datosfed.municipiofe;
    });

    datosfed.entidadfe = this.datosfed.entidadfe;
    datosfed.municipiofe = this.datosfed.municipiofe;
    datosfed.estadoNombre = this.nomEntidadfe[0]?.nombre;

    if(this.datosfed.municipiofe === datosfed.municipio) {
      datosfed.municipioNombre = this.datosfed.municipioNombre;
    }else if(this.nomMunicipiofe.length <= 0) {
      datosfed.municipioNombre = '';
    } else {
      datosfed.municipioNombre = this.nomMunicipiofe[0]?.nombre;
    }

    const datadatosfedsvalue = {
        "idArchivo": datosfed.num_escritura_fed === undefined ? datosfed.idArchivo : datosfed.num_escritura_fed,
        "idFedatarioPk": datosfed.idFedatarioPk,
        "nomFedatario": datosfed.nomFedatario,
        "numFedatario": datosfed.numFedatario,
        "estado": datosfed.entidadfe,
        "municipio": datosfed.municipiofe
    };
    this.datosfeds.splice(rowIndex, 1, datosfed);
    this.datosfedsvalue.splice(rowIndex, 1, datadatosfedsvalue);
    delete this.cloneFedatario[datosfed.id!];
    
  }

  /**
   * Cerrar modal eliminar
   *
   * @memberof DevdesaldoComponent
   */
  closeDialogDeleteFile(): void {
    this.confirmDeleteDictum = false;
  }

  /**
   * Mostrar modal
   *
   * @memberof DevdesaldoComponent
   */
  displayMInter() {
    
    this.displayModalInter = true;
    this.setDataFaculty(this._faculties);

  }

  /**
   * Cerrar modal
   *
   * @memberof DevdesaldoComponent
   */
  closeInterModal() {
    this.displayModalInter = false;
  }

  /**
   * Cerrar modal
   *
   * @memberof DevdesaldoComponent
   */
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

  /**
   * Validar tab de documentos
   *
   * @param {*} value
   * @memberof DevdesaldoComponent
   */
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

  /**
   * Metodo para ducplicar apoderados
   *
   * @param {number} indexRow
   * @memberof DevdesaldoComponent
   */
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
        apPaterno: this.apoderados[this._indexRowDuplicateRepresentative].apPaterno,
        apMaterno: this.apoderados[this._indexRowDuplicateRepresentative].apMaterno,
        cargoSociedad: this.apoderados[this._indexRowDuplicateRepresentative].cargoSociedad,
        considLegal: this.apoderados[this._indexRowDuplicateRepresentative].considLegal,
        facultades: this.apoderadosvalue[this._indexRowDuplicateRepresentative].facultades,
        nombre: this.apoderados[this._indexRowDuplicateRepresentative].nombre,
        rfc: this.apoderados[this._indexRowDuplicateRepresentative].rfc
      });

      this.confirmDuplicateRepresentative = false;
      this._indexRowDuplicateRepresentative = -1;
    }
  }

  /**
   * Metodo para editar apoderados
   *
   * @param {number} rowIndex
   * @memberof DevdesaldoComponent
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
   * Metodo para establecer valores de las facultades
   *
   * @private
   * @param {(Array<any> | undefined)} facultyList
   * @memberof DevdesaldoComponent
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
   * Validar checkbox
   *
   * @param {number} item
   * @return {*}  {boolean}
   * @memberof DevdesaldoComponent
   */
  validateCheck( item: number ): boolean {
    return item === 1 ? true : false;
  }

    /**
   * Metodo para actualizar item
   *
   * @memberof DevdesaldoComponent
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
   * Metodo para cancelar actualizacion de apoderado
   *
   * @memberof DevdesaldoComponent
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

  editBeneficiary(rowIndex: number): void {

    this.editBeneficiaryActive = true;
    this._indexRowEditBeneficiary = rowIndex;
    
    if (this.beneficiarios[rowIndex]) {
      this.idArchivo = String(this.beneficiarios[rowIndex].numpoliza);
      this.numpolizab = String(this.beneficiarios[rowIndex].numpoliza === undefined ? this.beneficiarios[rowIndex].idArchivo : this.beneficiarios[rowIndex].numpoliza);
      this.nombreb = String(this.beneficiarios[rowIndex].titular);
      this.apepatap = String(this.beneficiarios[rowIndex].priApellido);
      this.apematap = String(this.beneficiarios[rowIndex].segApellido);
      this.rfc = String(this.beneficiarios[rowIndex].rfc);
      this.formpago = String(this.beneficiarios[rowIndex].formaPago);
      this.noCuenta = String(this.beneficiarios[rowIndex].noCuenta);
      this.porcentajeDesignado = String(this.beneficiarios[rowIndex].porcentajeDesignado);

      this.beneficiario.idArchivo = String(this.beneficiarios[rowIndex].numpoliza === undefined ? this.beneficiarios[rowIndex].idArchivo : this.beneficiarios[rowIndex].numpoliza);
      this.beneficiario.idApoderadoPk = "";
      this.beneficiario.poliza = String(this.beneficiarios[rowIndex].poliza);
      this.beneficiario.titular = String(this.beneficiarios[rowIndex].titular);
      this.beneficiario.priApellido = String(this.beneficiarios[rowIndex].priApellido);
      this.beneficiario.segApellido = this.beneficiarios[rowIndex].segApellido;
      this.beneficiario.rfc = this.beneficiarios[rowIndex].rfc;
      this.beneficiario.formaPago = this.beneficiarios[rowIndex].formaPago;
      this.beneficiario.formpago = this.beneficiarios[rowIndex].formpago;
      this.beneficiario.formaPagoDesc = this.beneficiarios[rowIndex].formaPagoDesc;
      this.beneficiario.noCuenta = this.beneficiarios[rowIndex].noCuenta;
      this.beneficiario.porcentajeDesignado = this.beneficiarios[rowIndex].porcentajeDesignado;

      this.rowIndexActiveBeneficiary = rowIndex;

    }
  }

  updateBeneficiaryItem(): void {

    setTimeout(() => {
      const nameComplet = this.beneficiario.titular + ' ' + this.beneficiario.priApellido + ' ' + this.beneficiario.segApellido;
      this.beneficiario.id = this.createId();
      this.beneficiario.nombreCompleto = nameComplet;

      const idApo = this.documentosValue.filter(( obj:any ) => {
        return obj.idArchivo === this.beneficiario.numpoliza;
      });

      idApo.forEach( ( item:any ) => {
        this.beneficiario.poliza = item.poliza;
      });
      
      const beneficiarioObject = this.beneficiarios.find((item, index) => index === this._indexRowEditBeneficiary);

      if (beneficiarioObject) {
        beneficiarioObject.idArchivo = this.beneficiario.idArchivo;
        beneficiarioObject.priApellido = this.beneficiario.priApellido;
        beneficiarioObject.segApellido = this.beneficiario.segApellido;
        beneficiarioObject.rfc = this.beneficiario.rfc;
        beneficiarioObject.porcentajeDesignado = this.beneficiario.porcentajeDesignado;
        beneficiarioObject.titular = this.beneficiario.titular;
        beneficiarioObject.nombreCompleto = this.beneficiario.nombreCompleto;
        beneficiarioObject.formaPago = this.beneficiario.formaPago;
        beneficiarioObject.formaPagoDesc = this.beneficiario.formaPago;
        beneficiarioObject.formpago = this.beneficiario.formpago;
        beneficiarioObject.noCuenta = this.beneficiario.noCuenta;
        beneficiarioObject.poliza = this.beneficiario.poliza;

        if ( beneficiarioObject.formaPago === "1" ) {
          beneficiarioObject.formpago = 'No. de Cheque';
          beneficiarioObject.formaPagoDesc = 'No. de Cheque';
        } else if( beneficiarioObject.formaPago === "2" ) {
          beneficiarioObject.formpago = 'Spei';
          beneficiarioObject.formaPagoDesc = 'Spei';
        } else {
          beneficiarioObject.formpago = 'Traspaso de valores';
          beneficiarioObject.formaPagoDesc = 'Traspaso de valores';
        }

      }

      const beneficiarioValueObject = this.beneficiariosvalue.find((item, index) => index === this._indexRowEditBeneficiary);

      if (beneficiarioValueObject) {
        beneficiarioValueObject.idArchivo = this.beneficiario.numpoliza === undefined ? this.beneficiario.idArchivo : this.beneficiario.numpoliza;
        beneficiarioValueObject.porcentajeDesignado = this.beneficiario.porcentajeDesignado;
        beneficiarioValueObject.titular = this.beneficiario.titular;
        beneficiarioValueObject.priApellido = this.beneficiario.priApellido;
        beneficiarioValueObject.segApellido = this.beneficiario.segApellido;
        beneficiarioValueObject.rfc = this.beneficiario.rfc;
        beneficiarioValueObject.formaPago = this.beneficiario.formaPago;
        beneficiarioValueObject.formpago = this.beneficiario.formpago;
        beneficiarioValueObject.formaValor = "";
        beneficiarioValueObject.noCuenta = this.beneficiario.noCuenta;
        beneficiarioValueObject.poliza = this.beneficiario.poliza;
      }

      this.cancelUpdateBenefItem();

    }, 100);
  }

  duplicateItemBeneficiary(indexRow: number): void {
    
    this._indexRowDuplicateBeneficiary = indexRow;
    if (this._indexRowDuplicateBeneficiary !== -1) {

      this._idLongBeneficiarysData++;
      const item: Beneficiarios = {
        idAux: this._idLongBeneficiarysData,
        priApellido: this.beneficiarios[this._indexRowDuplicateBeneficiary].priApellido,
        segApellido: this.beneficiarios[this._indexRowDuplicateBeneficiary].segApellido,
        idArchivo: this.beneficiarios[this._indexRowDuplicateBeneficiary].idArchivo,
        titular: this.beneficiarios[this._indexRowDuplicateBeneficiary].titular,
        nombreCompleto: this.beneficiarios[this._indexRowDuplicateBeneficiary].nombreCompleto,
        numpoliza: this.beneficiarios[this._indexRowDuplicateBeneficiary].idArchivo,
        poliza: this.beneficiarios[this._indexRowDuplicateBeneficiary].poliza,
        rfc: this.beneficiarios[this._indexRowDuplicateBeneficiary].rfc,
        formaPago: this.beneficiarios[this._indexRowDuplicateBeneficiary].formaPago,
        formaPagoDesc: this.beneficiarios[this._indexRowDuplicateBeneficiary].formpago,
        formpago: this.beneficiarios[this._indexRowDuplicateBeneficiary].formpago,
        porcentajeDesignado: this.beneficiarios[this._indexRowDuplicateBeneficiary].porcentajeDesignado,
        noCuenta: this.beneficiarios[this._indexRowDuplicateBeneficiary].noCuenta
      };
      this.beneficiarios.push(item);
      this.beneficiariosvalue.push({
        formaPago: this.beneficiarios[this._indexRowDuplicateBeneficiary].formaPago,
        formaPagoDesc: this.beneficiarios[this._indexRowDuplicateBeneficiary].formpago,
        formaValor: "",
        idArchivo: this.beneficiarios[this._indexRowDuplicateBeneficiary].idArchivo,
        idPlanDevBenePk: "",
        idSolicitud: this.beneficiarios[this._indexRowDuplicateBeneficiary].idSolicitud,
        noCuenta: this.beneficiarios[this._indexRowDuplicateBeneficiary].noCuenta,
        poliza: this.beneficiarios[this._indexRowDuplicateBeneficiary].poliza,
        porcentajeDesignado: this.beneficiarios[this._indexRowDuplicateBeneficiary].porcentajeDesignado,
        priApellido: this.beneficiarios[this._indexRowDuplicateBeneficiary].priApellido,
        segApellido: this.beneficiarios[this._indexRowDuplicateBeneficiary].segApellido,
        titular: this.beneficiarios[this._indexRowDuplicateBeneficiary].titular,
        rfc: this.beneficiarios[this._indexRowDuplicateBeneficiary].rfc,
      });

      this.confirmDuplicateBeneficiary = false;
      this._indexRowDuplicateBeneficiary = -1;
    }
  }

  cancelUpdateBenefItem(): void {
    this.rowIndexActiveBeneficiary = -1;
    this.editBeneficiaryActive = false;
    this._indexRowEditBeneficiary = -1;

    this.titular = {};

    this.numpolizab = "";
    this.nombreb = "";
    this.apepatap = "";
    this.apematap = "";
    this.rfc = "";
    this.formpago = "";
    this.noCuenta = "";
    this.porcentajeDesignado = "";

    this.beneficiario.poliza = "";
    this.beneficiario.nombreCompleto = "";
    this.beneficiario.rfc = "";
    this.beneficiario.formaPago = "";
    this.beneficiario.formpago = "";
    this.beneficiario.noCuenta = "";
    this.beneficiario.porcentajeDesignado = "";
    this._reInitFacultiesValues();
  }

  /**
   * Metodo para borrar duplicados
   *
   * @private
   * @memberof DevdesaldoComponent
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
