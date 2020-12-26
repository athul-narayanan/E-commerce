import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../shared/models/product';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ProductService } from '../shared/services/product.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products :any = [];
  filteredProducts : any = [];
  category : any
  cart$ : Observable<ShoppingCart>
  constructor(
    private productService:ProductService,
    private route:ActivatedRoute,
    private cartService:ShoppingCartService
  ) {

   }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  private populateProducts(){
    this.productService.getAll().pipe(switchMap(productList=>{
      this.filteredProducts = this.products = productList
      return this.route.queryParamMap
    })).subscribe(queryParam=>{
      this.category = queryParam.get('category');
      this.applyFilter();
    })
  }

  private applyFilter(){
    this.filteredProducts = this.category ? this.products.filter(product=> product.category === this.category) : this.products
  }

  
  

}
