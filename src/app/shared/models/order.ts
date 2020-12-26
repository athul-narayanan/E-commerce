import { ShoppingCart } from './../models/shopping-cart'
export class Order{
  datePlaced : number;
  items : any[];
  constructor(public userId:String,public shipping:any,shoppingCart:ShoppingCart){
      this.datePlaced = new Date().getTime();
      this.items = shoppingCart.items.map(item=>{
        return {
          product: item.product,
          quantity : item.quantity,
          totalPrice : item.totalPrice
        }
      })
  }
}
