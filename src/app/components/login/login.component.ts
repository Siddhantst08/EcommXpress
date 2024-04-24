import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData: any = {
    username: "",
    password: ""
  }

  tokenItem: any;

  x: any;



  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(private prod: MainServiceService, private router: Router, @Inject(DOCUMENT) document: Document) {
  }

  ngOnInit() {

  }

  myFunction() {
    this.x = document.getElementById('txt-password');

    if (this.x.type === "password") {
      this.x.type = "text";

    } else {
      this.x.type = "password";

    }
  }

  logIn() {
    this.prod.postLoginDetails(this.formData)
      .subscribe({
        next: (data:any )=> {
          console.log(data);
          alert("Login success!")
          localStorage.setItem("token", data.token)
          // localStorage.setItem("username",data.username)
          // localStorage.setItem("role",data.role)
          // localStorage.setItem("id",data.id)

          const tokenObject:any = this.prod.getDecodeJwtToken(localStorage.getItem("token"))
          console.log(tokenObject.Role);
          

            if(tokenObject.Role == "admin") {
              this.router.navigateByUrl("/home-admin")
            }
            else {
              this.router.navigateByUrl("/home")
            }
            
          // alert("Login Successful !!");
          // console.log(data);
          // this.tokenItem = data
          // localStorage.setItem("token", this.tokenItem.token)

          // localStorage.setItem("prodVal", "1")
          // this.router.navigateByUrl("/home")

        },
        error: err => {
          console.log(err);
            alert("Incorrect Email or Password")
            window.location.reload()
          
        }
      })
  }
}
