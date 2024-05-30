import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
// Interfaces
import { Diainhabil } from '../../interfaces/diainhabil.interface';
// Servicios
import { SlaService } from '../../servicios/sla.service';


@Component({
  selector: 'app-admin-sla',
  templateUrl: './admin-sla.component.html',
  styles: [
  ]
})

export class AdminSlaComponent implements OnInit {

  solnva!: string;
  rechazo!: string;
  actinf!: string;
  error!: string;
  slalunesini!: string;
  slamartesini!: string;
  slalunesfin!: string;
  slamartesfin!: string;
  slamiercolesini!: string;
  slamiercolesfin!: string;
  slajuevesini!: string;
  slajuevesfin!: string;
  slaviernesini!: string;
  slaviernesfin!: string;
  ihoralunesini!: string;
  ihoralunesfin!: string;
  ihoramartesini!: string;
  ihoramartesfin!: string;
  ihoramiercolesini!: string;
  ihoramiercolesfin!: string;
  ihorajuevesini!: string;
  ihorajuevesfin!: string;
  ihoraviernesini!: string;
  ihoraviernesfin!: string;
  ihora: any;
  descripcion!: string;
  dataFiltersb!: any;
  diasinhabiles!: Diainhabil[];
  diainhabil!: any;
  diainhabil2!: Diainhabil[];
  ci_fini!: string;
  cols!: any[];
  selectedDiasInhabiles!: any;
  page = 1;
  totalPages = 0;
  submitted = false;
  dropintvalue: any[] = [];
  diasinhabilesvalue: any[] = new Array;
  newfechajoin!: string;
  newfechasplit!: string;
  catalogoMeta!: [];
  dia!: any;
  mes!: any;
  anio!: any;
  fechaedit!: string;
  diainhabiledit!: any;
  descripcionedit!: string;
  clonedSla: { [s: string]: Diainhabil; } = {};

  indexActiveEdit: number = -1;
  dialogConfirm: boolean = false;
  confirmDeleteDay: boolean = false;
  titleDialog: string = '';
  messageDialog: string = '';

  dateEdit!: string;

  private _rowIdDeleteDay: string = '';


  constructor( private message: MessageService,
               private _diainhabil: SlaService,
               public _router: Router,
               private _bearerToken: BearerTokenService ) { 
               
                  this.dataFiltersb = {};                 
               
              }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.obtenerMetaSLA();
    this.obtenerMetaHL();
    this.obtenerDiasInhabiles();

