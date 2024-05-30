import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Datosinsc } from 'src/app/interfaces/datosinsc.interface';

import { Apoderados } from '../../../interfaces/apoderados.interface';
import { Intervinientes } from '../../../interfaces/beneficiarios.interface';
import { Datosfedatario } from '../../../interfaces/datosfedatario.interface';
import { Docsdictaminados } from '../../../interfaces/docsdictaminados.interface';
import { Entidades } from '../../../interfaces/entidades.interface';
import { Facultades } from '../../../interfaces/facultades.interface';
import { Municipios } from '../../../interfaces/municipios.interface';

import { CatalogosService } from '../../../servicios/catalogos.service';
import { DictamenesService } from '../../../servicios/dictamenes.service';
import { DictaminacionService } from '../../../servicios/dictaminacion.service';
import { IntervinienteService } from '../../../servicios/intervinientes.service';

@Component({
  selector: 'app-fideicomiso',
  templateUrl: './fideicomiso.component.html',
  styles: [
  ]
})
export class FideicomisoComponent implements OnInit {

  @Output() closeMod = new EventEmitter<any>();

  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

  id!: string;

  idDictamen!: string;

  idcliente!: string;

  fipo_fid!: any;

  fin_fid!: any;

  pat_fid!: any;

  num_int!: any;

  fechaconst!: any;

  idfolio!: any;

  foliodata!: any;

  origin!: any;

  insart!: any;

  buc!: string;

  nombre_razon!: string;

  idTipoDict!: string;

  idSubDictamen!: string;

  page: number = 1;

  totalPages: number = 0;

  isReady = true;

  idArchivo!: string;

  idArchivoi!: string;

  poliza!: string;

  nomArchivo!: string;

  fchEmisionEscr!: string;

  actos!: string;

  articulo!: string;

  consideraciones!: string;

  registro!: string;

  aviso!: string;

  dataFiltersb!: any;

  daravisovalue!: any;

  femaviso!: string;

  nomFedatario!: string;

  num_escritura_f!: string;

  numFedatario!: string;

  folioMerc!: string;

  entidadfe!: string;

  municipiofe!: string;

  fchInscripcion!: string;

  arrayFiles: any[] = new Array;

  respFiles: any[] = new Array;

  clonedDocumentos: { [s: string]: Docsdictaminados; } = {};

  cloneFedatario: { [s: string]: Datosfedatario; } = {};

  cloneDatosIns: { [s: string]: Datosinsc; } = {};

  indexActiveEdit: number = -1;

  indexActiveEditFed: number = -1;

  entidadesDatadi!: Entidades[];
  
  municipiosDatadi: Municipios[] = [];

  entidadesDatafe: Entidades[] = [];
  
  municipiosDatafe!: Municipios[];

  entidaddi!: string;

  nomEntidaddi!: Entidades[];

  nomEntidadfe: Entidades[] = [];

  municipiodi!: string;

  nomMunicipiodi: Municipios[] = []; 

  nomMunicipiofe!: Municipios[];

  num_escritura_fed!: string;

  numpoliza!: any;

  nombre!: string;

  apPaterno!: string;

  apMaterno!: string;

  rfc!: string;

  rfcb!: string;

  ipClient: any;

  usrId: any;

  cargoSociedad!: string;

  cargoFideicomiso!: string;

  considLegal!: string;

  consleg!: string;

  nombreCompleto!: string;

  numpolizab!: any;

  nombreb!: string;

  nombreCompletob!: string;

  apepatapb!: string;

  apematapb!: string;

  tipoejercicio!: any;

  dictNotFound: any;

  maxDate!: Date;

  dateactdom!: string;
  
  dateactadm!: string;

  datepleicob!: string;

  dateotorgtitul!: string;

  dateotredesu!: string;

  datepodesp!: string;

  displayModalM = false;

  headerModalM!: string;


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


  intervinientes!: Intervinientes[];

  selectedintervinientes!: Intervinientes;

  intervinientesvalue: any[] = new Array;

  interviniente: any;

  intervinientesSaved!: Array<object>;


  dropdocvalue: any[] = [];

  dropapodvalue: any[] = [];

  dropfedvalue: any[] = [];

  dropbenefvalue: any[] = [];

  dropdatinscvalue: any[] = [];

  messageModalM!: string;

  displayModalAd: boolean = false;

  displayModalInter: boolean = false;

  displayModalBenef: boolean = false;

  displayModalFaclegis: boolean = false;

  confirmDeleteDictum: boolean = false;

  confirmDuplicateRepresentative: boolean = false;

  confirmDuplicateInterviniente: boolean = false;
  
  editRepresentativeActive: boolean = false;
  
  rowIndexActive: number = -1;

  rowIndexFederatarioActive: number = -1;

  rowIndexDatosJuzActive: number = -1;

  editIntervinienteActive: boolean = false;
  
  rowIndexIntervinienteActive: number = -1;  

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
  private _endings : Array<object> = [];
  private _endings_back : Array<object> = [];
  private _arrayEndings_back : any[] = [];
  private _indexToDeleteItem! : number;
  private _indexRowEditRepresentative: number = -1;
  private _indexRowDuplicateRepresentative: number = -1;

  private _indexRowDuplicateInterviniente: number = -1;

  private _indexRowEditInterviniente: number = -1;

  private _idLongRepresentativesData: number = -1;

  private _idLongIntervinientesData: number = -1;

