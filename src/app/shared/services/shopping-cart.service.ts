import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db :AngularFireDatabase) { }

  create(){
     return this.db.list('/shopping-cart').push({
       dateCreated : new Date().getTime()
     })
  }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartid();
    return this.db.object('/shopping-cart/' + cartId).valueChanges().pipe(
      map(x=> new ShoppingCart(x['items'] || {}))
    )
  }
  
  async getOrCreateCartid(){
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      let result = await this.create()
      localStorage.setItem('cartId',result.key);
      return result.key
    }else{
      return cartId;
    }
  }

  getItem(cartId,product){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
  } 

  async updateQuantity(product:Product,changeValue:number){
    let cartId = await this.getOrCreateCartid();
    let item$ = this.getItem(cartId,product);
    item$.valueChanges().pipe(
      take(1)
    ).subscribe(item=>{
      item$.update({product : product , quantity : (item && item['quantity'] ? item['quantity'] + changeValue : 1) })  
      if(item && !item['quantity']){
        item$.remove();
      }
    })
  }

  addToCart(product:Product){
     this.updateQuantity(product,1)
  }

  removeFromCart(product){
    this.updateQuantity(product,-1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartid();
    this.db.object('/shopping-cart/'+ cartId + '/items').remove();
  }

  
}
