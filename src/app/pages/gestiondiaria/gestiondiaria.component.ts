import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as FileSaver from 'file-saver';
import { CookieService } from 'ngx-cookie-service';
import { NgCalendarComponent } from 'src/app/components/ng-calendar/ng-calendar.component';
// Interfaces
import { Catbanca, Cattipodict, Catzona, Estatus, Region } from 'src/app/interfaces/catalogos.interface';
import { NgTableConfig } from 'src/app/interfaces/ngtableconfig.interface';
// Servicios
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { DictaminacionService } from 'src/app/servicios/dictaminacion.service';
import { GestionService } from 'src/app/servicios/gestion.service';
import { ProfileService } from 'src/app/servicios/profile.service';

@Component({
  selector: 'app-gestiondiaria',
  templateUrl: './gestiondiaria.component.html',
  styles: [
  ]
})
export class GestiondiariaComponent implements OnInit {

  @ViewChild('inputBancos') inputBancos: any;

  @ViewChild('busquedaAvanzadaHasta') busquedaAvanzadaHasta!: NgCalendarComponent;

  faFileExcel = faFileExcel;

  regionp: string = '';

  sucursal: string = '';

  cc: number = 0;

  zonap: string = '';

  dictamenes: any = [];

  dataTable: any;

  tipoConsulta!: string;
  
  rzonSocial!: string;
  
  rzonSocialDesc!: string;
  
  uid: string = '';
  
  ipClient!: any;
  
  session!: string;
  
  solPropias!: string;

  nom_razsoc: any = "";
  
  formData:       FormData = new FormData();

  configTableSol!:  NgTableConfig;
  
  dataTableSol!: any[];

  dataTableSolRazSoc!:  any[];

  solicitudFolio!: any;

  name!: any;

  rasSoc!: any;

  bucNumber!: number;

  buc: string = "";

  rfc!: string;

  dataFiltersb: any;

  folio: any = "";

  minDate: any = "";

  fechahasta: any = "";

  estatus!: Estatus[];

  estados!: Estatus;

  estado: any = "";

  region!: Region[];

  regiones!: Region;

  tipodictamen!: Cattipodict[];

  tipodictamenes!: Cattipodict;

  banca!: Catbanca[];

  bancas!: Catbanca;

  zona!: Catzona[];

  zonas!: Catzona;

  display: boolean = false;

  messageModalM!: string;

  iconModalM!: string;

  rol!: any;

  consultaIni!: string;

  displayModalFormErr = false;

  headerModalM!: string;

  dateToDay: Date = new Date();

  constructor( public _router:  Router,
               public _profile: ProfileService,
               private _misSolicitudes: GestionService,
               private _dictaminacion: DictaminacionService,
               private _bearerToken: BearerTokenService,
               private _cookieService: CookieService ) { 

    this.dataFiltersb = {};
    this.inputBancos = '';

  }

  ngOnInit() {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.obtenerPerfil();
    this.dataTableSol = [];
    
  }

