import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentPageService {

  private currentUrl: string = '';
  private previousUrl: string = '';
  private advancedSearchRequest: any | null = null;
  private intuitiveSearch: any | null = null;

  setCurrentUrl( value:string ): void {
    this.currentUrl = value;
  }

  setPreviousUrl( value:string ): void {
    this.previousUrl = value;
  }

  getCurrentUrl(): string {
    return this.currentUrl;
  }

  getpreviousUrl(): string {
    return this.previousUrl;
  }

  setAdvancedSearchRequest(value: any | null): void {
    this.advancedSearchRequest = value;
  }

  
  getAdvancedSearchRequest(): string {
    return this.advancedSearchRequest;
  }

  setIntuitiveSearch(value: any | null): void {
    this.intuitiveSearch = value;
  }

  getintuitiveSearch(): string {
    return this.intuitiveSearch;
  }

}
