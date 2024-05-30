import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ng-dropdown',
  templateUrl: './ng-dropdown.component.html',
  styles: []
})
export class NgDropdownComponent {

  /* Lista de datos */
  @Input() data: Array<any> = []
  /* Nombre del ngModel que guardará el item seleccionado */
  @Input() parentForm!: any;
  /* Nombre requerido para identificar el el elemento */
  @Input() name!: string;
  /* Descripción inicial al seleccionar un item  */
  @Input() placeholder: string = 'Seleccionar';
  
  /* Variable de retorno que emite el valor seleccioando */
  @Output() itemSelect = new EventEmitter<string>();

  itemSelectEmitter(value: any): void {
    this.itemSelect.emit(value);
  }

}


