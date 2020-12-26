import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {

  @Input()product : any;
  @Input()shoppingCart;
  constructor( public cartService : ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

}
