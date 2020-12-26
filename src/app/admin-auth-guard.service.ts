import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './shared/services/auth-service.service';
import {switchMap,map} from 'rxjs/operators'
import { UserService } from './shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{
   
  constructor(private authService:AuthServiceService,private userService:UserService) { }

  canActivate(route,state:RouterStateSnapshot){
    return this.authService.getAppUsers().pipe(
      map(appUser => appUser.isAdmin)
    )
  }
}
