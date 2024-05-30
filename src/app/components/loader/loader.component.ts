import { Component } from '@angular/core';
import { LoaderService } from '../../servicios/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styles: [
  ]
})
export class LoaderComponent{

  loading!: boolean;

  constructor( private loaderService: LoaderService ) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });

   }

}