    this.diainhabil = {};
    this.submitted  = false;

  }

  /**
   *
   * Obtiene el Metacatalogo del SLA
   * @memberof AdminSlaComponent
   */
  obtenerMetaSLA() {

    this._diainhabil.getMetacatalogoSLA()
        .subscribe( resp => {

          this.catalogoMeta = resp.informacion;
          this.solnva = resp.informacion[0].valor;
          this.actinf = resp.informacion[1].valor;
          this.rechazo = resp.informacion[2].valor;
          this.error = resp.informacion[3].valor;

          this.dataFiltersb.solnva = Number(resp.informacion[0].valor);
          this.dataFiltersb.actinf = Number(resp.informacion[1].valor);
          this.dataFiltersb.rechazo = Number(resp.informacion[2].valor);
          this.dataFiltersb.error = Number(resp.informacion[3].valor);
          
        }, (error) => {
          return error;
        });

  }

  /**
   * Obtiene el Metacatalogo de Horario Laboral
   *
   * @memberof AdminSlaComponent
   */
  obtenerMetaHL() {

    this._diainhabil.getMetacatalogoHL()
        .subscribe( resp => {
          
          this.slalunesini = resp.informacion[0].valor
          this.slalunesfin = resp.informacion[1].valor
          this.slamartesini = resp.informacion[2].valor
          this.slamartesfin = resp.informacion[3].valor
          this.slamiercolesini = resp.informacion[4].valor
          this.slamiercolesfin = resp.informacion[5].valor
          this.slajuevesini = resp.informacion[6].valor
          this.slajuevesfin = resp.informacion[7].valor
          this.slaviernesini = resp.informacion[8].valor
          this.slaviernesfin = resp.informacion[9].valor

          this.dataFiltersb.slalunesini = Number(resp.informacion[0].valor)
          this.dataFiltersb.slalunesfin = Number(resp.informacion[1].valor)
          this.dataFiltersb.slamartesini = Number(resp.informacion[2].valor)
          this.dataFiltersb.slamartesfin = Number(resp.informacion[3].valor)
          this.dataFiltersb.slamiercolesini = Number(resp.informacion[4].valor)
          this.dataFiltersb.slamiercolesfin = Number(resp.informacion[5].valor)
          this.dataFiltersb.slajuevesini = Number(resp.informacion[6].valor)
          this.dataFiltersb.slajuevesfin = Number(resp.informacion[7].valor)
          this.dataFiltersb.slaviernesini = Number(resp.informacion[8].valor)
          this.dataFiltersb.slaviernesfin = Number(resp.informacion[9].valor)

        })
  }

  /**
   * Guardar SLA Horario Laboral
   *
   * @memberof AdminSlaComponent
   */
  guardarSLA_HL() {

    const data = [
                    {
                        "id": "",
                        "tipo": "SLA",
                        "clave": "SOL_NUEVA",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.solnva)
                    },
                        {
                        "id": "",
                        "tipo": "SLA",
                        "clave": "ACT_INFO",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.actinf)
                    },
                        {
                        "id": "",
                        "tipo": "SLA",
                        "clave": "RECHAZO",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.rechazo)
                    },
                        {
                        "id": "",
                        "tipo": "SLA",
                        "clave": "ERROR",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.error)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "LUN_APERTURA",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slalunesini)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "LUN_CIERRE",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slalunesfin)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "MAR_APERTURA",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slamartesini)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "MAR_CIERRE",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slamartesfin)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "MIE_APERTURA",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slamiercolesini)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "MIE_CIERRE",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slamiercolesfin)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "JUE_APERTURA",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slajuevesini)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "JUE_CIERRE",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slajuevesfin)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "VIE_APERTURA",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slaviernesini)
                    },
                    {
                        "id": "",
                        "tipo": "HORARIO_LABORAL",
                        "clave": "VIE_CIERRE",
                        "descripcion": "",
                        "valor": JSON.stringify(this.dataFiltersb.slaviernesfin)
                    }
                ]

    this._diainhabil.saveMetaSLA_HL( data )
        .subscribe( resp => {
            this.titleDialog = 'SLA'
            this.messageDialog = 'Se han actualizado los datos correctamente';
            this.dialogConfirm = true;
            return resp;
        }, (error) =>{
          this.titleDialog = 'Error'
          this.messageDialog = 'No se ha podido actualizar la información registrada';
          this.dialogConfirm = true;
        });
  }

  obtenerDiasInhabiles() {

    this._diainhabil.getDiasInhabiles()
        .then(data => {

          this.diasinhabiles = data;

          for( let fj of this.diasinhabiles ) {
            
            this.dia = fj.dia;
            this.mes = fj.mes;
            this.anio = fj.anio;

          }
            
        });

  }

  onRowEditInit(diainhabil: Diainhabil, rowIndex: number) {
    if (diainhabil && diainhabil.id) {
      this.dateEdit = `${diainhabil.dia}/${diainhabil.mes}/${diainhabil.anio}`;
      this.fechaedit = `${diainhabil.dia}-${diainhabil.mes}-${diainhabil.anio}`;
      this.diainhabiledit = diainhabil.descripcion;
      this.clonedSla[diainhabil.id] = {...diainhabil};
      this.indexActiveEdit = rowIndex;
    }
  }

  onRowEditSave(diainhabil: Diainhabil, id: any, rowIndex: number) {
    if (diainhabil && diainhabil.id) {
      delete this.clonedSla[diainhabil.id];

      const [dia, mes, anio] = this.fechaedit.split('-');

        const data = {
          "id": id,
          "anio": anio,
          "mes": mes,
          "dia": dia,
          "descripcion": this.diainhabiledit
        }

        this._diainhabil.updtDiasinhabiles( data )
            .subscribe( ( response: any ) => {
              this.titleDialog = 'Días festivos'
              this.messageDialog = 'Se han actualizado los datos correctamente';
              this.dialogConfirm = true;
              const itemFound = this.diasinhabiles.find((item, index) => index === rowIndex);
              if (itemFound) {
                itemFound.dia = dia;
                itemFound.mes = mes;
                itemFound.anio = anio;
                itemFound.descripcion = this.diainhabiledit;
              }
              this.descripcionedit = '';
              this.fechaedit = '';
              this.indexActiveEdit = -1;
            }, (error: any) => {
              this.titleDialog = 'Error'
              this.messageDialog = 'No se ha podido actualizar la información registrada';
              this.dialogConfirm = true;
              this.diainhabiledit = '';
              this.fechaedit = '';
              this.indexActiveEdit = -1;
            });
            
    }
    else {
        this.message.add({severity:'error', summary: 'Error', detail:'Error'});
    }
  }

  onRowEditCancel(diainhabil: Diainhabil, index: number) {
    if (diainhabil && diainhabil.id) {
      this.diasinhabiles[index] = this.clonedSla[diainhabil.id];
      delete this.clonedSla[diainhabil.id];
      this.indexActiveEdit = -1;
    }
  }

  getData( event: any, field: string ) {

    switch ( field ) {
      case 'ci_fini':
        this.dataFiltersb.ci_fini = event;
        break;
      case 'fechaedit':
        this.fechaedit = event;
        break;
      case 'solnva':
        this.dataFiltersb.solnva = event.value;
        break;
      case 'actinf':
        this.dataFiltersb.actinf = event.value;
        break;
      case 'rechazo':
        this.dataFiltersb.rechazo = event.value;
        break;
      case 'error':
        this.dataFiltersb.error = event.value;
        break;
      default:
        break;
    }

  }

  getDataIni( event: any, field: string ) {

    switch ( field ) {
      case 'slalunesini':
        this.dataFiltersb.slalunesini = event.value;
        break;
      case 'slamartesini':
        this.dataFiltersb.slamartesini = event.value;
        break;
      case 'slamiercolesini':
        this.dataFiltersb.slamiercolesini = event.value;
        break;
      case 'slajuevesini':
        this.dataFiltersb.slajuevesini = event.value;
        break;
      case 'slaviernesini':
        this.dataFiltersb.slaviernesini = event.value;
        break;
    }

  }

  getDataFin( event: any, field: string ) {

    switch ( field ) {
      case 'slalunesfin':
        this.dataFiltersb.slalunesfin = event.value;
        break;
      case 'slamartesfin':
        this.dataFiltersb.slamartesfin = event.value;
        break;
      case 'slamiercolesfin':
        this.dataFiltersb.slamiercolesfin = event.value;
        break;
      case 'slajuevesfin':
        this.dataFiltersb.slajuevesfin = event.value;
        break;
      case 'slaviernesfin':
        this.dataFiltersb.slaviernesfin = event.value;
        break;
    }

  }

  splitDate() {

    const [dia, mes, anio] = this.dataFiltersb.ci_fini.split('-');

    this.dia = dia;
    this.mes = mes;
    this.anio = anio;

  }

  guardarDiaNoOficial() {

    this.splitDate();

    this.submitted = true;

    this.diainhabil.id = this.createId();
    this.diasinhabiles.push(this.diainhabil);
    this.diasinhabiles = [...this.diasinhabiles];

    this.dropintvalue.push(this.dia);
    this.dropintvalue.push(this.mes);
    this.dropintvalue.push(this.anio);
    this.dropintvalue.push(this.descripcion);

    this.diasinhabilesvalue.push( { "id": this.diainhabil.id, "anio": this.anio, "mes": this.mes, "dia": this.dia, "descripcion": this.descripcion } );

    const data = {
                    "anio": this.anio,
                    "mes": this.mes,
                    "dia": this.dia,
                    "descripcion": this.descripcion
                  }

    this._diainhabil.saveDiasInhabiles( data )
        .subscribe( resp => {

          this.titleDialog = 'Días festivos'
          this.messageDialog = 'Se han registrado los datos correctamente';
          this.dialogConfirm = true;
          this.diainhabil = {};
          this.dropintvalue = [];
          this.obtenerDiasInhabiles();

        }, (error: any) => {
          this.titleDialog = 'Error'
          this.messageDialog = 'No se ha podido actualizar la información registrada';
          this.dialogConfirm = true;
        })

    this.dia = "";
    this.mes= "";
    this.anio = "";
    this.descripcion = "";

  }

  eliminarDiaInhabil( id: any): void {
    this.confirmDeleteDay = true;
    this._rowIdDeleteDay = id;
  }

  findIndexById(id: any): number {
    let index = -1;
    for (let i = 0; i < this.diainhabil.length; i++) {
        if (this.diainhabil[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  createId(): string {

    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  
  }

  closeDialog(): void {
    this.dialogConfirm = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/SLA']);
    })
    
  }

  deleteDayItem(): void {
    if (this._rowIdDeleteDay !== '') {
      this._diainhabil.deleteDiasInhabiles( this._rowIdDeleteDay)
        .subscribe( resp => {
          this.titleDialog = 'Días festivos'
          this.messageDialog = 'Se ha eliminado el registro correctamente';
          this.dialogConfirm = true;
          this.confirmDeleteDay = false;
          this.diasinhabiles = this.diasinhabiles.filter(item => item.id !== this._rowIdDeleteDay);
          this._rowIdDeleteDay = '';
        }, (error) => {
          this.titleDialog = 'Error'
          this.messageDialog = 'No se ha podido eliminar el registro';
          this.dialogConfirm = true;
          this.confirmDeleteDay = false;
          this._rowIdDeleteDay = '';
        });
    }
  }

  closeDialogDeleteDay(): void {
    this.confirmDeleteDay = false;
  }



}
