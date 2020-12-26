import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Input() shoppingCart;
  constructor( ) { }

  ngOnInit(): void {
  }


}
