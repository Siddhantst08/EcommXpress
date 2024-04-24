import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-inner-nav-user',
  templateUrl: './inner-nav-user.component.html',
  styleUrls: ['./inner-nav-user.component.css']
})
export class InnerNavUserComponent implements OnInit {

  cartSize:any =0
  menuArr:any
  jwtString = localStorage.getItem("token")
  decodedToken:any  
  
  username:any
  id:any
  searchText:any = ""
  str:any
  
  constructor(private prod : MainServiceService, private router: Router) { 
    
    // console.log(this.decodedToken);
    // console.log(this.username);
    // console.log(this.id);
    // console.log(typeof this.id);
    if(this.jwtString != null) {
      this.decodedToken = this.prod.getDecodeJwtToken(this.jwtString);
      this.username = this.decodedToken.Username
      this.id = +this.decodedToken.Id
    }
    
  }

  ngOnInit(): void {

    this.prod.getProducts().subscribe({
      next:(data:any) => {
        this.menuArr=data
      },
      error:(err) =>{ console.log(err);}
      
    })

    this.prod.getCart().subscribe({
      next:(data:any)=> {

        for(let i = 0; i < data.length; i++) {
          // const id:Number = +this.decodedToken.id
          if(data[i].userId == this.id) {
            this.cartSize += 1
            // this.cartItems.push(data[i])
            console.log(data[i]);
            
          }
        }

        // this.cartSize = data.length
        // this.cartItems = data
      },
      error:err => {
        console.log(err);
        console.log("hi");
        
        
      }
    })
  }

  logout() {
    localStorage.clear()
    alert("You have succesfully logged out!")
  }

  fashion() {
    localStorage.setItem("category", "fashion")
    this.router.navigateByUrl("/search-results")
    if(this.router.url == "/search-results") {
      window.location.reload()
    }
  }
  electronics() {
    localStorage.setItem("category", "electronics")
    this.router.navigateByUrl("/search-results")
    if(this.router.url == "/search-results") {
      window.location.reload()
    }
    console.log(this.router.url);
    
  }
  home() {
    localStorage.setItem("category", "home")
    this.router.navigateByUrl("/search-results")
    if(this.router.url == "/search-results") {
      window.location.reload()
    }

    
    
    // window.location.reload()
  }
  setLocal() {
    localStorage.setItem("category", "main")
    if(this.router.url == "/home") {
      window.location.reload()
    }
  }

  searchItem() {
    
    if(localStorage.getItem("category") == "fashion" || localStorage.getItem("category") == "electronics" || localStorage.getItem("category") == "home")  {
      this.str = '/search-results'
    }
    else {
      this.str = '/home'
    }
    
    this.router.navigate([this.str], {queryParams:{data:this.searchText}})
  }

}
