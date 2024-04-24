import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  tokenString= localStorage.getItem("token")
  id:any

  arr:any = []
 

  
    // console.log(this.len);
  constructor(private prod:MainServiceService) { }

  ngOnInit(): void {
    if(this.tokenString != null) {
      var decodedToken: any = this.prod.getDecodeJwtToken(this.tokenString)

      this.id = +decodedToken.Id
    }

    this.prod.getOrders().subscribe({
      next:(data:any)=> {
        for(let i = 0; i < data.length; i++) {
          if(data[i].userId == this.id) {
            this.arr.push(data[i])
          }
        
          
        }
        // console.log(data);
        // console.log(this.id);
        
        
        // this.arr = data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    
    
  }

}
