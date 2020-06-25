import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductService } from './services/product.service';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShoppingDetailComponent } from './components/shopping-detail/shopping-detail.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    ProductDetailComponent,
    ShoppingDetailComponent,
    CheckoutPageComponent,
    ProductCategoryMenuComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
