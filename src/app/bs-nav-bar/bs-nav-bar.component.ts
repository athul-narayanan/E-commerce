import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../shared/models/app-user';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import {AuthServiceService} from '../shared/services/auth-service.service'
@Component({
  selector: 'bs-nav-bar',
  templateUrl: './bs-nav-bar.component.html',
  styleUrls: ['./bs-nav-bar.component.scss']
})
export class BsNavBarComponent implements OnInit {
  appUser:AppUser;
  totalItemsInCart : number
  cart$ : Observable<ShoppingCart>;
  constructor(public auth:AuthServiceService,private shoppingCartService:ShoppingCartService) {
      
   }

  async ngOnInit(){
    this.auth.AppUsers.subscribe(appUser=>{
      this.appUser = appUser
    })
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logOut(){
     this.auth.logOut();
  }

}
