import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-outerhome',
  templateUrl: './outerhome.component.html',
  styleUrls: ['./outerhome.component.css']
})
export class OuterhomeComponent implements OnInit {

  tokenString = localStorage.getItem("token")

  constructor(private router:Router, private prod:MainServiceService) { 
  }

  ngOnInit(): void {
    //   if(this.tokenString != null) {
    //     var decodedToken:any = this.prod.getDecodeJwtToken(this.tokenString)
    //     console.log(decodedToken);
        
    //     if(decodedToken.Role == "admin") {
    //       this.router.navigateByUrl("/home-admin")  
    //     }
    //     else if(decodedToken.Role == "user") {
    //       this.router.navigateByUrl("/home")
    //     }
    // }
  }

}
