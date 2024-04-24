import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {
  amountString = localStorage.getItem("total")

  constructor(private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.amountString == null) {
        alert("Wrong Route!!, logging out for security")
        localStorage.clear()
        this.router.navigateByUrl("/login")
        return false;
      }
    return true;
  }
  
}