  //Actividad Gubernamental
  public activGuber : any = false;
  //Agente Aduanal
  public ageAdu : any = false;
  //Agricultura/Ganadería/Pesca
  public agriGanPes : any = false;
  //Alimentos/Abarrotes/Bebidas no Alcohólicas
  public aliAbarBeb : any = false;
  //Armas de fuego y accesorios
  public armFueAcc : any = false;
  //Arrendamiento muebles/inmuebles
  public arrenMuebInm : any = false;
  //Art de Oficina/fotografía/deporte
  public artOficFoto : any = false;
  //Bares/Cantinas/ y Centros Nocturnos
  public barCantCenNoc : any = false;
  //Bca Múltiple/Bca Desarrollo/Fomento
  public bcaMultDesFom : any = false;
  //Casas de Bolsa
  public casaBolsa : any = false;
  //Centro cambiarios/Casas de Cambio
  public cenCambCasCamb : any = false;
  //Cine, Radio, TV y Medios Impresos
  public cineRadTvMed : any = false;
  //Comercialización de Textiles
  public comTextiles : any = false;
  //Comercializadora en General
  public comerGeneral : any = false;
  //Comercio bebidas alcohólicas y tabaco
  public comerBebAlcTab : any = false;
  //Compra venta de inmuebles
  public compVentInm : any = false;
  //Compra venta de Antigüedades y arte
  public compVentAnt : any = false;
  //Maquinaria
  public maquinaria : any = false;
  //Empleado del sector privado
  public empsectpub : any = false;
  //Materiales de desecho/chatarrero
  public matdesh : any = false;
  //Estudiante
  public estudiante : any = false;
  //Minería/Metalúrgica/ Industrial Química
  public minmetind : any = false;
  //Montepío/Casa de Empeño
  public casaemp : any = false;
  //Notario Público/ Corredores
  public notpublic : any = false;
  //Org. Cívicas/sin fines de lucro/religiosas
  public orgcivic : any = false;
  //Jubilado/pensionado
  public jubilado : any = false;
  //Oro/Plata/Joyas/Piedras Preciosas/Relojes
  public oroplat : any = false;
  //Papel, madera
  public papmad : any = false;
  //Petróleo, derivados, gas, energía
  public petroleodev : any = false;
  //Pirámides
  public piramides : any = false;
  //Prendas de Vestir
  public prendas : any = false;
  //Prestamista
  public prestamista : any = false;
  //Refacciones y accesorios automotrices
  public refaccaut : any = false;
  //Seguros y Fianzas
  public segfuanz : any = false;
  //Construct Infraestructura (Obra Civil)
  public constinfra : any = false;
  //Constructora de Inmuebles
  public constinmu : any = false;
  //Corresp. Cambiario/Corresp Bancario
  public correspcambiar : any = false;
  //Hoteles y Restaurantes
  public hotelrest : any = false;
  //Energía Eléctrica/ Suministro de Energía
  public energsum : any = false;
  //ENT. FIN. Sin presencia en México
  public efinmexico : any = false;
  //Entidades de Ahorro y Crédito Popular
  public entahorrcred : any = false;
  //Entidades Préstamo/Caja de Ahorro
  public entprestaho : any = false;
  //Explosivos/Dinamita
  public explosivos : any = false;
  //Extrac/Comer, cobre, uranio, urea, hierro
  public cobreuranio : any = false;
  //Fabricación de textiles
  public fabtextiles : any = false;
  //Fideicomisos
  public fideicomiso : any = false;
  //Grupo Mercan. Prof. Político y Laboral
  public gpomercanpol : any = false;
  //Desempleado
  public desempleado : any = false;
  //Juegos y Apuestas/Hipódromo
  public juegosbet : any = false;
  //Juguetes/electrodomésticos/ art para el hogar
  public jugelectro : any = false;
  //Serv. Artísticos, culturales, deportivos
  public servacult : any = false;
  //Serv. Profesionales Técnicos y Científicos
  public servproftec : any = false;
  //Serv, de Blindaje o Seguridad
  public servblindseg : any = false;
  //Serv de Consultoría y Asesoría
  public servconsaseso : any = false;
  //Serv. De Mensajería y Paquetería
  public servmenspaq : any = false;
  //Serv. De Salud Médicos y Sanitarios
  public servmedsanit : any = false;
  //Servicios de telecomunicaciones
  public servtelecom : any = false;
  //Servicios de transporte
  public servtranspo : any = false;
  //Servicios educativos
  public serveducat : any = false;
  //Quehaceres del hogar/ama de casa
  public quehacerhog : any = false;
  //Servicios legales
  public servlegal : any = false;
  //Soc. Finan de Objeto Múltiple No regulada
  public socfinanmult : any = false;
  //Sociedades de Inversión
  public socinver : any = false;
  //TDC/Tarjeta pre-pago/Instr de pago cheque de viajero
  public tdctarjetapago : any = false;
  //Transmisor de dinero o disp. De fondos
  public trdinerofond : any = false;
  //Traslado o custodia de valores
  public transladoval : any = false;
  //Venta y distribución de vehículos automotrices
  public distvehiculos : any = false; 
  //Fabricación y comer de Alfarería, porcelana, loza 
  public fabalfareria : any = false;
  //Serv. De cuidado personal, estéticas
  public srvcuidpers : any = false;
  //Tlapalerías/ferreterías/ y derivados
  public tlapferrete : any = false;

  fipo_fidf = new FormControl(null, [Validators.required]);
  fin_fidf = new FormControl(null, [Validators.required]);
  pat_fidf = new FormControl(null, [Validators.required]);
  num_intf = new FormControl(null, [Validators.required]);

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
    ];

    this.daravisovalue = [
      {
        "id": 1,
        "nombre": "SI",
      },
      {
        "id": 0,
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

    this.docsdictaminados = [];
    this.docsdictaminado = {};
    this.datosinscs = [];
    this.datosinsc = {};
    this.datosfeds = [];
    this.datosfed = {};
    this.apoderados = [];
    this.apoderado = {};
    this.facultad = {};
    this.intervinientes = [];
    this.interviniente = {};

    this.maxDate = new Date();
  }

  obtenerIdFolio() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrId = localStorage.getItem("uId");
    const idfolio = this._route.snapshot.paramMap.get( 'folio' );
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
    this.usrId = localStorage.getItem("uId");
    const idfolio = this.id;
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
                          this.getFidLast();
                          this.obtenerDocumentos();
                          this.obtenerEntidadesdi();
                          this.obtenerEntidadesfe();

                        })

  }

  getFidLast() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrId = localStorage.getItem('uId');

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
  
          const docsresp = resp.beanDictamenFideicomiso;
          const newArrayEndings = docsresp.beanHistorico.fines;
          
          this.fipo_fid = docsresp.beanHistorico.tipoFideicomiso;
          this.fin_fid = docsresp.beanHistorico.finesFideicomiso;
          this.pat_fid = docsresp.beanHistorico.patrimonioFideicomiso;
          this.fechaconst = docsresp.beanHistorico.fechaConstitucion;
          this.dataFiltersb.fechaconst = docsresp.beanHistorico.fechaConstitucion;
          this.num_int = docsresp.beanHistorico.numeroIntervinientes;
          this.origin = resp.beanDictamenFideicomiso;

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
          this.setTargetTrustValue(docsresp.beanHistorico.fines);
          this.setTargetTrustValueTwo(docsresp.beanHistorico.fines);
          this.setTargetTrustValueThree(docsresp.beanHistorico.fines);
          this.setTargetTrustValueFour(docsresp.beanHistorico.fines);
          this.setTargetTrustValueFive(docsresp.beanHistorico.fines);
          this.setTargetTrustValueSix(docsresp.beanHistorico.fines);
          this.setTargetTrustValueSeven(docsresp.beanHistorico.fines);
          this.setTargetTrustValueEight(docsresp.beanHistorico.fines);
          this.saveLegislativePowers();

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

          const interv = docsresp.intervinientes;
          const newinterv = interv.map(( objinterv:any ) => ({
            ...objinterv,
            id: this.createId(),
            idSolicitud: this.id
          }));
          newinterv.forEach( ( item:any ) => {

            this.interviniente.id = this.createId();

            this.intervinientes.push({
              "idAux": this._idLongIntervinientesData,
              "idArchivo": item.idArchivo,
              "apMaterno": item.apMaterno,
              "apPaterno": item.apPaterno,
              "cargoFide": item.cargoFide,
              "nombre": item.nombre,
              "numpolizab": item.poliza,
              "nombreCompletob": item.nombre + ' ' + item.apPaterno + ' ' + item.apMaterno,
              "rfc": item.rfc,
              "poliza": item.poliza,
            });
            this._idLongIntervinientesData++;

            this.intervinientes = [...this.intervinientes];

            this.intervinientesvalue.push({
              "idArchivo": item.idArchivo,
              "idDictIntervPk": item.idDictIntervPk,
              "nombre": item.nombre,
              "apPaterno": item.apPaterno,
              "apMaterno": item.apMaterno,
              "rfc": item.rfc,
              "cargoFide": item.cargoFide,
            })

          });
  
    });
  
  }

