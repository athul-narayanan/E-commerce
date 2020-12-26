import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthServiceService,private router:Router) { }

  canActivate(route,state:RouterStateSnapshot){
    return this.authService.user.pipe(map(use=>{
      if(use) return true;
      this.router.navigate(['/login'],{queryParams : {returnUrl : state.url}})
      return false;
     }))
  }
}
