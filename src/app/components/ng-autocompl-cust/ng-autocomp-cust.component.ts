import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ng-autocomp-cust',
  templateUrl: './ng-autocomp-cust.component.html',
  styles: [
  ]
})
export class NgAutocompCustComponent {

  /* Input para data del componente */
  @Input('data_drop') items!: any;
  @Input('labelInput') labelInput!: string;
  @Input() disabled!: boolean;

  /* Output para data del componente */
  @Output() itemSelect = new EventEmitter<string>();

  /* Tipo de intput del componente */
  @Input() data!: string;

  /* Parametro resultados */
  output!: string[];

  /**
   * Evento de busqueda y filtrado del input
   * @param {*} event
   * @memberof NgAutocompCustComponent
   */
  search(event: any) {

      let filtered: any[] = [];
      this.output = this.items;
      if( event.query == null || event.query === undefined || event.query === "" ) {
        this.output = this.items;
      }
      let buscaItem = event.query;

      for(let item of this.items) {
        this.output = filtered;
        
        if (item.nombre.toLowerCase().indexOf(buscaItem.toLowerCase()) >= 0) {
          filtered.push(item);
        }
        this.output = filtered;
      }

  }

  /**
   * @memberof NgAutocompCustComponent
   */
  sendOutput(){
      
      this.itemSelect.emit( this.data );

  }

}
