import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import {Product} from '../../shared/models/product'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products$ : Product[]
  filteredProducts : Product[];
  subScription : Subscription
  dtOptions: any = {};
  constructor(private productService:ProductService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.subScription = this.productService.getAll().subscribe((productList:Product[])=>{
      this.filteredProducts = this.products$  = productList
    })
   }

   

  ngOnInit(): void {
  }

  ngOnDestroy(){
     this.subScription.unsubscribe();
  }

  filter(query:String){
     this.filteredProducts = query ? 
       this.products$.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())) :
       this.products$
  }


}