private setTargetTrustValue(listFid: Array<any>): void {
  if (listFid && listFid.length > 0) {
    
    listFid.forEach((item, index) => {
      switch (index) {
        case 0:
          this.activGuber = this.validateCheck(item);
          break;
        case 1:
          this.ageAdu = this.validateCheck(item);
          break;
        case 2:
          this.agriGanPes = this.validateCheck(item);
          break;
        case 3:
          this.aliAbarBeb = this.validateCheck(item);
          break;
        case 4:
          this.armFueAcc = this.validateCheck(item);
          break;
        case 5:
          this.arrenMuebInm = this.validateCheck(item);
          break;
        case 6:
          this.artOficFoto = this.validateCheck(item);
          break;
        case 7:
          this.barCantCenNoc = this.validateCheck(item);
          break;
      }
    });
  }
}


private setTargetTrustValueTwo(listFid: Array<any>): void {
  if (listFid && listFid.length > 0) {
    
  listFid.forEach((item, index) => {
  switch (index) {
        case 8:
          this.bcaMultDesFom = this.validateCheck(item);
          break;
        case 9:
          this.casaBolsa = this.validateCheck(item);
          break;
        case 10:
          this.cenCambCasCamb = this.validateCheck(item);
          break;
        case 11:
          this.cineRadTvMed = this.validateCheck(item);
          break;
        case 12:
          this.comTextiles = this.validateCheck(item);
          break;
        case 13:
          this.comerGeneral = this.validateCheck(item);
          break;
        case 14:
          this.comerBebAlcTab = this.validateCheck(item);
          break;
        case 15:
          this.compVentInm = this.validateCheck(item);
          break;
        case 16:
          this.compVentAnt = this.validateCheck(item);
          break;
      }
    });
  }
}

private setTargetTrustValueThree(listFid: Array<any>): void {
  if (listFid && listFid.length > 0) {
    
  listFid.forEach((item, index) => {
  switch (index) {
    case 17:
      this.maquinaria = this.validateCheck(item);
      break;
    case 18:
      this.empsectpub = this.validateCheck(item);
      break;
    case 19:
      this.matdesh = this.validateCheck(item);
      break;
    case 20:
      this.estudiante = this.validateCheck(item);
      break;
    case 21:
      this.minmetind = this.validateCheck(item);
      break;
    case 22:
      this.casaemp = this.validateCheck(item);
      break;
    case 23:
      this.notpublic = this.validateCheck(item);
      break;
    case 24:
      this.orgcivic = this.validateCheck(item);
      break;
      }
    });
  }
}

private setTargetTrustValueFour(listFid: Array<any>): void {
  if (listFid && listFid.length > 0) {
    
  listFid.forEach((item, index) => {
  switch (index) {
      case 25:
        this.jubilado = this.validateCheck(item);
        break;
      case 26:
        this.oroplat = this.validateCheck(item);
        break;
      case 27:
        this.papmad = this.validateCheck(item);
        break;
      case 28:
        this.petroleodev = this.validateCheck(item);
        break;
      case 29:
        this.piramides = this.validateCheck(item);
        break;
      case 30:
        this.prendas = this.validateCheck(item);
        break;
      case 31:
        this.prestamista = this.validateCheck(item);
        break;
      case 32:
        this.refaccaut = this.validateCheck(item);
        break;
      case 33:
        this.segfuanz = this.validateCheck(item);
        break;
      }
    });
  }
}

private setTargetTrustValueFive(listFid: Array<any>): void {
  if (listFid && listFid.length > 0) {
    
  listFid.forEach((item, index) => {
  switch (index) {
      case 34:
        this.constinfra = this.validateCheck(item);
        break;
      case 35:
        this.constinmu = this.validateCheck(item);
        break;
      case 36:
        this.correspcambiar = this.validateCheck(item);
        break;
      case 37:
        this.hotelrest = this.validateCheck(item);
        break;
      case 38:
        this.energsum = this.validateCheck(item);
        break;
      case 39:
        this.efinmexico = this.validateCheck(item);
        break;
      case 40:
        this.entahorrcred = this.validateCheck(item);
        break;
      case 41:
        this.entprestaho = this.validateCheck(item);
        break;
      case 42:
        this.explosivos = this.validateCheck(item);
        break;
      }
    });
  }
}

private setTargetTrustValueSix(listFid: Array<any>): void {
  if (listFid && listFid.length > 0) {
    
  listFid.forEach((item, index) => {
  switch (index) {
      case 43:
        this.cobreuranio = this.validateCheck(item);
        break;
      case 44:
        this.fabtextiles = this.validateCheck(item);
        break;
      case 45:
        this.fideicomiso = this.validateCheck(item);
        break;
      case 46:
        this.gpomercanpol = this.validateCheck(item);
        break;
      case 47:
        this.desempleado = this.validateCheck(item);
        break;
      case 48:
        this.juegosbet = this.validateCheck(item);
        break;
      case 49:
        this.jugelectro = this.validateCheck(item);
        break;
      case 50:
        this.servacult = this.validateCheck(item);
        break;
      case 51:
        this.servproftec = this.validateCheck(item);
        break;
      }
    });
  }
}

private setTargetTrustValueSeven(listFid: Array<any>): void {
  if (listFid && listFid.length > 0) {
    
  listFid.forEach((item, index) => {
  switch (index) {
      case 52:
        this.servblindseg = this.validateCheck(item);
        break;
      case 53:
        this.servconsaseso = this.validateCheck(item);
        break;
      case 54:
        this.servmenspaq = this.validateCheck(item);
        break;
      case 55:
        this.servmedsanit = this.validateCheck(item);
        break;
      case 56:
        this.servtelecom = this.validateCheck(item);
        break;
      case 57:
        this.servtranspo = this.validateCheck(item);
        break;
      case 58:
        this.serveducat = this.validateCheck(item);
        break;
      case 59:
        this.quehacerhog = this.validateCheck(item);
        break;
      case 60:
        this.servlegal = this.validateCheck(item);
        break;
      }
    });
  }
}

