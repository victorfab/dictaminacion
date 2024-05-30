import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { NgCalendarComponent } from 'src/app/components/ng-calendar/ng-calendar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
//Servicios
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { ReportesService } from 'src/app/servicios/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: [
  ]
})
export class ReportesComponent implements OnInit {

  @ViewChild('busquedaAvanzadaHasta') busquedaAvanzadaHasta!: NgCalendarComponent;

  estado!: "";

  buc!: "";
  
  rfc!: "";
  
  nomrs!: "";
  
  tipoRep!: any;
  
  tipoReporte!: any;
  
  region!: any;
  
  minDate: any = "";
  
  fechahasta: any = "";
  
  fchEnvio: any = '';

  ipClient: any;

  usrRed: any;
  
  centralCuentas: boolean = true;
  
  calidadJuridica: boolean = true;
  
  dictaminacion: boolean = true;

  dateToDay: Date = new Date();

  regionData: any = [];

  dataFiltersb: any;

  dataTableCentCtas!: any[];

  dataTableCalidadJur!: any[];

  dataTableReports!: any[];

  dataTableAvalRepo!: any[];

  displayModalM = false;

  headerModalM!: string;

  messageModalM!: string;


  constructor( public _router:  Router,
               private _catalogos: CatalogosService,
               private _reportes: ReportesService,
               private _sanitizer: DomSanitizer ) { 

    this.dataFiltersb = {};

  }

  ngOnInit(): void {

    this.getRegiones();

    this.obtenerArhivos();

    this.tipoRep = [
      {
        "id": "0",
        "nombre": "CENTRAL DE CUENTAS",
      },
      {
        "id": "1",
        "nombre": "CALIDAD JURIDICA"
      },
      {
        "id": "2",
        "nombre": "DICTAMINACIÓN"
      }
    ]

  }

  /**
   *
   * Metodo para obtener eventos de los inputs
   * @param {*} event
   * @param {string} field
   * @memberof ReportesComponent
   */
  getData( event: any, field: string ) {

    switch ( field ) {
      case 'tiporep':
        this.dataFiltersb.tipoReporte = event.value.nombre;
        this.validarTipo();
        break;
      case 'region':
        this.dataFiltersb.region = event.value.id;
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
      default:
        break;
    }

  }

