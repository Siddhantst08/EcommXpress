import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  regFormData:any = {
    username: "",
    password: "",
    name: "", 
    email: "",
    age: "", //empty
    gender: "",  //empty
    mobile: "",
    address: "", //empty
    role: "",
  }

  // str:string = ""

  mail:any = {
    Email: "",
    Subject: "Order Placed!!",
    Body: `Congrats! Your order with EcommXpress has been Placed Successfully.`
  }


  jwtString = localStorage.getItem("token")
  decodedToken:any  
  
  // username:any
  id:any
  username:any

  price:any




  totalAmount:any
  gst:any
  total:any
  constructor(private prod:MainServiceService, private router:Router) {
    if(this.jwtString != null) {
      this.decodedToken = this.prod.getDecodeJwtToken(this.jwtString);
      this.username = this.decodedToken.Username
      this.id = +this.decodedToken.Id
      this.mail.Email = this.decodedToken.Email
    }
    // if(localStorage.getItem("total") != null) {
    //   this.str = localStorage.getItem("total")
    // }
   }

  ngOnInit(): void {
    // this.price = localStorage.getItem("total")
    // this.orderForm.price = +this.price
    //console.log(this.decodedToken);
    //console.log(this.mail);
    
    
    this.totalAmount = localStorage.getItem("totalAmount")
    this.gst= localStorage.getItem("gst")
    this.total = localStorage.getItem("total")

    

    this.prod.getUser().subscribe({
      next:(data:any) => {
        this.regFormData=  data.filter((prod:any) => prod.id == this.decodedToken.Id)[0]
      //  console.log(this.regFormData);
        
        // this.arr = data.filter((prod:any) => prod.categoryId == 4)
      }
    })
  }

  
  makePayment() {
    this.prod.updateUser(this.regFormData.id, this.regFormData).subscribe({
      next:(data:any) => {

      },
      error:(err) => {
        console.log(err);
        
      }
    })



    var tPrice = localStorage.getItem("total")

    var orderForm:any = {
      userId: this.id,
      username: this.username,
      status:"placed",
      price: ""
    }
    
    
    if(tPrice != null) {
      orderForm.price = +tPrice
    }



    console.log(orderForm);
    
    this.prod.addOrder(orderForm).subscribe({
      next:(data:any) => {

      },
      error:(err) => {
        console.log(err);
        
      }
    })

    this.prod.sendMail(this.mail).subscribe({
      next:(data:any) =>{

      },
      error:(err:any)=> {
        console.log(err);
        
      }
    })

    this.router.navigateByUrl("/congrats")


  }


}