private setTargetTrustValueEight(listFid: Array<any>): void {
  if (listFid && listFid.length > 0) {
    
  listFid.forEach((item, index) => {
  switch (index) {
    case 61:
      this.socfinanmult = this.validateCheck(item);
      break;
    case 62:
      this.socinver = this.validateCheck(item);
      break;
    case 63:
      this.tdctarjetapago = this.validateCheck(item);
      break;
    case 64:
      this.trdinerofond = this.validateCheck(item);
      break;
    case 65:
      this.transladoval = this.validateCheck(item);
      break;
    case 66:
      this.distvehiculos = this.validateCheck(item);
      break;
    case 67:
      this.fabalfareria = this.validateCheck(item);
      break;
    case 68:
      this.srvcuidpers = this.validateCheck(item);
      break;
    case 69:
      this.tlapferrete = this.validateCheck(item);
      break;
      }
    });
  }
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

          this.respFiles = resp;

          this.respFiles.forEach( ( item: any ) => {

              this.arrayFiles.push({ "id": item.id, "nombre": item.nombreDocumento });
              this.deleteItemsEquals();
          });

        }, (error) => {
          return error;
        });

  }


  createId() {

    let id = '';
    let chars = '0123456789';
    for ( let i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  
  }

  getData( event: any, field: string ) {

    switch ( field ) {
    case 'idArchivo':
      this.docsdictaminado.idArchivo = event.value;
      break;
    case 'polizaval':
      this.docsdictaminado.poliza = event;
      break;
    case 'fchEmisionEscr':
      this.fchEmisionEscr = event.replaceAll('-', '/');
      this.docsdictaminado.fchEmisionEscr = event;
      this.docsdictaminado.fechaedit = event;
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
    default:
      break;
    }
        
  }

  getDataB( event: any, field: string ) {

    switch ( field ) {
      case 'aviso':
        this.dataFiltersb.aviso = event.value;
        break;
      case 'femaviso':
        this.dataFiltersb.femaviso = event;
        break;
      case 'num_escritura_f':
        this.datosinsc.num_escritura_f = event.value;
      break;
      case 'folio':
        this.datosinsc.folioMerc = event;
      break;
      case 'fchInscripcion':
        this.fchInscripcion = event.replaceAll('-', '/');
        this.datosinsc.fchInscripcion = event;
      break;
      case 'entidaddi':
        this.datosinsc.entidaddi = event.value;
        this.datosinsc.municipiodi = "";
        this.obtenerMunicipiosdi();
      break;
      case 'municipiodi':
        this.datosinsc.municipiodi = event.value;
      break;
      case 'num_escritura_fed':
        this.datosfed.num_escritura_fed = event.value;
      break;
      default:
        break;
    }

  }

  getDataC( event: any, field: string ) {

    switch ( field ) {
      case 'fedat':
        this.datosfed.nomFedatario = event;
        break;
      case 'numfedat':
        this.datosfed.numFedatario = event;
        break;
      case 'entidadfe':
        this.datosfed.entidadfe = event.value;
        this.datosfed.municipiofe = "";
        this.obtenerMunicipiosfe();
        break;
      case 'municipiofe':
        this.datosfed.municipiofe = event.value;
        break;
      case 'numpoliza':
        this.apoderado.numpoliza = event.value;
        break;
      case 'nombreapod':
        this.apoderado.nombre = event;
        break;
      case 'apepatapod':
        this.apoderado.apPaterno = event;
        break;
      case 'apematapod':
        this.apoderado.apMaterno = event;
        break;
      default:
        break;
    }

  }

  getDataD( event: any, field: string ) {

    switch ( field ) {
      case 'cargosoc':
        this.apoderado.cargoSociedad = event;
        break;
      case 'consigleg':
        this.apoderado.considLegal = event;
          break;
      case 'datarfc':
        this.apoderado.rfc = event;
        break;
      default:
        break;
    }

  }

  getDataE( event: any, field: string ) {

    switch ( field ) {
      case 'numpolizab':
        this.interviniente.numpolizab = event.value;
        break;
      case 'nombrebenb':
        this.interviniente.nombre = event;
        break;
      case 'apepatbenb':
        this.interviniente.apPaterno = event;
        break;
      case 'apematabenb':
        this.interviniente.apMaterno = event;
        break;
      case 'datarfcb':
        this.interviniente.rfc = event;
        break;
      case 'cargofid':
        this.interviniente.cargoFide = event;
        break;
      default:
        break;
    }

  }

  getDataS( evnts: any, field: string ) {

    switch ( field ) {
      case 'fechaconst':
        this.dataFiltersb.fechaconst = evnts;
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
      default:
        break;
    }

}

  public checkIsRequired(selected : boolean, exeType : number) : boolean {
    return selected && exeType === -1 ? true : false;
  }

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

  public checkIsEmpty(facultyValue: string) : string {
    return facultyValue === "" ? "N/A": facultyValue;
  }

  public deleteFaculty(indexToDelete:number) : void {
    this.apoderados = this.apoderados.filter((item,index)=>{

      return index !== indexToDelete;
      
    });

    this.apoderadosvalue = this.apoderadosvalue.filter((item,index)=>{
      return index !== indexToDelete;
    });
  }

  eliminarApoderado( rowIndex: any ) {
    this.apoderadosvalue.splice(rowIndex, 1);
    this.apoderados.splice(rowIndex, 1);
  }

  public deleteClasif(indexToDelete:number) : void {
    this.intervinientes = this.intervinientes.filter((item,index)=>{

      return index !== indexToDelete;
      
    });

    this.intervinientesvalue = this.intervinientesvalue.filter((item,index)=>{

      return index !== indexToDelete;

    });
  }

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
                                        "consideraciones": this.docsdictaminado.consideraciones,
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

    this.nomEntidadfe = this.entidadesDatafe.filter(( munic: any ) => {
      return munic.idEntidadFed === this.datosfed.entidadfe;
    });

    this.nomMunicipiofe = this.municipiosDatafe.filter(( entid: any )  => {
      return entid.idMunicipio === this.datosfed.municipiofe;
    });

    this.datosfed.estadoNombre = this.nomEntidadfe[0]?.nombre;
    this.datosfed.municipioNombre = this.nomMunicipiofe[0]?.nombre;

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

  eliminarFedatario( rowIndex: any ) {

    this.datosfeds.splice(rowIndex, 1);
    this.datosfedsvalue.splice(rowIndex, 1);

  }

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
                                  "nombreCompleto": this.apoderado.nombreCompleto,
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

  guardarInterviniente() {

    if( this.interviniente.apPaterno === undefined ) {
      this.interviniente.apPaterno = "";
    }

    if( this.interviniente.apMaterno === undefined ) {
      this.interviniente.apMaterno = "";
    }

    this.intervinientes.forEach(( id:any ) => {
      this._idLongIntervinientesData = id.idAux + 2; 
    })

    this.nombreCompletob = this.interviniente.nombre + ' ' + this.interviniente.apPaterno + ' ' + this.interviniente.apMaterno;
    
    this.interviniente.idArchivoi = this.interviniente.numpolizab
    this.interviniente.id = this.createId();
    this.interviniente.nombreCompletob = this.nombreCompletob;
    this.apoderado.idAux = this._idLongIntervinientesData;
    this.intervinientes.push(this.interviniente);
    this.intervinientes = [...this.intervinientes];

    if( this.interviniente.numpolizab === undefined ) {
      this.interviniente.numpolizab = "";
    }

    if( this.interviniente.nombre === undefined ) {
      this.interviniente.nombre = "";
    }

    if( this.interviniente.rfc === undefined ) {
      this.interviniente.rfc = "";
    }

    if( this.interviniente.cargoFide === undefined ) {
      this.interviniente.cargoFide = "";
    }

    this.dropbenefvalue.push(this.interviniente.numpolizab);
    this.dropbenefvalue.push(this.interviniente.idDictIntervPk);
    this.dropbenefvalue.push(this.interviniente.nombre);
    this.dropbenefvalue.push(this.interviniente.apPaterno);
    this.dropbenefvalue.push(this.interviniente.apMaterno);
    this.dropbenefvalue.push(this.interviniente.rfc);
    this.dropbenefvalue.push(this.interviniente.cargoFide);

    this.intervinientesvalue.push({
                                    "idArchivo": this.interviniente.numpolizab,
                                    "idDictIntervPk": this.interviniente.idDictIntervPk,
                                    "nombre": this.interviniente.nombre,
                                    "apPaterno": this.interviniente.apPaterno,
                                    "apMaterno": this.interviniente.apMaterno,
                                    "rfc": this.interviniente.rfc,
                                    "cargoFide": this.interviniente.cargoFide
                                  });


    const idApo = this.documentosValue.filter(( obj:any ) => {
      return obj.idArchivo === this.interviniente.numpolizab;
    });

    idApo.forEach( ( item:any ) => {
      this.interviniente.poliza = item.poliza;
    });
    
    this.interviniente = {}
    this.dropbenefvalue = [];

    this.numpolizab = "";
    this.nombreb = "";
    this.apepatapb = "";
    this.apematapb = "";
    this.rfcb = "";
    this.cargoFideicomiso = "";

    this.interviniente.numpolizab = "";
    this.interviniente.nombre = "";
    this.interviniente.apPaterno = "";
    this.interviniente.apMaterno = "";
    this.interviniente.rfc = "";
    this.interviniente.cargoFide = "";
    this._idLongIntervinientesData++;
  }

  eliminarinterviniente( rowIndex: any ) {

    this.interviniente.splice(rowIndex, 1);
    this.dropbenefvalue.splice(rowIndex, 1);

  }

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
      this.closeBenefModal();
      this._reInitFacultiesValues();
    }

  }

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

  public saveLegislativePowers() : void {

    this.intervinientesSaved = [
      {
        descFacLeg: "Actividad Gubernamental",
        selected: this.activGuber === true,
      },
      {
        descFacLeg: "Agente Aduanal",
        selected: this.ageAdu === true,
      },
      {
        descFacLeg: "Agricultura/Ganadería/Pesca",
        selected: this.agriGanPes === true,
      },
      {
        descFacLeg: "Alimentos/Abarrotes/Bebidas no Alcohólicas",
        selected: this.aliAbarBeb === true,
      },
      {
        descFacLeg: "Armas de fuego y accesorios",
        selected: this.armFueAcc === true,
      },
      {
        descFacLeg: "Arrendamiento muebles/inmuebles",
        selected: this.arrenMuebInm === true,
      },
      {
        descFacLeg: "Art de Oficina/fotografía/deporte",
        selected: this.artOficFoto === true,
      },
      {
        descFacLeg: "Bares/Cantinas/ y Centros Nocturnos",
        selected: this.barCantCenNoc === true,
      },
      {
        descFacLeg: "Bca Múltiple/Bca Desarrollo/Fomento",
        selected: this.bcaMultDesFom === true,
      },
      {
        descFacLeg: "Casas de Bolsa",
        selected: this.casaBolsa === true,
      },
      {
        descFacLeg: "Centro cambiarios/Casas de Cambio",
        selected: this.cenCambCasCamb === true,
      },
      {
        descFacLeg: "Cine, Radio, TV y Medios Impresos",
        selected: this.cineRadTvMed === true,
      },
      {
        descFacLeg: "Comercialización de Textiles",
        selected: this.comTextiles === true,
      },
      {
        descFacLeg: "Comercializadora en General",
        selected: this.comerGeneral === true,
      },
      {
        descFacLeg: "Comercio bebidas alcohólicas y tabaco",
        selected: this.comerBebAlcTab === true,
      },
      {
        descFacLeg: "Compra venta de inmuebles",
        selected: this.compVentInm === true,
      },
      {
        descFacLeg: "Compra venta de Antigüedades y arte",
        selected: this.compVentAnt === true,
      },
      {
        descFacLeg: "Maquinaria",
        selected: this.maquinaria === true,
      },
      {
        descFacLeg: "Empleado del sector privado",
        selected: this.empsectpub === true,
      },
      {
        descFacLeg: "Materiales de desecho/chatarrero",
        selected: this.matdesh === true,
      },
      {
        descFacLeg: "Estudiante",
        selected: this.estudiante === true,
      },
      {
        descFacLeg: "Minería/Metalúrgica/ Industrial Química",
        selected: this.minmetind === true,
      },
      {
        descFacLeg: "Montepío/Casa de Empeño",
        selected: this.casaemp === true,
      },
      {
        descFacLeg: "Notario Público/ Corredores",
        selected: this.notpublic === true,
      },
      {
        descFacLeg: "Org. Cívicas/sin fines de lucro/religiosas",
        selected: this.orgcivic === true,
      },
      {
        descFacLeg: "Jubilado/pensionado",
        selected: this.jubilado === true,
      },
      {
        descFacLeg: "Oro/Plata/Joyas/Piedras Preciosas/Relojes",
        selected: this.oroplat === true,
      },
      {
        descFacLeg: "Papel, madera",
        selected: this.papmad === true,
      },
      {
        descFacLeg: "Petróleo, derivados, gas, energía",
        selected: this.petroleodev === true,
      },
      {
        descFacLeg: "Pirámides",
        selected: this.piramides === true,
      },
      {
        descFacLeg: "Prendas de Vestir",
        selected: this.prendas === true,
      },
      {
        descFacLeg: "Prestamista",
        selected: this.prestamista === true,
      },
      {
        descFacLeg: "Refacciones y accesorios automotrices",
        selected: this.refaccaut === true,
      },
      {
        descFacLeg: "Seguros y Fianzas",
        selected: this.segfuanz === true,
      },
      {
        descFacLeg: "Construct Infraestructura (Obra Civil)",
        selected: this.constinfra === true,
      },
      {
        descFacLeg: "Constructora de Inmuebles",
        selected: this.constinmu === true,
      },
      {
        descFacLeg: "Corresp. Cambiario/Corresp Bancario",
        selected: this.correspcambiar === true,
      },
      {
        descFacLeg: "Hoteles y Restaurantes",
        selected: this.hotelrest === true,
      },
      {
        descFacLeg: "Energía Eléctrica/ Suministro de Energía",
        selected: this.energsum === true,
      },
      {
        descFacLeg: "ENT. FIN. Sin presencia en México",
        selected: this.efinmexico === true,
      },
      {
        descFacLeg: "Entidades de Ahorro y Crédito Popular",
        selected: this.entahorrcred === true,
      },
      {
        descFacLeg: "Entidades Préstamo/Caja de Ahorro",
        selected: this.entprestaho === true,
      },
      {
        descFacLeg: "Explosivos/Dinamita",
        selected: this.explosivos === true,
      },
      {
        descFacLeg: "Extrac/Comer, cobre, uranio, urea, hierro",
        selected: this.cobreuranio === true,
      },
      {
        descFacLeg: "Fabricación de textiles",
        selected: this.fabtextiles === true,
      },
      {
        descFacLeg: "Fideicomisos",
        selected: this.fideicomiso === true,
      },
      {
        descFacLeg: "Grupo Mercan. Prof. Político y Laboral",
        selected: this.gpomercanpol === true,
      },
      {
        descFacLeg: "Desempleado",
        selected: this.desempleado === true,
      },
      {
        descFacLeg: "Juegos y Apuestas/Hipódromo",
        selected: this.juegosbet === true,
      },
      {
        descFacLeg: "Juguetes/electrodomésticos/ art para el hogar",
        selected: this.jugelectro === true,
      },
      {
        descFacLeg: "Serv. Artísticos, culturales, deportivos",
        selected: this.servacult === true,
      },
      {
        descFacLeg: "Serv. Profesionales Técnicos y Científicos",
        selected: this.servproftec === true,
      },
      {
        descFacLeg: "Serv, de Blindaje o Seguridad",
        selected: this.servblindseg === true,
      },
      {
        descFacLeg: "Serv de Consultoría y Asesoría",
        selected: this.servconsaseso === true,
      },
      {
        descFacLeg: "Serv. De Mensajería y Paquetería",
        selected: this.servmenspaq === true,
      },
      {
        descFacLeg: "Serv. De Salud Médicos y Sanitarios",
        selected: this.servmedsanit === true,
      },
      {
        descFacLeg: "Servicios de telecomunicaciones",
        selected: this.servtelecom === true,
      },
      {
        descFacLeg: "Servicios de transporte",
        selected: this.servtranspo === true,
      },
      {
        descFacLeg: "Servicios educativos",
        selected: this.serveducat === true,
      },
      {
        descFacLeg: "Quehaceres del hogar/ama de casa",
        selected: this.quehacerhog === true,
      },
      {
        descFacLeg: "Servicios legales",
        selected: this.servlegal === true,
      },
      {
        descFacLeg: "Soc. Finan de Objeto Múltiple No regulada",
        selected: this.socfinanmult === true,
      },
      {
        descFacLeg: "Sociedades de Inversión",
        selected: this.socinver === true,
      },
      {
        descFacLeg: "TDC/Tarjeta pre-pago/Instr de pago cheque de viajero",
        selected: this.tdctarjetapago === true,
      },
      {
        descFacLeg: "Transmisor de dinero o disp. De fondos",
        selected: this.trdinerofond === true,
      },
      {
        descFacLeg: "Traslado o custodia de valores",
        selected: this.transladoval === true,
      },
      {
        descFacLeg: "Venta y distribución de vehículos automotrices",
        selected: this.distvehiculos === true,
      },
      {
        descFacLeg: "Fabricación y comer de Alfarería, porcelana, loza",
        selected: this.fabalfareria === true,
      },
      {
        descFacLeg: "Serv. De cuidado personal, estéticas",
        selected: this.srvcuidpers === true,
      },
      {
        descFacLeg: "Tlapalerías/ferreterías/ y derivados",
        selected: this.tlapferrete === true,
      }
      
    ];

    this._endings = this.intervinientesSaved.filter((item:any)=>{return item.selected});
    this._endings_back = this.intervinientesSaved;

    let selectedtrue = {selected: true, check: 1};
    let selectedfalse = {selected: false, check: 0};
    
    this.intervinientesSaved.forEach( ( item:any ) => {
          if( item.selected === selectedtrue.selected) {
            item.selected = selectedtrue.check
          } else {
            item.selected = selectedfalse.check
          }
    });
    this._arrayEndings_back = [];
    this._endings_back.forEach( ( item:any ) => {
       
      this._arrayEndings_back.push(item.selected);
    });

    const ifIsCheckleg = this._endings.find((item : any) => {
      return item.selected && item.exeType === -1
    });
    
    if(ifIsCheckleg === undefined) {
      this.closeInterModal();
    }
    this.closeBenefModal();
  }

  private _reInitLegislativePowers() : void {
    this.activGuber = false;
    this.ageAdu = false;
    this.agriGanPes = false;
    this.aliAbarBeb = false;
    this.armFueAcc = false;
    this.arrenMuebInm = false;
    this.artOficFoto = false;
    this.barCantCenNoc = false;
    this.bcaMultDesFom = false;
    this.casaBolsa = false;
    this.cenCambCasCamb = false;
    this.cineRadTvMed = false;
    this.comTextiles = false;
    this.comerGeneral = false;
    this.comerBebAlcTab = false;
    this.compVentInm = false;
    this.compVentAnt = false;
    this.maquinaria = false;
    this.empsectpub = false;
    this.matdesh = false;
    this.estudiante = false;
    this.minmetind = false;
    this.casaemp = false;
    this.notpublic = false;
    this.orgcivic = false;
    this.jubilado = false;
    this.oroplat = false;
    this.papmad = false;
    this.petroleodev = false;
    this.piramides = false;
    this.prendas = false;
    this.prestamista = false;
    this.refaccaut = false;
    this.segfuanz = false;
    this.constinfra = false;
    this.constinmu = false;
    this.correspcambiar = false;
    this.hotelrest = false;
    this.energsum = false;
    this.efinmexico = false;
    this.entahorrcred = false;
    this.entprestaho = false;
    this.explosivos = false;
    this.cobreuranio = false;
    this.fabtextiles = false;
    this.fideicomiso = false;
    this.gpomercanpol = false;
    this.desempleado = false;
    this.juegosbet = false;
    this.jugelectro = false;
    this.servproftec = false;
    this.servblindseg = false;
    this.servconsaseso = false;
    this.servmenspaq = false;
    this.servmedsanit = false;
    this.servtelecom = false;
    this.servtranspo = false;
    this.serveducat = false;
    this.quehacerhog = false;
    this.servlegal = false;
    this.socfinanmult = false;
    this.socinver = false;
    this.tdctarjetapago = false;
    this.trdinerofond = false;
    this.transladoval = false;
    this.distvehiculos = false;
    this.fabalfareria = false;
    this.srvcuidpers = false;
    this.tlapferrete = false;
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
    this.usrId = localStorage.getItem('uId');

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
                  "data" : {
                      "beanHistorico": {
                          "fechaAviso": this.dataFiltersb.femaviso,
                          "darAviso": aviso,
                          "inclRegistro": registro,
                          "tipoFideicomiso": this.fipo_fid,
                          "fechaConstitucion": this.dataFiltersb.fechaconst,
                          "finesFideicomiso" : this.fin_fid,
                          "numeroIntervinientes": this.num_int,
                          "patrimonioFideicomiso": this.pat_fid,
                          "fines": this._arrayEndings_back === [] ? this._endings : this._arrayEndings_back
                      },
                      "docsDictaminados":  this.docsdictaminadosvalue,
                      "datosInscrip": this.datosinscsvalue,
                      "fedatarios": this.datosfedsvalue,
                      "apoderadosLeg": this.apoderadosvalue,
                      "intervinientes": this.intervinientesvalue,
                  },
                  "origin": this.origin,
                  "idSolicitud": this.idDictamen,
                  "ip": this.ipClient,
                  "usrRed": this.usrId,
                  "conn": ""
                }

    this._dictamenes.insupdFideicomiso ( data )
        .subscribe( resp => {

          this.displayModalAd = true;
          this.messageModalM = 'Sus cambios fueron guardados en el folio' + " " + this.idfolio + "  " + 'con éxito';

        }, (errors) => {
          this.displayModalM = true;
          this.messageModalM = errors.error.errors[0].message;
        });

  }

  obtenerEntidadesdi() {

    this._catalogos.getEntidades()
          .subscribe( ( resp: any ) => {
            this.entidadesDatadi = resp;
          })
    
  }

  obtenerMunicipiosdi() {
    
    this._catalogos.getMunicipios( this.datosinsc.entidaddi )
        .subscribe( ( resp: any ) => {
          this.municipiosDatadi = resp;
        })

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
    if ((this.intervinientes && this.intervinientes.find(item => item.numpolizab === this.docsdictaminados[this._indexToDeleteItem].poliza))) {
      this.intervinientes = this.intervinientes.filter(item => item.numpolizab !== this.docsdictaminados[this._indexToDeleteItem].poliza);
      this.intervinientesvalue = this.intervinientesvalue.filter(item => item.idArchivo !== this.docsdictaminados[this._indexToDeleteItem].idArchivo);
    }
    this.addItemList(this.arrayFiles, { id: this.docsdictaminados[this._indexToDeleteItem].idArchivo, nombre: this.docsdictaminados[this._indexToDeleteItem].nomArchivo});
    this.docsdictaminados.splice(this._indexToDeleteItem, 1);
    this.docsdictaminadosvalue.splice(this._indexToDeleteItem, 1);
    this.documentosValue.splice(this._indexToDeleteItem, 1);
    this.confirmDeleteDictum = false;
   
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

    this.updatedatinsc( docsdictaminado );

  }

  private updatedatinsc( item: any ): void {

    const oldData = this.clonedDocumentos[item.id!];

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

    this.updateItems( item );

  }

  private updateItems( item: any ): void {

    const oldData = this.clonedDocumentos[item.id!];

    if(this.intervinientes && this.intervinientes.length > 0) {
      this.intervinientes.forEach( itemIntervinientes => {
        if (itemIntervinientes.numpolizab === oldData.poliza) {
          itemIntervinientes.numpolizab = item.poliza;
        }
      });
    }

    if (this.intervinientesvalue && this.intervinientesvalue.length > 0) {
      this.intervinientesvalue.forEach( itemIntervinientesvalue => {
        if (itemIntervinientesvalue.poliza === oldData.poliza) {
          itemIntervinientesvalue.poliza = item.poliza;
        }
      });
    }

    delete this.clonedDocumentos[item.id!];

  }

  onRowEditCancel(indexRow: number, docsdictaminado: Docsdictaminados) {
      this.docsdictaminados[indexRow] = this.clonedDocumentos[docsdictaminado.id!];
      delete this.clonedDocumentos[docsdictaminado.id!];
      this.indexActiveEdit = -1;
  }

  onRowEditFed(indexRow: number, datosfed: Datosfedatario) {
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

  onRowEditDj(indexRow: number, datosinsc: Datosinsc) {
    this.rowIndexDatosJuzActive = indexRow;
    this.clonedDocumentos[datosinsc.id!] = {...datosinsc};

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

  onRowEditSaveDj(rowIndex: number, datosinsc: Datosinsc) {

    this.nomMunicipiodi = this.municipiosDatadi.filter(( entid: any ) => {
      return entid.idMunicipio === this.datosinsc.municipiodi;
    });
    
    this.nomEntidaddi = this.entidadesDatadi.filter(( munic: any ) => {
      return munic.idEntidadFed === this.datosinsc.entidaddi;
    });

    datosinsc.entidaddi = this.datosinsc.entidaddi;
    datosinsc.municipiodi = this.datosinsc.municipiodi;
    datosinsc.municipioNombre = this.nomMunicipiodi[0]?.nombre;
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

    delete this.clonedDocumentos[datosinsc.id!];

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

    this.datosinscs[indexRow] = this.clonedDocumentos[datosinsc.id];

    this.rowIndexDatosJuzActive = -1;

  }

  closeDialogDeleteFile(): void {
    this.confirmDeleteDictum = false;
  }

  displayMBenef() {
    this.displayModalBenef = true;
    //this.setDataFaculty(this._faculties); 
  }

  displayMInter() {
    this.displayModalInter = true;
    this.setDataFaculty(this._faculties);
  }

  closeBenefModal() {
    this.displayModalBenef = false;
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
      case 4:
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
        rfc: this.apoderados[this._indexRowDuplicateRepresentative].rfc,
        facultades: this.apoderados[this._indexRowDuplicateRepresentative].facultades,
        facultadesLeg: this.apoderados[this._indexRowDuplicateRepresentative].facultadesLeg,
        idArchivo: this.apoderados[this._indexRowDuplicateRepresentative].idArchivo,
        nombre: this.apoderados[this._indexRowDuplicateRepresentative].nombre,
        nombreCompleto: this.apoderados[this._indexRowDuplicateRepresentative].nombreCompleto,
        numpoliza: this.apoderados[this._indexRowDuplicateRepresentative].idArchivo,
        poliza: this.apoderados[this._indexRowDuplicateRepresentative].poliza,
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
        facultadesleg: this.apoderados[this._indexRowDuplicateRepresentative].facultadesleg,
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
      this.numpoliza = String(this.apoderados[rowIndex].idArchivo); //cambie este dato
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

  validateCheck( item: number ): boolean {
    return item === 1 ? true : false;
  }

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

  editInterviniente(rowIndex: number): void {
    this.editIntervinienteActive = true;
    this._indexRowEditInterviniente = rowIndex;

    if (this.intervinientes[rowIndex]) {

      const nameComplet = this.intervinientes[rowIndex].nombre + ' ' + this.intervinientes[rowIndex].apPaterno + ' ' + this.intervinientes[rowIndex].apMaterno;

      this.idArchivo = String(this.intervinientes[rowIndex].idArchivo);
      this.numpolizab = String(this.intervinientes[rowIndex].idArchivo);
      this.nombreb = String(this.intervinientes[rowIndex].nombre);
      this.apepatapb = String(this.intervinientes[rowIndex].apPaterno);
      this.apematapb = String(this.intervinientes[rowIndex].apMaterno);
      this.rfcb = String(this.intervinientes[rowIndex].rfc);
      this.cargoFideicomiso = String(this.intervinientes[rowIndex].cargoFide);

      this.interviniente.idArchivo = String(this.intervinientes[rowIndex].idArchivo),
      this.interviniente.numpolizab = String(this.intervinientes[rowIndex].idArchivo),
      this.interviniente.idDictIntervPk = "",
      this.interviniente.nombre = String(this.intervinientes[rowIndex].nombre),
      this.interviniente.apPaterno = String(this.intervinientes[rowIndex].apPaterno),
      this.interviniente.apMaterno = String(this.intervinientes[rowIndex].apMaterno),
      this.interviniente.rfc = String(this.intervinientes[rowIndex].rfc),
      this.interviniente.cargoFide = String(this.intervinientes[rowIndex].cargoFide),
      this.interviniente.nombreCompletob = String(nameComplet),
      this.interviniente.poliza = String(this.intervinientes[rowIndex].poliza),
      this.rowIndexIntervinienteActive = rowIndex;

    }

  }

  public updateIntervinienteItem(): void {
    
     setTimeout(() => {
      const nameComplet = this.interviniente.nombre + ' ' + this.interviniente.apPaterno + ' ' + this.interviniente.apMaterno;
      this.interviniente.id = this.createId();
      this.interviniente.nombreCompletob = nameComplet;
      
      const idApo = this.documentosValue.filter(( obj:any ) => {

        return obj.idArchivo === this.interviniente.numpolizab;
      });

      idApo.forEach( ( item:any ) => {
        this.interviniente.poliza = item.poliza;
      });

     const intervinienteObject = this.intervinientes.find((item, index) => index === this._indexRowEditInterviniente);

      if (intervinienteObject) {
        intervinienteObject.idArchivo = this.interviniente.numpolizab;
        intervinienteObject.apPaterno = this.interviniente.apPaterno;
        intervinienteObject.apMaterno = this.interviniente.apMaterno;
        intervinienteObject.cargoFide = this.interviniente.cargoFide;
        intervinienteObject.nombre = this.interviniente.nombre;
        intervinienteObject.nombreCompletob = this.interviniente.nombreCompletob;
        intervinienteObject.rfc = this.interviniente.rfc;
        intervinienteObject.poliza = this.interviniente.poliza;
      }

      const intervinienteValueObject = this.intervinientesvalue.find((item, index) => index === this._indexRowEditInterviniente);
      
      if (intervinienteValueObject) {
        intervinienteValueObject.idArchivo = this.interviniente.numpolizab;
        intervinienteValueObject.idDictIntervPk = "";
        intervinienteValueObject.nombre = this.interviniente.nombre;
        intervinienteValueObject.apPaterno = this.interviniente.apPaterno;
        intervinienteValueObject.apMaterno = this.interviniente.apMaterno;
        intervinienteValueObject.rfc = this.interviniente.rfc;
        intervinienteValueObject.cargoFide = this.interviniente.cargoFide;
      }

      this.cancelUpdateIntervinienteItem();
    }, 100); 

  }

  duplicateItemInterviniente(indexRow: number): void {

    this._indexRowDuplicateInterviniente = indexRow;
    if (this._indexRowDuplicateInterviniente !== -1) {

      this._idLongIntervinientesData++;
      const item: Intervinientes = {
        idAux: this._idLongIntervinientesData,
        apPaterno: this.intervinientes[this._indexRowDuplicateInterviniente].apPaterno,
        apMaterno: this.intervinientes[this._indexRowDuplicateInterviniente].apMaterno,
        cargoFide: this.intervinientes[this._indexRowDuplicateInterviniente].cargoFide,
        rfc: this.intervinientes[this._indexRowDuplicateInterviniente].rfc,
        idArchivo: this.intervinientes[this._indexRowDuplicateInterviniente].idArchivo,
        nombre: this.intervinientes[this._indexRowDuplicateInterviniente].nombre,
        nombreCompletob: this.intervinientes[this._indexRowDuplicateInterviniente].nombreCompletob,
        numpolizab: this.intervinientes[this._indexRowDuplicateInterviniente].idArchivo,
        poliza: this.intervinientes[this._indexRowDuplicateInterviniente].poliza,
      };
      this.intervinientes.push(item);
      this.intervinientesvalue.push({
        idArchivo: this.intervinientes[this._indexRowDuplicateInterviniente].idArchivo,
        idDictIntervPk: "",
        apPaterno: this.intervinientes[this._indexRowDuplicateInterviniente].apPaterno,
        apMaterno: this.intervinientes[this._indexRowDuplicateInterviniente].apMaterno,
        cargoFide: this.intervinientes[this._indexRowDuplicateInterviniente].cargoFide,
        nombre: this.intervinientes[this._indexRowDuplicateInterviniente].nombre,
        rfc: this.intervinientes[this._indexRowDuplicateInterviniente].rfc
      });
      
      this.confirmDuplicateInterviniente = false;
      this._indexRowDuplicateInterviniente = -1;

    }
  }

  cancelUpdateIntervinienteItem(): void {
    this.rowIndexIntervinienteActive = -1;
    this.editIntervinienteActive = false;
    this._indexRowEditInterviniente = -1;

    this.interviniente = {};

    this.numpoliza = "";
    this.nombreb = "";
    this.apepatapb = "";
    this.apematapb = "";
    this.rfcb = "";
    this.cargoFideicomiso = "";

    this.interviniente.poliza = "";
    this.interviniente.nombre = "";
    this.interviniente.apPaterno = "";
    this.interviniente.apMaterno = "";
    this.interviniente.rfc = "";
    this.interviniente.cargoFide = "";
    this.interviniente.nombreCompletob = "";

  }

  public deleteInterviniente( indexToDelete: number): void {

    this.intervinientes = this.intervinientes.filter((item,index) => {
      return index !== indexToDelete;
    });

    this.intervinientesvalue = this.intervinientesvalue.filter((item,index) => {
      return index !== indexToDelete;
    });

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
