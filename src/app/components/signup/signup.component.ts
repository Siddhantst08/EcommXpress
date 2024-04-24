import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  regFormData:any = {
    username: "",
    email: "",
    password: "",
    name: "",
    age: 0,
    gender: "",
    mobile: "",
    address: "",
    role: "user",
  }

  confirmPass = "";

  x:any;
  y:any;

  constructor(@Inject(DOCUMENT) document: Document, private prod:MainServiceService, private router: Router) {
    
 }

  ngOnInit(): void {
  }

  registerUser() {
    if(this.confirmPass != this.regFormData.password) {
      alert("Passwords does not match!!")
      return ; 
    }
    else {
      this.prod.addUsers(this.regFormData).subscribe({
        next:(res) => {
       
        },
        error:err=> {
          if(err.status == 200) {
            alert("Profile Created successfully")
            this.router.navigateByUrl("/login")
          }
          else {
            alert("User already exist")
            window.location.reload()
          }
          
          // err.
            // window.location.reload()
        }
        
      })
    }
    //console.log(this.regFormData);
  }

    myFunction() {
      // console.log(this.regFormData);
      
    this.x = document.getElementById('txt-password1');
    this.y = document.getElementById('txt-password2');
    if (this.x.type === "password") {
      this.x.type = "text";
      this.y.type = "text";
    } else {
      this.x.type = "password";
      this.y.type = "password";
    }
  }

}
