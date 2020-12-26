import { Product } from './product'

export class ShopingCartItem{
    product : Product;
    quantity : number;

    constructor(product:Product,quantity){
        this.product = product;
        this.quantity = quantity;
    }
    get totalPrice(){
        return this.quantity * this.product.price;
    }
}