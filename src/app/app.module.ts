import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {AngularFireModule} from '@angular/fire'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import {AngularFireAuthModule} from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { BsNavBarComponent } from './bs-nav-bar/bs-nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {RouterModule} from '@angular/router'
import {LoginComponent} from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthServiceService} from './shared/services/auth-service.service'
import { AuthGuard } from './shared/services/auth-guard.service'
import {AdminAuthGuard} from './admin-auth-guard.service'
import { CategoryService } from './shared/services/category.service'
import { ProductService } from './shared/services/product.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule} from 'ng2-validation';
import { DataTablesModule } from 'angular-datatables';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService} from './shared/services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component'
import {OrderService} from './shared/services/order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingFormComponent } from './shopping-form/shopping-form.component'
@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    BsNavBarComponent,
    HomeComponent,
    CheckOutComponent,
    ShoppingCartComponent,
    ProductsComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShoppingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireAuthModule,
    DataTablesModule,
    RouterModule.forRoot([
       { path : '' , component : HomeComponent},
       { path : 'products' , component : ProductsComponent},
       { path : 'shopping-cart', component : ShoppingCartComponent},
       { path : 'login', component : LoginComponent},

       { path : 'check-out', component : CheckOutComponent,canActivate : [AuthGuard]},
       { path : 'my-orders' , component : MyOrdersComponent,canActivate : [AuthGuard]},
       { path : 'order-success/:id', component : OrderSuccessComponent,canActivate : [AuthGuard]},
       { path : 'new-product', component : ProductFormComponent,canActivate : [AuthGuard]},

       { path : 'new-product/:id' , component : ProductFormComponent,canActivate : [AuthGuard,AdminAuthGuard]},
       { path : 'admin/products' , component : AdminProductsComponent,canActivate : [AuthGuard,AdminAuthGuard]},
       { path : 'admin/orders' , component : AdminOrdersComponent,canActivate : [AuthGuard,AdminAuthGuard]}
    ]),
    NgbModule,
    CustomFormsModule
  ],
  providers: [AuthGuard,AuthServiceService,AdminAuthGuard,CategoryService,ProductService,ShoppingCartService,
    OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