  /**
   *
   * Metodo para limpiar formulario
   * @memberof ReportesComponent
   */
  limpiarFormulario() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/reportes']);
    });
  }

  /**
   *
   * Metodo para validar el tipo de reporte
   * @memberof ReportesComponent
   */
  validarTipo() {

    let tiporepo = this.dataFiltersb.tipoReporte;
    this.centralCuentas = true;
    this.calidadJuridica = true;
    this.dictaminacion = true;

    switch ( tiporepo ) {
      case 'CENTRAL DE CUENTAS':
        this.obtenerReporteCC();
        break;
      case 'CALIDAD JURIDICA':
        this.obtenerReporteCJ();
        break;
      case 'DICTAMINACIÓN':
        this.obtenerReporteDict();
        break
      default:
        break;
    }
  }

  /**
   *
   * Metodo para obtener el Reporte central de costos
   * @memberof ReportesComponent
   */
  obtenerReporteCC() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    this.centralCuentas = false;
    let message = 'message';

    const request = {
      "beanConsultaReporte": {
          "tipoReporte": "centralCuentas",
          "fechaDesde": this.dataFiltersb.ci_fini,
          "fechaHasta": this.dataFiltersb.ci_ffin,
          "region": this.dataFiltersb.region === undefined ? "" : this.dataFiltersb.region
      },
      "diasRep": false,
      "usrRed": this.usrRed,
      "ipClient": this.ipClient,
      "conn": ""
    };

    this._reportes.getReportesCentralCtas(request)
        .subscribe( ( resp: any[] ) => {
          if( resp[0].insertReport === true ) {
            this.headerModalM = "REPORTES";
            this.messageModalM = 'Se esta generando su reporte, vuelva mas tarde';
            this.displayModalM = true;
          } else {
            this.dataTableCentCtas = resp;
          }
          
        })

  }

  /**
   *
   * Metodo para obtener el reporte Calidad Juridica
   * @memberof ReportesComponent
   */
  obtenerReporteCJ() {

    this.usrRed = localStorage.getItem("uId");
    this.centralCuentas = true;
    this.calidadJuridica = false;
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const request = {
      "beanConsultaReporte": {
          "tipoReporte": "calidadJuridica",
          "fechaDesde": this.dataFiltersb.ci_fini,
          "fechaHasta": this.dataFiltersb.ci_ffin,
          "region": this.dataFiltersb.region === undefined ? "" : this.dataFiltersb.region
      },
      "diasRep": false,
      "usrRed": this.usrRed,
      "ipClient": this.ipClient,
      "conn": ""
    };

    this._reportes.getReportesCalidadJuridica(request)
        .subscribe( ( resp: any[] ) => {
          if( resp[0].insertReport === true ) {
            this.headerModalM = "REPORTES";
            this.messageModalM = 'Se esta generando su reporte, vuelva mas tarde';
            this.displayModalM = true;
          } else {
            this.dataTableCalidadJur = resp;
          }
        })

  }

  /**
   *
   * Metodo para obtener el reporte Dictaminación
   * @memberof ReportesComponent
   */
  obtenerReporteDict() {

    this.dictaminacion = false;
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const request = {
      "beanConsultaReporte": {
          "tipoReporte": "dictaminacion",
          "fechaDesde": this.dataFiltersb.ci_fini,
          "fechaHasta": this.dataFiltersb.ci_ffin,
          "region": this.dataFiltersb.region === undefined ? "" : this.dataFiltersb.region
      },
      "diasRep": false,
      "usrRed": this.usrRed,
      "ipClient": this.ipClient,
      "conn": ""
    };

    this._reportes.getReportesDictaminacion(request)
        .subscribe( ( resp: any[] ) => {
          if( resp[0].insertReport === true ) {
            this.headerModalM = "REPORTES";
            this.messageModalM = 'Se esta generando su reporte, vuelva mas tarde';
            this.displayModalM = true;
          } else {
            this.dataTableReports = resp;
          }
        })

  }

  /**
   *
   * Metodo para obtener el listado de archivos disponibles
   * @memberof ReportesComponent
   */
  obtenerArhivos() {

    let data = {}

    this._reportes.getReprotes( data )
        .subscribe((resp:any[]) => {
          this.dataTableAvalRepo = resp;
        })

  }

  /**
   *
   * Metodo para generar link para descarga
   * @param {*} nombre
   * @memberof ReportesComponent
   */
  descargarArchivo( nombre:any ) {

    this._reportes.descargaReporte( nombre )
        .subscribe((resp:any) => {

          let sanitizedBase: any = '';
          const basefile = `data:application/pdf;base64,${resp.contenido}`;
          const link = document.createElement("a");
          sanitizedBase = this._sanitizer.sanitize(SecurityContext.HTML, basefile)
          link.href = sanitizedBase;
          link.download = `${nombre}`
          link.click();

        })

}

  /**
   *
   * Metodo para exportar excel reporte central de cuentas
   * @memberof ReportesComponent
   */
  exportExcelCC() {

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this._dataTableCentCtasFormated(
        this.dataTableCentCtas
      ));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "reporte");
    });
  
  }

  /**
   * Central de Cuentas data format excel to export
   * @private
   * @param {Array<object>} dataRequestExport
   * @return {*}  {Array<object>}
   * @memberof ReportesComponent
   */
  private _dataTableCentCtasFormated(dataRequestExport : Array<object>) : Array<object> {
    let dataToExport :  Array<object> = [];
    dataRequestExport.forEach((element : any) => {
      dataToExport.push({
        "ID": element.idFolio,
        "BUC": element.buc,
        "Folio": element.folio,
        "Fecha envío": element.fchEnvio,
        "Nombre o razón social": element.razonSocial,
        "Región": element.beanZonaRespuesta.region,
        "Zona": element.beanZonaRespuesta.zonaSolicitante,
        "Banca": element.beanZonaRespuesta.banca,
        "Vigencia": element.beanVigencia.vigencia,
        "Tipo de vigencia": element.beanVigencia.tipoVigencia,
        "Fecha de vencimiento": element.beanVigencia.fechaVigencia,
        "Tipo dictamen": element.tipoDictamen,
        "Aviso UPLD": element.avisoUpld
      });
    });
    return dataToExport;
  }

  /**
   *
   * Metodo para exportar excel reporte dictaminación
   * @param {boolean} reportType
   * @memberof ReportesComponent
   */
  exportExcelDict(reportType : boolean) {

    const dataTableToFormat : Array<object> = reportType ? 
      this._dataTableLegalQualityFormated(this.dataTableCalidadJur) :
      this._dataTableDictFormated(this.dataTableReports);
    import("xlsx").then(xlsx => {

      const worksheet = xlsx.utils.json_to_sheet(dataTableToFormat);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "reporte");
    });
  
  }

  /**
   * Calidad Juridica data format excel to export
   * @private
   * @param {Array<object>} dataRequestExport
   * @return {*}  {Array<object>}
   * @memberof ReportesComponent
   */
  private _dataTableLegalQualityFormated(dataRequestExport : Array<object>) : Array<object> {

    let dataToExport :  Array<object> = [];
    dataRequestExport.forEach((element : any) => {
      dataToExport.push({
        "Número consecutivo": element.beanDatosDictamen.numConsecutivo,
        "Folio": element.folio,
        "Sucursal": element.beanZonaRespuesta.sucursalSolicitante,
        "Centro de costo": element.centroCosto,
        "Nombre solicitante": element.beanDatosDictamen.nombreSolicitante,
        "Origen": element.beanDatosDictamen.origen,
        "BUC": element.buc,
        "Región": element.beanZonaRespuesta.region,
        "Zona": element.beanZonaRespuesta.zonaSolicitante,
        "Banca": element.beanZonaRespuesta.banca,
        "Razón social": element.razonSocial,
        "Fecha solicitud": element.beanFechasRespuesta.fechaRegistro,
        "Fecha compromiso": element.beanFechasRespuesta.fechaCompromiso,
        "Fecha envío": element.beanFechasRespuesta.fechaEnvio,
        "Abogado seguimiento": element.beanDatosDictamen.abogadoSeguimiento,
        "Tipo dictamen": element.beanDatosDictamen.tipoDict,
        "Escritura póliza": element.escrituraPoliza,
        "Abogado externo": element.beanDatosDictamen.abogadoExterno,
        "Estado solicitud": element.estadoFolio,
        "Primera causa de reingreso": element.beanReporteReingreso.primeraCausaReingreso,
        "Confirmación": element.beanReporteReingreso.confirmacion,
        "Aclaración a causa de reingreso": element.beanReporteReingreso.aclaracionCausaReingreso,
        "Comentario": element.beanReporteReingreso.comentario,
        "TAtenciónAE": element.tatencionAe,
      });
    });
    return dataToExport;
  }
  /**
   * Dictaminación data format excel to export
   * @private
   * @param {Array<object>} dataRequestExport
   * @return {*}  {Array<object>}
   * @memberof ReportesComponent
   */
  private _dataTableDictFormated(dataRequestExport : Array<object>) : Array<object> {
    let dataToExport :  Array<object> = [];
    dataRequestExport.forEach((element : any) => {
      dataToExport.push({
        "ID": element.beanDatosFolio.idFolio,
        "Id usuario solicitante": element.beanDatosAbogados.idUsuarioSolicitante,
        "Tipo reingreso": element.beanDatosComplemento.tipoReingreso,
        "Fecha solicitud": element.beanFechaDictaminacion.beanFechasRespuesta.fechaRegistro,
        "Fecha compromiso": element.beanFechaDictaminacion.beanFechasRespuesta.fechaCompromiso,
        "Año": element.beanDatosFolio.anio,
        "Mes": element.beanDatosFolio.mes,
        "Región": element.beanIdZona.regionSolicitante,
        "Id zona": element.beanIdZona.idZonaSolicitante,
        "Zona": element.beanZonaRespuesta.zonaSolicitante,
        "Región de ingreso": element.beanIdZona.regionIngreso,
        "Dato pyme región": element.beanZonaRespuesta.datoPymeRegion,
        "Dato pyme zona": element.beanZonaRespuesta.datoPymeZona,
        "Centro costo": element.centroCosto,
        "Sucursal": element.beanZonaRespuesta.sucursalSolicitante,
        "B.U.C.": element.beanDatosFolio.buc,
        "Razón social": element.beanDatosFolio.razonSocial,
        "Fecha modificación razón social": element.beanDatosFolio.fechaModifRazonSoc,
        "Número folio": element.beanDatosFolio.numeroFolio,
        "Número folio complemento": element.beanDatosComplemento.numeroFolioComplemento,
        "Folio": element.folio,
        "Folio complemento": element.beanDatosComplemento.folioComplemento,
        "Comentario complemento": element.beanDatosComplemento.comentarioComplemento,
        "Tipo dictamen": element.beanDatosFolio.tipoDictamen,
        "Abogado seguimiento": element.beanDatosAbogados.abogadoSeguimiento,
        "Abogado seguimiento anterior": element.beanDatosAbogados.abogadoSeguimientoAnterior,
        "Fecha reporte asunto": element.beanFechaDictaminacion.fechaReporteAsunto,
        "Fecha reasignación": element.beanFechaDictaminacion.fechaReasignacion,
        "Reasignado por": element.beanDatosAbogados.reasignadoPor,
        "Abogado externo": element.beanDatosAbogados.abogadoExterno,
        "Id tipo rechazo seguimiento 1": element.beanSeguimientoDict.idTipoRechazoSeguimiento1,
        "Comentario seguimiento (último)": element.beanComentarioDictamen.comentarioRechazoSeguimiento1,
        "Fecha seguimiento 1": element.beanFechaDictaminacion.fechaSeguimiento1,
        "Comentario confirmación": element.beanComentarioDictamen.comentarioRechazoSeguimiento1,
        "Id tipo rechazo seguimiento 2": element.beanSeguimientoDict.idTipoRechazoSeguimiento2,
        "Comentario rechazo seguimiento 2": element.beanComentarioDictamen.comentarioRechazoSeguimiento2,
        "Fecha llegada abogado seguimiento 1": element.beanFechaDictaminacion.fechaLlegaAbogadoSeguimiento1,
        "Fecha graba abogado seguimiento 1": element.beanFechaDictaminacion.fechaGrabaAbogadoSeguimiento1,
        "Fecha llegada abogado externo": element.beanFechaDictaminacion.fechaLlegadaAbogadoExterno,
        "Fecha graba abogado externo": element.beanFechaDictaminacion.fechaGrabaAbogadoExterno,
        "Minutos abogado externo": element.beanSeguimientoDict.minutosAbogadoExterno,
        "Cantidad regresos abogado final": element.beanSeguimientoDict.cantidadReingresosAbogadoFinal,
        "Fecha publicación": element.beanFechaDictaminacion.fechaFinalizacion,
        "Código estado dictamen": element.beanEstadoDictamen.codigoEstadoDictamen,
        "Código estado": element.beanEstadoDictamen.codigoEstado,
        "Código estado por rol": element.beanEstadoDictamen.codigoEstadoPorRol,
        "Rol anterior": element.beanEstadoDictamen.rolAnterior,
        "Rol actual": element.beanEstadoDictamen.rolActual,
        "Id usuario actual": element.beanDatosAbogados.idUsuarioActual,
        "Comentario solicitante (último)": element.beanComentarioDictamen.comentarioComplementoInicial,
        "Subtipo rechazo seguimiento 1": element.beanSeguimientoDict.idSubtipoRechazoSeguimiento1,
        "Subtipo rechazo seguimiento 2": element.beanSeguimientoDict.idSubtipoRechazoSeguimiento2,
        "Clase persona": element.beanEstadoDictamen.idClasePersona,
        "Rechazo abogado externo": element.beanSeguimientoDict.rechazoAbogadoExterior,
        "Subtipo rechazo externo": element.beanSeguimientoDict.subtipoRechazoExterno,
        "Comentario externo (último)": element.beanComentarioDictamen.comentarioExterno,
        "Mensaje externo 1": element.beanComentarioDictamen.mensajeExterno1,
        "Mensaje seguimiento 1": element.beanComentarioDictamen.mensajeSeguimiento1,
        "Mensaje externo 2": element.beanComentarioDictamen.mensajeExterno2,
        "Mensaje Seguimiento 2": element.beanComentarioDictamen.mensajeSeguimiento2,
        "SLA folio": element.beanSLAInfo.folioSLA,
        "SLA despacho": element.beanSLAInfo.despachoSLA,
        "SLA abogado envío": element.beanSLAInfo.abogEnvSLA,
        "SLA abogado publicación": element.beanSLAInfo.abogPubSLA
      });
    });
    return dataToExport;
  }

  /**
   *
   * Metodo para guardar el archivo xls
   * @param {*} buffer
   * @param {string} fileName
   * @memberof ReportesComponent
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
   *
   * Metodo para obtener catalogo de regiones
   * @memberof ReportesComponent
   */
  getRegiones() {
    this._catalogos.getRegion()
        .subscribe( (resp: any[] ) => {
          this.regionData = resp;
        })
  }

  /**
   *
   * Metodo para cerrar modal
   * @memberof ReportesComponent
   */
  closeModal() {

    this.displayModalM = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/reportes']);
    });

  }

}
