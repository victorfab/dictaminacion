
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pairwise }from 'rxjs/operators';
// Componentes
import * as FileSaver from 'file-saver';
import { faFileExcel, faL } from '@fortawesome/free-solid-svg-icons';
import { NgCalendarComponent } from 'src/app/components/ng-calendar/ng-calendar.component';
// Interfaces
import { NgTableConfig } from '../../interfaces/ngtableconfig.interface';
import { Catbanca, Catzona, Estatus, Region, Cattipodict } from 'src/app/interfaces/catalogos.interface';
// Servicios
import { CatalogosService } from '../../servicios/catalogos.service';
import { MisSolicitudesService } from '../../servicios/missolicitudes.service';
import { DictaminacionService } from '../../servicios/dictaminacion.service';
import { ProfileService } from '../../servicios/profile.service';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { AltaFolioService } from 'src/app/servicios/alta-folio.service';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from 'src/app/servicios/session.service';
import { CurrentPageService } from 'src/app/servicios/current-page.service';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styles: [
  ]
})

export class SolicitudesComponent implements OnInit, OnDestroy {

  @ViewChild('inputBancos') inputBancos: any;

  @ViewChild('busquedaAvanzadaHasta') busquedaAvanzadaHasta!: NgCalendarComponent;

  @ViewChild('dt1') dt1!: any;

  faFileExcel = faFileExcel;

  private _dataRequestExport!: any[];

  regionp: any = '';

  regionid: any = '';

  sucursal: any = '';

  cc: any = '';

  zonap: any = '';

  dictamenes: any = [];

  dataTable: any;

  tipoConsulta!: string;
  
  rzonSocial!: string;
  
  rzonSocialDesc!: string;
  
  uid: any = "";

  isReady = true;
  
  ipClient!: any;
  
  session!: string;

  solpropias!: any;

  nom_razsoc: any = "";
  
  formData: FormData = new FormData();

  configTableSol!: NgTableConfig;
  
  dataTableSol!: any[];

  dataTableProp!: any[];

  dataTableSolRazSoc!:  any[];

  propias!: string;

  solicitudFolio!: any;

  searchGlobal!: any;

  name!: any;

  rasSoc!: any;

  bucNumber!: string;

  buc: string = "";

  rfc!: string;

  viglistado!: any;

  avisoupld!: any;

  dataFiltersb: any;

  folio: any = "";

  minDate: any = "";

  fechahasta: any = "";

  estatus!: Estatus[];

  estados!: Estatus;

  region!: Region[];

  regiones!: Region;

  tipodictamen!: Cattipodict[];

  tipodictamenes!: Cattipodict;

  banca!: Catbanca[];

  bancas!: Catbanca;

  zona!: Catzona[];

  zonas!: Catzona;

  display: boolean = false;

  headerModalM!: string;

  messageModalM!: string;

  iconModalM!: string;

  displayModalM = false;

  displayModalFormErr = false;

  rol!: any;

  consultaIni!: string;

  intSearch!: string;

  intSearchres!: any;

  resultlocalsrg: any[] = [];

  dateToDay: Date = new Date();

  dateInit!: string;
  dateEnd!: string;
  vigList!: any;
  alertUpld!: any;
  requestSelf!: any; 
  bancaAuto!: any;
  zonaAuto!: any;

  private subscriptions: Array<Subscription> = [];

  constructor( public _router:  Router,
               public _profile: ProfileService,
               private _misSolicitudes: MisSolicitudesService,
               private _dictaminacion: DictaminacionService,
               private _catalogos: CatalogosService,
               private _bearerToken: BearerTokenService,
               private _altaFolioService: AltaFolioService,
               private _cookieService: CookieService,
               private _currentPageService: CurrentPageService,
               private _sessionService: SessionService ) { 

    this.dataFiltersb = {};
    this.inputBancos = '';
    this.subscriptionChangeProfileAdminObservable();

  }

  ngOnInit() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.obtenerPerfil();
    this.dataTableSol = [];
    this.dataTableProp = [];
    this.getEstado();
    this.getRegion();
    this.getTipoDit();
    this.getZona();
    this.getBanca();


    this.solpropias = [
      {
        "id": "1",
        "nombre": "Si",
      },
      {
        "id": "0",
        "nombre": "No"
      }
    ]

