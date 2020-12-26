import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { Order } from '../shared/models/order';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})
export class ShoppingFormComponent implements OnInit , OnDestroy {
  userId : string;
  userSubscription : Subscription;
  @Input() cart : ShoppingCart ;

  constructor(
    private orderService : OrderService,
    private authService : AuthServiceService,
    private router : Router
  ) {
    
   }

  ngOnInit(): void {
    this.userSubscription  = this.authService.user.subscribe(user=> this.userId = user.uid);
  }
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder(shipping){
    let orderObj= new Order(this.userId,shipping.value,this.cart)
    let result =  await this.orderService.placeOrder(orderObj);
    this.router.navigate(['/order-success',result.key])
  }
}
