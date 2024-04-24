import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainServiceService } from '../services/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  tokenString:any =""
  
  

  constructor(private router: Router, private prod:MainServiceService) {
    this.tokenString = localStorage.getItem("token")
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.tokenString != null) {
        var decodedToken:any = this.prod.getDecodeJwtToken(this.tokenString) 
  
        if(decodedToken.Role == "user") {
          return true
         
        }
        else {
          alert("Please Signin with USER Account!")
          this.router.navigateByUrl("/")
          return false;
        }
      }
      alert("Please Signin with USER Account!")
          this.router.navigateByUrl("/")
      return false
     
      
    
  }
  
}
