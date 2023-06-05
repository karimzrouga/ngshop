import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

const USER_KEY = 'auth-user';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router:Router  ) {
  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
   if(window.sessionStorage.getItem(USER_KEY)) 
   {
    return true;
   }
   this._router.navigate(['/login']);

    return true;
  }
}
