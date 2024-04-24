import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component'
import {HttpClientModule } from '@angular/common/http';
import { BodyComponent } from './components/body/body.component';
import { InnerNavComponent } from './components/inner-nav/inner-nav.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddnewComponent } from './components/addnew/addnew.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OuterhomeComponent } from './components/outerhome/outerhome.component';
import { CartComponent } from './components/cart/cart.component';
import { InnerNavUserComponent } from './components/inner-nav-user/inner-nav-user.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CongratsComponent } from './components/congrats/congrats.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ItemComponent } from './components/item/item.component';
import { DelItemComponent } from './components/del-item/del-item.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BodyComponent,
    InnerNavComponent,
    CarouselComponent,
    MenuComponent,
    AddnewComponent,
    FooterComponent,
    NotfoundComponent,
    OuterhomeComponent,
    CartComponent,
    InnerNavUserComponent,
    HomeAdminComponent,
    AddAddressComponent,
    SearchResultsComponent,
    CongratsComponent,
    ItemComponent,
    DelItemComponent,
    OrdersComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
    

    // IvyCarouselModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
