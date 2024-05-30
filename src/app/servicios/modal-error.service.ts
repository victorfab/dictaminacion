import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalErrorService {

  public http401 : BehaviorSubject<boolean>;

  constructor() {
    this.http401 = new BehaviorSubject<boolean>(false);
  }
  
}