    this.viglistado = [
      {
        "id": "1",
        "nombre": "DURACION",
      },
      {
        "id": "2",
        "nombre": "PODERES"
      },
      {
        "id": "3",
        "nombre": "REGISTRO"
      }
    ]

    this.avisoupld = [
      {
        "id": "1",
        "nombre": "SI",
      },
      {
        "id": "0",
        "nombre": "NO"
      }
    ]

    if( this.searchGlobal === null ) {
      this.dataTableSol = [];
      localStorage.removeItem('searchFilteredglobal');
    }
    
  }

  private subscriptionChangeProfileAdminObservable(): void {
    this.subscriptions.push(
      this._misSolicitudes.changeProfileAdminObservable.subscribe((res: boolean) => {
        if (res) {
          this.cleanAdvSearch();
          this.obtenerPerfil(); 
        }
      })
    );
  }

  private cleanAdvSearch(): void {
    this.dateInit = '';
    this.dateEnd = '';
    this.solicitudFolio = '';
    this.rfc = '';
    this.estados = { nombre: '' };
    this.bucNumber = '';
    this.rasSoc = '';
    this.regiones = {nombre: '', id: ''};
    this.tipodictamenes = {id: '', nombre: '', isselected: false};
    
    this.dateToDay = new Date();
    this.vigList = {id: ''};
    this.alertUpld = {id: ''};
    this.requestSelf = {id: ''};
    this.zonaAuto = {};
    this.bancaAuto = {};

    this.dataFiltersb.busquedaFolio = "";
    this.dataFiltersb.comResNombreSolicitante = "";
    this.dataFiltersb.estado = "";
    this.dataFiltersb.buc = "";
    this.dataFiltersb.region = "";
    this.dataFiltersb.rzonSocial = "";  
    this.dataFiltersb.ci_fini = '';
    this.dataFiltersb.ci_ffin = '';
    this.dataFiltersb.tipoDict = '';
    this.dataFiltersb.banca = '';
    this.dataFiltersb.zona = '';
    this.dataFiltersb.solpropias = '';
    this.dataFiltersb.viglistado = '';
    this.dataFiltersb.avisoupld = '';
  } 

  obtenerPerfil() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {

      this.validateCookieProfile();

    } else {

          return this._profile.getProfileCookie( this.ipClient )
                    .subscribe( ( resp: any ) => {

                      this.rol = localStorage.getItem('rol');
                      this.uid = localStorage.getItem('uId');

                      if ( this.rol === 'Abogado externo' ) {
                            this.consultaIni = '1';
                            this.obtenerSolExt();
                      } else {
                        this.dataFiltersb.rzonSocial = "";
                        this.dataFiltersb.busquedaFolio = "";
                        this.uid = resp.userId;
                        this.regionp = resp.region.nameRegion;
                        this.sucursal = resp.costCenter.nameCostCenter;
                        this.cc = resp.costCenter.cveCostCenter;
                        this.zonap = resp.zone.idZone;
                        this.obtenerSolInt();

                      }
           
                    });

        }
        return true;

  }

  getfilterGlobal( event:any, field: string ) {

    switch ( field ) {
      case 'searchGlobal':
        this.intSearch = event;
        localStorage.setItem('intSearch', this.intSearch);
        
      break;
      default:
        break;
      }
  }

  onFilter(event: any, dt1: any) {
    localStorage.setItem('searchFilteredglobal', JSON.stringify(event.filteredValue));
  }

  validateCookieProfile() {

    let user = localStorage.getItem('usuario');
      let roluser = localStorage.getItem('roluser');

      if ( this.rol === 'Abogado externo' ) {
        this.consultaIni = '1';

        return this._profile.getProfile(user, roluser, this.ipClient)
                  .subscribe( ( resp: any ) => {
                    this.uid = resp.userId;

                    if((this._currentPageService.getpreviousUrl().includes('dictaminacion') || 
                      this._currentPageService.getpreviousUrl().includes('foliocomplemento')) &&
                      this._currentPageService.getAdvancedSearchRequest()) {
                        this.obtenerSolExtAdv(this._currentPageService.getAdvancedSearchRequest());
                    } else if (localStorage.getItem('searchAdvancedRequest') && localStorage.getItem('prviousUrl')) {
                      this.obtenerSolExtAdv(JSON.parse(JSON.stringify(localStorage.getItem('searchAdvancedRequest'))), true);
                      this.searchGlobal = localStorage.getItem('intSearch');
                    } else {
                      this.obtenerSolExtAdv();
                    }


                    this.obtenerSolExt();
                  });

      } else {

        this.dataFiltersb.rzonSocial = "";
        this.dataFiltersb.busquedaFolio = "";
        this.uid = localStorage.getItem('uId');
        this.regionp = localStorage.getItem('nameReg');
        this.sucursal = localStorage.getItem('nameCC');
        this.cc = localStorage.getItem('cveCC');
        this.zonap = localStorage.getItem('idZone');

        this.rol = localStorage.getItem('changeRolUserAdmin') ? localStorage.getItem('changeRolUserAdmin') : localStorage.getItem('rol');

        this.addIntSearch();
        
        return true;
      }

  }

  addIntSearch() {
    if((this._currentPageService.getpreviousUrl().includes('foliodetalle') || 
    this._currentPageService.getpreviousUrl().includes('foliocomplemento')) &&
    this._currentPageService.getAdvancedSearchRequest()) {
      this.obtenerSolIntAdv(this._currentPageService.getAdvancedSearchRequest());
    } else if(localStorage.getItem('searchAdvancedRequest') && localStorage.getItem('previousUrl')) {
      this.obtenerSolIntAdv(JSON.parse(JSON.stringify(localStorage.getItem('searchAdvancedRequest'))), true);
      this.resultlocalsrg = JSON.parse(localStorage.getItem('searchFilteredglobal')!);
      this.dt1 = { ...this.dt1, filters: { global: { matchMode: "contains", value: localStorage.getItem('intSearch') }}, _value:  this.resultlocalsrg };
      this.searchGlobal = localStorage.getItem('intSearch');
    } else {
      this.obtenerSolInt();
    }
  }

  getData( event: any, field: string ) {

    switch ( field ) {
      case 'busquedaFolio':
        this.dataFiltersb.busquedaFolio = event;
        this.solicitudFolio = this.dataFiltersb.busquedaFolio;
        break; 
      case 'nombre':
        this.dataFiltersb.comResNombreSolicitante = event;
        break;
      case 'estado':
        this.dataFiltersb.estado = event.value.nombre;
        break;
      case 'buc':
        this.dataFiltersb.buc = event;
        this.bucNumber = this.dataFiltersb.buc;
        break;
      case 'ci_fini':
        this.busquedaAvanzadaHasta.setMinDate(event);
        this.dataFiltersb.ci_fini = event;
        this.dateInit = event.replaceAll('-', '/');

        this.minDate = this.dataFiltersb.ci_fini;
        break;
      case 'ci_ffin':
        this.dataFiltersb.ci_ffin = event;
        this.dateEnd = event.replaceAll('-', '/');
        this.fechahasta = this.dataFiltersb.ci_ffin;
        break;
      case 'region':
        this.dataFiltersb.region = event.value.id;
        break;
      
      default:
        break;
    }

  }

  getDataB( evnt: any, field: string) {

    switch ( field ) {
      case 'tipodictamen':
        this.dataFiltersb.tipoDict = evnt.value.id;
        break;
      case 'banca':
        this.dataFiltersb.banca = evnt.id;
        break;
      case 'zona':
        this.dataFiltersb.zona = evnt.id;
        break;
      case 'solpropias':
        this.dataFiltersb.solpropias = evnt.value;
        break;
      case 'rzonSocial':
        this.dataFiltersb.rzonSocial = evnt;
        this.nom_razsoc = this.dataFiltersb.rzonSocial;
        break;
      case 'viglistado':
        this.dataFiltersb.viglistado = evnt.value.id;
        break;
      case 'avisoupld':
        this.dataFiltersb.avisoupld = evnt.value.nombre;
        break;
      default:
        break;
    }

  }

  obtenerSolInt() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.tipoConsulta = "false";
    this.rzonSocial = "false";
    this.nom_razsoc = this.dataFiltersb.rzonSocial;
    this.session = '';

    let dataSolicitudInt = {
                              "beanUsuarioInfo": {
                                  "idUsuario": this.uid,
                                  "centroCost": this.cc,
                                  "buc": "",
                                  "vigList": "",
                                  "rol": this.rol
                              },
                              "beanFolioInfo": {
                                  "folio": "",
                                  "nombreDen": "",
                                  "tipoDic": "",
                                  "estatFol": "",
                                  "numPorPag": 3,
                                  "limit": 1,
                                  "totalReg": 0,
                                  "idSolicitud": "",
                                  "rfc": ""
                              },
                              "beanFechasRequest": {
                                  "fechaDesde": "",
                                  "fechaHasta": "",
                                  "fechaInicio": "",
                                  "fechaFin": "",
                                  "fechaActual": ""
                              },
                              "beanInfoAdicional": {
                                  "zona": String(this.zonap),
                                  "region": this.regionid,
                                  "banca": this.cc,
                                  "upld": "",
                                  "solPropias": this.dataFiltersb.solpropias
                              },
                              "tipoConsulta": this.tipoConsulta,
                              "rzonSocial": this.rzonSocial,
                              "rzonSocialDesc": "false",
                              "internoinit": "1",
                              "usrRed": this.uid,
                              "tipoautenticacion": "interno",
                              "ipClient": this.ipClient,
                              "conn": this.session
        }

        this._misSolicitudes.getDictamentes( dataSolicitudInt )
            .subscribe( ( resp:any ) => {

              this.searchGlobal = localStorage.getItem('intSearch');
              this.resultlocalsrg = JSON.parse(localStorage.getItem('searchFilteredglobal')!);
              this.dt1 = { ...this.dt1, filters: { global: { matchMode: "contains", value: localStorage.getItem('intSearch') }}, _value:  this.resultlocalsrg };

              if( resp == null) {
                this.dataTableSol = [];
              } else if( this.searchGlobal !== '' && this.searchGlobal !== null ) {

                this.dataTableSol = this.resultlocalsrg;
              } else {
                this.dataTableSol = resp.data.lista;
  
                if(this.searchGlobal === null) {
                  localStorage.removeItem('previousUrl');
                  localStorage.removeItem('searchFilteredglobal');
                  localStorage.removeItem('intSearch');
                }
              }

        }, (error) => {
            this.dataTableSol = [];
            return error;
        });
    
  }

  obtenerSolIntAdv( request?:any, cookie?: boolean ) {
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.tipoConsulta = "false";
    this.rzonSocial = "false";
    this.nom_razsoc = this.dataFiltersb.rzonSocial;
    this.rzonSocialDesc = "";
    this.session = '';
    this.buc = this.bucNumber;
    let estados = this.dataFiltersb.estado;
    let tipodictamenes = this.dataFiltersb.tipoDict === Object ? "" : this.dataFiltersb.tipoDict;
    this.folio = this.solicitudFolio;
    this.minDate = this.dataFiltersb.ci_fini;
    this.fechahasta = this.dataFiltersb.ci_ffin;
    
    
    const _regionn = this.dataFiltersb.region;
    const zona = this.dataFiltersb.zona;
    const banca = this.dataFiltersb.banca;

    let dataSolicitudInt = {};

    if( request ) {
      dataSolicitudInt = JSON.parse(request);
    } else {
      localStorage.removeItem('intSearch');
            dataSolicitudInt =  {
                          "beanUsuarioInfo": {
                              "idUsuario": this.uid,
                              "centroCost": this.cc,
                              "buc": this.buc,
                              "vigList": this.dataFiltersb.viglistado,
                              "rol": this.rol
                          },
                          "beanFolioInfo": {
                              "folio": this.folio,
                              "tipoDic": tipodictamenes,
                              "estatFol": estados,
                              "nombreDen": this.nom_razsoc,
                              "numPorPag": 0,
                              "limit": 3,
                              "totalReg": 3,
                              "idSolicitud": "",
                              "rfc": this.rfc
                          },
                          "beanFechasRequest": {
                              "fechaDesde": this.minDate,
                              "fechaHasta": this.fechahasta,
                              "fechaInicio": "",
                              "fechaFin": "",
                              "fechaActual": ""
                          },
                          "beanInfoAdicional": {
                              "zona": zona,
                              "region": _regionn,
                              "banca": banca,
                              "upld": this.dataFiltersb.avisoupld,
                              "solPropias": this.dataFiltersb.solpropias
                          },
                          "tipoConsulta": this.tipoConsulta,
                          "tipoautenticacion": "interno",
                          "internoinit": "0",
                          "rzonSocial": this.rzonSocial,
                          "rzonSocialDesc": this.rzonSocialDesc,
                          "usrRed": this.uid,
                          "ipClient": this.ipClient,
                          "conn": this.session
                      };
        }

        this._misSolicitudes.getDictamentes( dataSolicitudInt )
            .subscribe( ( resp:any ) => {

              this.searchGlobal = localStorage.getItem('intSearch');
              this.resultlocalsrg = JSON.parse(localStorage.getItem('searchFilteredglobal')!);
              this.dt1 = { ...this.dt1, filters: { global: { matchMode: "contains", value: localStorage.getItem('intSearch') }}, _value:  this.resultlocalsrg };

              if( resp == null) {
                this.dataTableSol = [];
              } else if( this.searchGlobal !== '' && this.searchGlobal !== null ) {
                this.dataTableSol = this.resultlocalsrg;
              } else {
                this._currentPageService.setAdvancedSearchRequest(dataSolicitudInt);

                localStorage.setItem('searchAdvancedRequest', JSON.stringify(dataSolicitudInt));

                this.dataTableSol = resp.data.lista;
  
                if(cookie) {
                  localStorage.removeItem('searchAdvancedRequest');
                  localStorage.removeItem('previousUrl');
                  localStorage.removeItem('searchFilteredglobal');
                  localStorage.removeItem('intSearch');
                }
              }

        }, (error) => {

          this.displayModalFormErr = true;
          this.messageModalM = `${error.error.errors[0].message}`;

        });
    
  }

  obtenerSolExt() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.dataFiltersb.rzonSocial = "";
    this.tipoConsulta = "false";
    this.rzonSocial = "false";
    this.nom_razsoc = this.dataFiltersb.rzonSocial;
    this.rzonSocialDesc = 'like';
    this.session = '';
    this.consultaIni = "1";
    this.buc = this.dataFiltersb.buc;
    this.folio = this.dataFiltersb.busquedaFolio;
    
    const dataSolicitudExt = {
                                "beanUsuarioInfo": {
                                  "idUsuario": this.uid,
                                  "centroCost": "",
                                  "buc": "",
                                  "vigList": "",
                                  "rol": this.rol
                                },
                                "beanFolioInfo": {
                                  "folio": "",
                                  "nombreDen": "",
                                  "tipoDic": "",
                                  "estatFol": "",
                                  "numPorPag": 0,
                                  "limit": 3,
                                  "totalReg": 3,
                                  "idSolicitud": "",
                                  "rfc": ""
                                },
                                "beanFechasRequest": {
                                  "fechaDesde": "",
                                  "fechaHasta": "",
                                  "fechaInicio": "",
                                  "fechaFin": "",
                                  "fechaActual": ""
                                },
                                "beanInfoAdicional": {
                                  "zona": this.zonap,
                                  "region": this.regionid,
                                  "banca": this.cc,
                                  "upld": "",
                                  "solPropias": this.dataFiltersb.solpropias
                                },
                                "tipoConsulta": this.tipoConsulta,
                                "rzonSocial": "",
                                "rzonSocialDesc": this.rzonSocialDesc,
                                "tipoautenticacion": "externo",
                                "externoinit": this.consultaIni,
                                "usrRed": this.uid,
                                "ipClient": this.ipClient,
                                "conn": this.session
                              }

        this._misSolicitudes.getDictamentes( dataSolicitudExt )
            .subscribe( ( resp:any ) => {
              
              if( resp === null) {
                this.dataTableSol = [];
                this.dataTableProp = [];

              }
              this.dataTableSol = resp.data.lista;
              this.dataTableProp = resp.dataPropias.lista;
              const datastr = JSON.stringify(resp.data.lista);
              localStorage.setItem('exp_data', datastr);
            }, (error) => {
              this.dataTableSol = [];
              this.dataTableProp = [];
                return error;
            });    

  }

  obtenerSolExtAdv( request?: any, cookie?: boolean ) {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.tipoConsulta = "false";
    this.rzonSocial = "false";
    this.session = '';
    this.consultaIni = "0";
    let estado = this.dataFiltersb.estado === '' ? "" : this.dataFiltersb.estado;
    let tipodic = this.dataFiltersb.tipoDict === '' ? "" : this.dataFiltersb.tipoDict;
    this.buc = this.bucNumber;
    this.folio = this.solicitudFolio;
    const _regionn = this.dataFiltersb.region;
    
    let dataSolicitudExtAdv = {};

    if(request) {
      dataSolicitudExtAdv = request;
    } else {
            dataSolicitudExtAdv = {
                                "beanUsuarioInfo": {
                                  "idUsuario": "",
                                  "centroCost": "",
                                  "buc": this.buc,
                                  "vigList": this.dataFiltersb.viglistado,
                                  "rol": this.rol
                                },
                                "beanFolioInfo": {
                                  "folio": this.folio,
                                  "tipoDic": tipodic,
                                  "estatFol": estado,
                                  "nombreDen": this.nom_razsoc,
                                  "numPorPag": 0,
                                  "limit": 3,
                                  "totalReg": 3,
                                  "idSolicitud": "",
                                  "rfc": this.rfc
                                },
                                "beanFechasRequest": {
                                  "fechaDesde": this.minDate,
                                  "fechaHasta": this.fechahasta,
                                  "fechaInicio": "",
                                  "fechaFin": "",
                                  "fechaActual": ""
                                },
                                "beanInfoAdicional": {
                                  "zona": this.zonap === "0" ? "" : this.zonap,
                                  "region": _regionn,
                                  "banca": this.cc === "-1" ? "" : this.cc, // ESto es temp
                                  "upld": this.dataFiltersb.avisoupld,
                                  "solPropias": this.dataFiltersb.solpropias
                                },
                                "tipoConsulta": this.tipoConsulta,
                                "rzonSocial": this.rzonSocial,
                                "rzonSocialDesc": this.nom_razsoc,
                                "tipoautenticacion": "externo",
                                "externoinit": this.consultaIni,
                                "usrRed_comment": this.uid,
                                "usrRed": this.uid,
                                "ipClient": this.ipClient,
                                "conn": this.session
                              };
        }

        this._misSolicitudes.getDictamentes( dataSolicitudExtAdv )
            .subscribe( ( resp:any ) => {
              
              if( resp == null) {
                this.dataTableSol = [];
                this.dataTableProp = [];
              }

              this.dataTableSol = resp.data.lista;
              this.dataTableProp = resp.dataPropias.lista;
              this.propias = resp.propias;
              localStorage.setItem('searchAdvancedRequest', JSON.stringify(dataSolicitudExtAdv));

              if(cookie) {
                localStorage.removeItem('searchAdvancedRequest');
                localStorage.removeItem('previousUrl');
              }
              
            }, (error) => {
              this.displayModalFormErr = true;
              this.messageModalM = `${error.error.errors[0].message}`;
            });

  }

  vistaDetalleFolio( id: string, estado: string ) {

    switch ( this.rol ) {
      case 'Solicitante':
        this._router.navigate([ '/foliodetalle', id ]);
      break;
      case 'Abogado de seguimiento':

        //this.validateEstado( id, estado );
        
      break;
      case 'Administrador':
        this._router.navigate([ '/foliodetalle', id ]);
      break;
      case 'Abogado externo':
        this._router.navigate([ '/dictaminacion', id ]);
      break;
      default:
        this._router.navigate([ '/dictaminacion', id ]);
      break;
    
    }
    
  }

  vistaDetalleFolioExt( id: string ) {

    this._router.navigate([ '/foliodetalle', id ]);

  }

  obtenerIdFolio( id: string ) {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const idfolio = id;
    const usrRed = this.uid;
    const session = '';

    this._dictaminacion.getIdxFolio( idfolio, usrRed, this.ipClient, session )
                       .subscribe( ( resp:any ) => {
                          return resp.beanRespuestaConsulta.beanComplementoRespuesta.id;
                       })

  }

  getEstado() {
    this._catalogos.getEstado()
        .subscribe( ( resp:any ) => {
          this.estatus = resp;
        })
  }

  getRegion() {
    this._catalogos.getRegion()
        .subscribe( ( resp:any ) => {
          this.region = resp;
        })
  }

  getTipoDit() {
    this._catalogos.getTypeDict()
        .subscribe( ( resp: Cattipodict[] ) => {
          this.tipodictamen = resp;
        })
  }

  getBanca() {
    this._catalogos.getBank()
        .subscribe( ( resp: Catbanca[] ) => {
          this.banca = resp;
        })
  }

  getZona() {
    this._catalogos.getZona()
        .subscribe( ( resp: Catzona[] ) => {
          this.zona = resp;
        })
  }

  exportExcel() {
    let dataToExport :  Array<object>;
    switch (this.rol) {
      case "Solicitante":
        this._dataRequestExport = this.dataTableSol;
        dataToExport = this._applicantExcelExportFormat(this._dataRequestExport);
        break;
      case "Abogado de seguimiento":
        this._dataRequestExport = this.dataTableSol;
        dataToExport = this._trackingExcelExportFormatSeg(this._dataRequestExport);
        break;
      case "Abogado externo":
          this._dataRequestExport = this.dataTableProp;
          dataToExport = this._trackingExcelExportFormat(this._dataRequestExport);
        break;
      case "Administrador":
        this._dataRequestExport = this.dataTableSol;
        dataToExport = this._attorneyExcelExportFormat(this._dataRequestExport);
        break;
      default:
        break;
    }

    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(dataToExport);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "mis-solicitudes");
    });

  }

    /**
   * Applicant format to export excel
   *
   * @private
   * @param {Array<object>} dataRequestExport
   * @return {*}  {Array<object>}
   * @memberof SolicitudesComponent
   */
  private _applicantExcelExportFormat(dataRequestExport : Array<object>) : Array<object> {
    let dataToExport :  Array<object> = [];
    dataRequestExport.forEach((element : any) => {
      dataToExport.push({
        "FOLIO": element.busquedaFolio,
        "NOMBRE DENOMINACIÓN O RAZÓN SOCIAL": element.busquedaRazonSocial,
        "TIPO DICTAMEN": element.tipoDictamen,
        "ESTADO": element.estadoDesc,
        "RESULTADO ATENCIÓN": element.resultadoAtencion,
        "FECHA REGISTRO": element.fechaResFechaRegistro,
        "FECHA COMPROMISO": element.fechaResFechaCompromiso,
        "FECHA DE RESPUESTA": element.fechaResFechaEnvio,
        "ABOGADO SEGUIMIENTO": element.abogado
      });
    });
    return dataToExport;
  }

  /**
   * Tracking format to export excel
   *
   * @private
   * @param {Array<object>} dataRequestExport
   * @return {*}  {Array<object>}
   * @memberof SolicitudesComponent
   */
  private _trackingExcelExportFormat(dataRequestExport : Array<object>) : Array<object> {
    let dataToExport :  Array<object> = [];
    dataRequestExport.forEach((element : any) => {
      dataToExport.push({
        "FOLIO": element.colFolio,
        "SUCURSAL": element.zonaSucursal,
        "CENTRO COSTO": element.busquedaCentroCosto,
        "BUC": element.buc,
        "NOMBRE DENOMINACIÓN O RAZÓN SOCIAL": element.busquedaRazonSocial,
        "TIPO DICTAMEN": element.tipoDictamen,
        "ESTADO": element.resCodEdoPorOlExt,
        "RESULTADO ATENCIÓN": element.comResEdo,
        "FECHA REGISTRO": element.fechaResFechaRegistro,
        "FECHA COMPROMISO": element.fechaResFechaCompromiso,
        "FECHA ENVIO": element.fechaResFechaEnvio,
        "FECHA RESPUESTA": element.fechaResFechaRespuesta,
        "ABOGADO SEGUIMIENTO": element.abogado,
        "ABOGADO EXTERNO": element.abogadoExt
      });
    });
    return dataToExport;
  }

      /**
   * External format to export excel Seguimiento
   *
   * @private
   * @param {Array<object>} dataRequestExport
   * @return {*}  {Array<object>}
   * @memberof SolicitudesComponent
   */
      private _trackingExcelExportFormatSeg(dataRequestExport : Array<object>) : Array<object> {
        let dataToExport :  Array<object> = [];
        dataRequestExport.forEach((element : any) => {
          dataToExport.push({
            "FOLIO": element.busquedaFolio,
            "NOMBRE DENOMINACIÓN O RAZÓN SOCIAL": element.busquedaRazonSocial,
            "TIPO DICTAMEN": element.tipoDictamen,
            "ESTADO": element.comResEstadoEstadoFolioSeg,
            "RESULTADO ATENCIÓN": element.comResEdo,
            "FECHA REGISTRO": element.fechaResFechaRegistro,
            "FECHA COMPROMISO": element.fechaResFechaCompromiso,
            "FECHA RESPUESTA": element.fechaResFechaRespuesta,
            "ABOGADO SEGUIMIENTO": element.abogado,
            "ABOGADO EXTERNO": element.abogadoExt
          });
        });
        return dataToExport;
      }

    /**
   * External format to export excel
   *
   * @private
   * @param {Array<object>} dataRequestExport
   * @return {*}  {Array<object>}
   * @memberof SolicitudesComponent
   */
  private _externalExcelExportFormat(dataRequestExport : Array<object>) : Array<object> {
    let dataToExport :  Array<object> = [];
    dataRequestExport.forEach((element : any) => {
      dataToExport.push({
        "FOLIO": element.colFolio,
        "NOMBRE DENOMINACIÓN O RAZÓN SOCIAL": element.busquedaRazonSocial,
        "TIPO DICTAMEN": element.tipoDictamen,
        "ESTADO": element.resCodEdoPorOlExt,
        "RESULTADO ATENCIÓN": element.comResEdo,
        "FECHA REGISTRO": element.fechaResFechaRegistro,
        "FECHA COMPROMISO": element.fechaResFechaCompromiso,
        "ABOGADO SEGUIMIENTO": element.abogado
      });
    });
    return dataToExport;
  }

  /**
   * Attorney format to export excel
   *
   * @private
   * @param {Array<object>} dataRequestExport
   * @return {*}  {Array<object>}
   * @memberof SolicitudesComponent
   */
  private _attorneyExcelExportFormat(dataRequestExport : Array<object>) : Array<object> {
    let dataToExport :  Array<object> = [];
    dataRequestExport.forEach((element : any) => {
      dataToExport.push({
        "FOLIO": element.busquedaFolio,
        "NOMBRE DENOMINACIÓN O RAZÓN SOCIAL": element.busquedaRazonSocial,
        "TIPO DICTAMEN": element.tipoDictamen,
        "ESTADO": element.estadoDesc,
        "RESULTADO ATENCIÓN": element.resultadoAtencion,
        "FECHA REGISTRO": element.fechaResFechaRegistro,
        "FECHA COMPROMISO": element.fechaResFechaCompromiso,
        "FECHA RESPUESTA": element.fechaResFechaRespuesta,
        "ABOGADO SEGUIMIENTO": element.abogado,
        "ABOGADO EXTERNO": element.abogadoExt
      });
    });
    return dataToExport;
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

  limpiarFormulario() {
    this._currentPageService.setAdvancedSearchRequest(null);
    localStorage.removeItem('searchAdvancedRequest');
    localStorage.removeItem('previousUrl');
    localStorage.removeItem('searchFilteredglobal');
    localStorage.removeItem('intSearch');
    window.location.reload();
  }

  reportFolio(folio: string): void {
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const request = {
      idfolio: folio,
      ipClient: this.ipClient,
      conn: "",
      usrRed: this.uid
    };

    this._altaFolioService.updtReportFolio(request)
        .then(( response: any ) => {

          this.headerModalM = "FOLIO REPORTADO";
          this.messageModalM = `El folio ha sido reportado correctamente`;
          this.displayModalM = true;
          this.obtenerSolInt();
          return response;

        }, (error) => {

          this.displayModalFormErr = true;
          this.messageModalM = `${error.error.errors[0].message}`;

        });

  }

  validateReplyDateEmpty(value: string): boolean {
    return value ? true : false;
  }

  validateDateNow(commitmentDate: string): boolean {
    if (commitmentDate) {
      const commitmentDateValue: Date = new Date(this.formatDateSetClassDate(commitmentDate));
      const nowDate: Date = new Date();

      if (commitmentDateValue < nowDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  closeModal() {

    this.displayModalM = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/solicitudes']);
    });

  }

  closeModalForm() {
    this.displayModalFormErr = false;
  }


  private formatDateSetClassDate(date: string): string {
    const splitDateComplete: Array<string>= date.split(' ');
    const splitDate: Array<string> = splitDateComplete[0].split('-');
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitDateComplete[1]}`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((susbcription: Subscription) => susbcription.unsubscribe());
  }

}