  /**
   * Metodo para obtener el perfil del usuario
   *
   * @return {*} 
   * @memberof GestiondiariaComponent
   */
  obtenerPerfil() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {

        let user = localStorage.getItem('usuario');
        let roluser = localStorage.getItem('roluser');

        return this._profile.getProfile( user, roluser, this.ipClient )
                  .subscribe( ( resp: any ) => {

                      this.uid = resp.userId;
                      this.consultaIni = '1';
                      this.sucursal = resp.costCenter.nameCostCenter;
                      this.obtenerSolExt();
                    
                  });

    } else {

        return this._profile.getProfileCookie( this.ipClient )
                    .subscribe( ( resp: any ) => {

                      this.uid = resp.userId;
                      this.consultaIni = '1';
                      this.sucursal = resp.costCenter.nameCostCenter;
                      this.obtenerSolExt();
                    
                  });

    }

  }

  /**
   * Metodo para obtener los eventos de los inputs del formulario
   *
   * @param {*} event
   * @param {string} field
   * @memberof GestiondiariaComponent
   */
  getData( event: any, field: string ) {

    this.dataFiltersb.busquedaFolio = "";
    this.dataFiltersb.comResNombreSolicitante = "";
    this.dataFiltersb.estado = "";
    this.dataFiltersb.buc = "";
    this.dataFiltersb.region = "";
    this.dataFiltersb.rzonSocial = "";

    switch ( field ) {
      case 'busquedaFolio':
        this.dataFiltersb.busquedaFolio = event;
        break; 
      case 'ci_fini':
        this.busquedaAvanzadaHasta.setMinDate(event);
        this.dataFiltersb.ci_fini = event;
        this.minDate = this.dataFiltersb.ci_fini;
        break;
      case 'ci_ffin':
        this.dataFiltersb.ci_ffin = event;
        this.fechahasta = this.dataFiltersb.ci_ffin;
        break;
      case 'rzonSocial':
        this.dataFiltersb.rzonSocial = event;
        this.nom_razsoc = this.dataFiltersb.rzonSocial;
        break;
      default:
        break;
    }

  }

  /**
   * Metodo para obtener las solicitudes del abogado externo
   *
   * @memberof GestiondiariaComponent
   */
  obtenerSolExt() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    
    const dataSolicitudExt = {
                                  "beanBusquedaAvanzada":{
                                      "beanFechasRequest":{
                                          "fechaDesde":""
                                      }       
                                  },
                                  "usrRed": this.uid,
                                  "ipClient": this.ipClient,
                                  "conn": ""
                              }
        this._misSolicitudes.getDictamentes( dataSolicitudExt )
            .subscribe( ( resp:any ) => {
              
              if( resp === null) {
                this.dataTableSol = [];
              }

              this.dataTableSol = resp.data.lisAdministradorGestDias;

            }, (error) => {
              this.headerModalM = "Busqueda de Usuarios";
              this.messageModalM =  error.errors[0].message;
              this.displayModalFormErr = true;
            });    

  }

  /**
   * Metodo para obtener las solicitudes en busqueda avanzada
   *
   * @memberof GestiondiariaComponent
   */
  obtenerSolExtAdv() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.consultaIni = "0";
    this.rzonSocial = this.dataFiltersb.rzonSocial;
    this.session = '';
    this.solPropias = "";
    this.regionp = this.dataFiltersb.region;
    this.cc = this.dataFiltersb.banca;
    this.zonap = this.dataFiltersb.zona;
    this.buc = this.dataFiltersb.buc;
    this.folio = this.dataFiltersb.busquedaFolio;
    
    const dataSolicitudExtAdv = {
                                  "beanBusquedaTipoDict": {
                                      "solPropias": this.solPropias,
                                      "tipoDictamen": "",
                                      "avisoUpld":""
                                  },
                                  "beanFechasRequest": {
                                      "fechaDesde": this.minDate,
                                      "fechaHasta": this.fechahasta,
                                      "fechaInicio": "",
                                      "fechaFin": ""
                                  },
                                "beanBusqueda":{
                                        "folio": this.folio,
                                        "estadoFolio": this.estado,
                                        "buc": this.buc,
                                        "razonSocial": this.rzonSocial,
                                },
                                "beanZonaRespuesta":{
                                        "region": this.regionp,
                                        "banca": this.cc,
                                        "zona": this.zonap
                                },
                                "vigList":"",
                                  "usrRed": this.uid,
                                  "ipClient": this.ipClient,
                                  "conn": this.session
                              }

        this._misSolicitudes.getDictamentesAdv( dataSolicitudExtAdv )
            .subscribe( ( resp:any ) => {
              
              if( resp == null) {
                this.dataTableSol = [];
              } 
              
              this.dataTableSolRazSoc = resp.data.lisAdministradorGestDias;          
              
            }, (error) => {
              this.headerModalM = "Busqueda de Usuarios";
              this.messageModalM =  error.errors[0].message;
              this.displayModalFormErr = true;
            });

  }

  /**
   * Metodo para obtener el id del folio
   *
   * @param {string} id
   * @memberof GestiondiariaComponent
   */
  obtenerIdFolio( id: string ) {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const idfolio = id;
    const usrRed = this.uid;
    const ipClient = this.ipClient;
    const session = '';

    this._dictaminacion.getIdxFolio( idfolio, usrRed, ipClient, session )
                       .subscribe( ( resp:any ) => {
                          return resp.beanRespuestaConsulta.beanComplementoRespuesta.id;
                       })

  }

  /**
   * Metodo para obtener el xls de los folios
   *
   * @memberof GestiondiariaComponent
   */
  exportExcel() {

    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.dataTableSol);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "mis-solicitudes");
    });
  
  }

  /**
   * Metodo para guardar el xls
   *
   * @param {*} buffer
   * @param {string} fileName
   * @memberof GestiondiariaComponent
   */
  saveAsExcelFile(buffer: any, fileName: string): void {
    
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

  /**
   * Reinicia formulario
   *
   * @memberof GestiondiariaComponent
   */
  limpiarFormulario() {
      
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/gestiondiaria']);
    });

  }

  /**
   * Cerrar modal
   *
   * @memberof GestiondiariaComponent
   */
  closeModalForm() {
    this.displayModalFormErr = false;
  }

}
