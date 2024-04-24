import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BodyComponent } from './components/body/body.component';
import { AddnewComponent } from './components/addnew/addnew.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OuterhomeComponent } from './components/outerhome/outerhome.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CongratsComponent } from './components/congrats/congrats.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { PaymentGuard } from './guards/payment.guard';
import { ItemComponent } from './components/item/item.component';
import { DelItemComponent } from './components/del-item/del-item.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {path:'', component:OuterhomeComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'home-admin', component:HomeAdminComponent, canActivate:[AuthAdminGuard]}, //make admin guard
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path: 'addnew', component:AddnewComponent, canActivate:[AuthAdminGuard]}, //make admin guard
  {path: 'del', component:DelItemComponent, canActivate:[AuthAdminGuard]}, //make admin guard
  {path: 'cart', component:CartComponent, canActivate:[AuthGuard]},
  {path: 'add-details', component:AddAddressComponent, canActivate:[PaymentGuard]}, // make diff guard
  {path: 'search-results', component:SearchResultsComponent, canActivate:[AuthGuard]},
  {path: 'myorder', component:OrdersComponent, canActivate:[AuthGuard]},
  {path: 'item', component:ItemComponent},
  {path: 'congrats', component:CongratsComponent, canActivate:[PaymentGuard]}, // make diff guard
  {path: '**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
