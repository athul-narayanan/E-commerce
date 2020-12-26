import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShopingCartItem } from './shopping-cart-item'

export class ShoppingCart{
    items : ShopingCartItem[] = []

    constructor(private itemList:{ [key:string] : ShopingCartItem}){
        for(let productId in itemList){
            let item = itemList[productId];
            this.items.push(new ShopingCartItem(item.product,item.quantity))
        }
    }

    get totalItemsInCart(){
       let totalItems = 0;
       for(let item of this.items){
          totalItems += item.quantity;
       }

       return totalItems;
    }

    get productIds(){
        return Object.keys(this.items)
    }

    get totalPrice(){
        let sum = 0;
        this.items.forEach(item=>{
            sum += item.totalPrice;
        })
        return sum;
    }

    getQuantity(product){
        let item = this.itemList[product.key];

        return item ? item.quantity : 0
    }
} 