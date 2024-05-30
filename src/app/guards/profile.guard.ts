import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
// Servicios
import { ProfileService } from '../servicios/profile.service';

@Injectable({
    providedIn: 'root'
  })
  export class ProfileGuard implements CanActivate {

    pass = false;

    constructor( private _profileService: ProfileService, private router: Router ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) {
          
        return true;

      }

  }

