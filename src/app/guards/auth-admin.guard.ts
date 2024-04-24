import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainServiceService } from '../services/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  //token :any = this.prod.getDecodeJwtToken(localStorage.getItem("token"))
  tokenString = localStorage.getItem("token")

  // token: any = this.prod.getDecodeJwtToken(this.tokenString)
  //num: Number = 0;
  constructor(private prod:MainServiceService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.tokenString != null) {
      var decodedToken:any = this.prod.getDecodeJwtToken(this.tokenString) 

      if(decodedToken.Role == "admin") {
        return true
       
      }
      else {
        alert("You need Access!")
        this.router.navigateByUrl("/")
        return false;
      }
    }
    alert("You need Access!")
          this.router.navigateByUrl("/")
    return false
   
    
  }
  
}
