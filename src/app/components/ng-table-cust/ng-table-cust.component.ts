import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-table-cust',
  templateUrl: './ng-table-cust.component.html'
})
export class NgTableCustComponent implements OnInit {

  @Input() config!: any;
  @Input() rows!: any[];

  // Paginator
  showItems!: number;
  showItemsList!: number[];

  ngOnInit(): void {
    this.showItems = 10;
  }

}
