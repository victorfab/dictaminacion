import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { NgCalendarComponent } from 'src/app/components/ng-calendar/ng-calendar.component';
// Interfaces
import { Tipousr } from '../../interfaces/catalogos.interface';
import { Usuarios } from '../../interfaces/usuarios.interface';
// Servicios
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { CatalogosService } from '../../servicios/catalogos.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  @ViewChild('busquedaAvanzadaHasta') busquedaAvanzadaHasta!: NgCalendarComponent;

  dataFiltersb!: any;

  dataTableUrs!: Usuarios[];

  dataTableUr!: Usuarios;

  tipousr!: Tipousr[];

  tipusuarios!: Tipousr;

  minDate: any;

  idUser!: string;

  tipodeusr!: string;

  idabog!: string;

  selectedValues: string[] = [];

  dictamenes: any[] = [];

  regiones: any[] = [];

  titleDialog: string = '';

  messageDialog: string = '';
  
  dialogConfirm: boolean = false;
  
  confirmDeleteItem: boolean = false;

  displayModalFormErr = false;

  headerModalM!: string;
  
  messageModalM!: string;

  ipClient: any;

  maxDate: Date = new Date();

  dateToDay: Date = new Date();
  
  private _idsUserDelete: string[] = [];


  constructor( public _router:  Router,
               public _catalogos: CatalogosService,
               public _usuarios: UsuariosService,
               public _bearerToken: BearerTokenService ) { 

    this.dataFiltersb = {};
  
  }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.dataTableUrs = [];

    this.obtenerUsuarios();

    this.getTipoUsuarios();
  }


  getData( event: any, field: string ) {

    switch ( field ) {
      case 'idUsuario':
        this.dataFiltersb.idUsuario = event;
        break; 
      case 'tipusuario':
        this.dataFiltersb.tipusuario = event;

        if( this.dataFiltersb.tipusuario.value.nombre === 'ABOGADO DE SEGUIMIENTO' ) {
          this.tipodeusr = 'S';
        } else if( this.dataFiltersb.tipusuario.value.nombre === 'ABOGADO EXTERNO' ) {
          this.tipodeusr = 'E';
        } else if( this.dataFiltersb.tipusuario.value.nombre === 'CALIDAD' ) {
          this.tipodeusr = 'C';
        } else if( this.dataFiltersb.tipusuario.value.nombre === 'CONFIRMING' ) {
          this.tipodeusr = 'A';
        }
        
        break;
      case 'ci_fini':
        this.busquedaAvanzadaHasta.setMinDate(event);
        this.dataFiltersb.ci_fini = event;
        this.minDate = this.dataFiltersb.ci_fini;
        break;
      case 'ci_ffin':
        this.dataFiltersb.ci_ffin = event;
        break;
      default:
        break;
    }

    this.minDate = new Date( this.dataFiltersb.ci_fini );
  }

  onCheckbox( idabog: any, tipoabog: any, field: any ) {

    this.idabog = idabog;
    switch ( field ) {
      case 'selectUsr':
        this.selectedValues = idabog;

        const tipoUsr = tipoabog;

        if( tipoUsr === 'ABOGADO DE SEGUIMIENTO' ) {
          this.tipodeusr = 'S';
        } else if( tipoUsr === 'ABOGADO EXTERNO' ) {
          this.tipodeusr = 'E';
        } else if( tipoUsr === 'CALIDAD' ) {
          this.tipodeusr = 'C';
        } else if( tipoUsr === 'CONFIRMING' ) {
          this.tipodeusr = 'A';
        }

        break;
      default:
        break;
    }

  }

  obtenerUsuarios() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const fechainicio = this.dataFiltersb.ci_fini;
    const fechafin = this.dataFiltersb.ci_ffin;
    const idUsuario = this.dataFiltersb.idUsuario;
    const tipoUsuario = this.tipodeusr;
    const region = '';
    const idAbogado = '';
    const session = '';
    
    this._usuarios.getUsuarios( fechainicio, fechafin, idUsuario, tipoUsuario, region, idAbogado, this.ipClient, session )
        .subscribe( ( resp:any ) => {

          this.dataTableUrs = resp;
          this.dictamenes = resp.dictamenes;
          this.regiones = resp.regiones;

    }, (error) => {
      this.headerModalM = "Busqueda de Usuarios";
      this.messageModalM =  error.errors[0].message;
      this.displayModalFormErr = true;
    });

  }

  getTipoUsuarios() {

    this._catalogos.getTypeUsr()
        .subscribe( ( resp:any ) => {

          this.tipousr = resp;
          
        })

  }

  modificarUsuario(id: string[]) {
    this._router.navigate(['/usuario', id]);
  }

  eliminarUsuario( id: string[]  ) {
    
    this._idsUserDelete = id;
    this.confirmDeleteItem = true;
  }

  exportExcel() {

    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.dataTableUrs);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "mis-solicitudes");
    });
  
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
      
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/usuarios']);
    });

  }

  closeDialog(): void {
    this.confirmDeleteItem = false;
  }

  deleteItem(): void {
    const tipoabog = this.tipodeusr;

    this._usuarios.delUsuario( this._idsUserDelete, tipoabog )
        .subscribe( ( resp: any ) => {
          this.obtenerUsuarios();
          this.confirmDeleteItem = false;
          this.titleDialog = 'Información'
          this.messageDialog = resp.data ?  resp.data.description : 'Se han eliminado correctamente los ementos seleccionados';
          this.dialogConfirm = true;
        }, (error: any) => {
          this.confirmDeleteItem = false
          this.titleDialog = 'Error'
          this.messageDialog = error.error ? error.errors[0].message: 'No se pudieron eliminar los elementos seleccionados';
          this.dialogConfirm = true;
        })
  }

  closeDialogInfo(): void {
    this.dialogConfirm = false;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/usuarios']);
    });
  }

  closeModalForm() {
    this.displayModalFormErr = false;
  }


}
