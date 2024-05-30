import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { IntervinienteService } from 'src/app/servicios/intervinientes.service';
import { MisSolicitudesService } from 'src/app/servicios/missolicitudes.service';

@Component({
  selector: 'app-vistafolios',
  templateUrl: './vistafolios.component.html',
  styles: [
  ]
})
export class VistafoliosComponent implements OnInit {

  dataFolios!: any[];

  usrRed!: any;
  
  ipClient!: any;
  
  session!: string;

  intervinientes: [] = [];

  arrayFiles: any[] = [];

  page: number = 1;

  totalPages: number = 0;

  razsocnombre!: string;

  constructor( private _route: ActivatedRoute,
               public _router:  Router,
               private _misSolicitudes: MisSolicitudesService,
               private _interviniente: IntervinienteService,
               private _bearerToken: BearerTokenService
             ) { }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.dataFolios = [];

    this.getFolios();

    this.obtneerIntervinietes();

    this.obtenerDocumentos();

  }


  getFolios() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem('uId');
    this.session = '';
    const rs = this._route.snapshot.paramMap.get( 'rs' );
    const buc =this._route.snapshot.paramMap.get( 'buc');

    const dataSolicitudExtAdv = {
                                  "beanUsuarioInfo": {
                                    "idUsuario": "",
                                    "centroCost": "",
                                    "buc": buc,
                                    "vigList": "",
                                    "rol": "Abogado externo"
                                  },
                                  "beanFolioInfo": {
                                    "folio": "",
                                    "tipoDic": "",
                                    "estatFol": "",
                                    "nombreDen": rs,
                                    "numPorPag": 0,
                                    "limit": 3,
                                    "totalReg": 3,
                                    "idSolicitud": "",
                                    "rfc":""
                                  },
                                  "beanFechasRequest": {
                                    "fechaDesde": "",
                                    "fechaHasta": "",
                                    "fechaInicio": "",
                                    "fechaFin": "",
                                    "fechaActual": ""
                                  },
                                  "beanInfoAdicional": {
                                    "zona": "",
                                    "region": "",
                                    "banca": "",
                                    "upld": "",
                                    "solPropias": ""
                                  },
                                  "tipoConsulta": false,
                                  "rzonSocial": false,
                                  "rzonSocialDesc": "",
                                  "tipoautenticacion": "",
                                  "externoinit": "",
                                  "usrRed_comment": "",
                                  "usrRed": this.usrRed,
                                  "ipClient": this.ipClient,
                                  "conn": this.session
                                }


    this._misSolicitudes.getDictamentes( dataSolicitudExtAdv )
        .subscribe( ( resp:any ) => {
          
          this.dataFolios = resp.data.lista;
          this.razsocnombre = this.dataFolios[0].busquedaRazonSocial;
 
    }, (error) => {
      return error;
    });

  }

  obtneerIntervinietes() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");
    const buc =this._route.snapshot.paramMap.get( 'buc');
    const session = "";

    this._interviniente.getIntervinientesbuc( buc, this.usrRed, this.ipClient, session )
        .subscribe( resp => {

          this.intervinientes = resp;

        }, (error) => {
          return error;
        });

  }

  obtenerDocumentos() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");
    const buc =this._route.snapshot.paramMap.get( 'buc');
    const session = "";

    this._interviniente.getDocumentos( buc, this.usrRed, this.ipClient, session )
        .subscribe( resp => {

          this.arrayFiles = resp;

        }, (error) => {
          return error;
        });

  }

  exportExcel() {

    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.dataFolios);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "mis-solicitudes");
    });
  
  }

  saveAsExcelFile( buffer: any, fileName: string ): void {
    
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

}
