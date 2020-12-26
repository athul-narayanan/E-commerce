import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './shared/services/auth-service.service';
import {UserService} from './shared/services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-cart';
  constructor(
    private authService:AuthServiceService,
    private router : Router,
    private userService:UserService){
    this.authService.user.subscribe(user=>{
      if(user){
        this.userService.save(user)
        let returnUrl = sessionStorage.getItem("returnUrl");
        this.router.navigate([returnUrl]);
      }
    })
  }
}
