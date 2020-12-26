import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators'
import {Product} from '../../shared/models/product'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit,OnDestroy {
  categories;
  product = {} as Product
  id: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private router : Router,
    private route : ActivatedRoute
    ) { 
     this.categories = categoryService.getCategories()
     this.id = this.route.snapshot.paramMap.get('id');
     if(this.id){
       this.productService.getProduct(this.id).pipe(
         take(1)
       ).subscribe((product:Product)=>{
         this.product = product;
         this.dtTrigger.next();
       })
     }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  saveProduct(product){
    if(this.id){
      this.productService.update(product.value,this.id)
    }else{
      this.productService.create(product.value)
    } 
    this.router.navigate(['/admin/products'])
  }

  delete(product){
    if(!confirm('Are u sure want to delete the item')) return
    this.productService.delete(product,this.id)
  }
  

}
