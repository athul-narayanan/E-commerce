import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  updateKey(){

  }

  getAll(){
    return this.db.list('/products').valueChanges()
  }

  getProduct(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(product,productId){
    this.db.object('/products/'+productId).update(product)
  }

  delete(product,productId){
    this.db.object('/products/'+productId).remove();
  }
}
