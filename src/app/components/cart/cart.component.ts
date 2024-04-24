import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  //qty:any = 1;
  cartItems:any = []
  jwtString = localStorage.getItem("token")
  decodedToken:any  
  
  // username:any
  id:any

  cartTotal:any=0
  gst:any=0
  // localStorage
  constructor(private prod: MainServiceService, private router:Router) {
    if(this.jwtString != null) {
      this.decodedToken = this.prod.getDecodeJwtToken(this.jwtString);
      // this.username = this.decodedToken.Username
      this.id = +this.decodedToken.Id
    }
   }

  ngOnInit(): void {
    this.prod.getCart().subscribe({
      next:(data:any)=> {

        for(let i = 0; i < data.length; i++) {
          // const id:Number = +this.decodedToken.id
          if(data[i].userId == this.id) {
            this.cartItems.push(data[i])
          }
        }

        // this.cartItems = data
        
        this.findCartTotal()
        
      },
      error:err => {
        console.log(err);
        console.log("hi");
        
        
      }
    })
  }

  decQ(i:any) {
    if(this.cartItems[i].quantity > 1) {
      this.cartItems[i].quantity -= 1
      this.prod.updateCart(this.cartItems[i].id, this.cartItems[i]).subscribe( {
        next:(data) => {

        },
        error:err => {
          window.location.reload()
        }
      })
    }
    
  }
  incQ(i:any) {
    this.cartItems[i].quantity += 1
    this.prod.updateCart(this.cartItems[i].id, this.cartItems[i]).subscribe( {
      next:(data) => {

      },
      error:err => {
        window.location.reload()
      }
    })
  }

  findCartTotal() {
    for(let i = 0; i < this.cartItems.length; i++) {
      var amount = this.cartItems[i].price * this.cartItems[i].quantity
      this.cartTotal += amount
    }
    this.gst = Math.round((5 * this.cartTotal)/100)


  }

  deleteItem(id: any) {
    
    this.prod.deleteFromCart(id)
      .subscribe({
        next: data => {
          
        },
        error: err => {
          if(err.status == 200) {
            alert("Product Deleted");
            this.cartItems = this.cartItems.filter((prod:any) => prod.id != id);
            window.location.reload();
          }
        }
      })
  }

  placeOrder() {
    localStorage.setItem("totalAmount", JSON.stringify(this.cartTotal))
    localStorage.setItem("gst", JSON.stringify(this.gst))
    var total = this.cartTotal+this.gst
    localStorage.setItem("total", JSON.stringify(total))
    
    this.router.navigateByUrl("/add-details")
  }

}
