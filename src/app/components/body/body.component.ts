import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  jwtString = localStorage.getItem("token")
  decodedToken:any 
  id:any
  searchText=""

  arr:any =[]
  cartArr: any = {
    ProductId : 0,
    Quantity : 0,
    Price: 0,
    Image: "",
    Description: "",
    ProductName: "",
    UserId: 0
  }

  category: any 
  limit:number = 6
  sortOption = "Select Sorting Options"
 
  hide = false
  loader = true

  constructor(private prod:MainServiceService, private router:Router, private route:ActivatedRoute) {
    // window.location.reload()
    if(this.jwtString != null) {
      this.decodedToken = this.prod.getDecodeJwtToken(this.jwtString);
      // this.username = this.decodedToken.Username
      this.id = +this.decodedToken.Id
    }
    
    
  }

  ngOnInit(): void { 

    this.route.queryParams.subscribe((params:any) => {
      console.log(params);
      this.searchText=params.data
    })
    
    this.category = localStorage.getItem("category")
    if(this.category != null) {
      this.category=  this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }
    
    this.prod.getProducts().subscribe( {
      next:(data:any)=> {
        console.log(data);

        
        
        if(localStorage.getItem("category") === "fashion") {
          this.arr = data.filter((prod:any) => prod.categoryId == 4)
          // this.cartItems = this.cartItems.filter((prod:any) => prod.id != id);
        }

        else if(localStorage.getItem("category") === "electronics") {
          this.arr = data.filter((prod:any) => prod.categoryId == 5)
        }

        else if(localStorage.getItem("category") === "home") {
          this.arr = data.filter((prod:any) => prod.categoryId == 6)
        }

        else {
          this.arr = this.shuffleArray(data)
        }
        
      },
      error: err => {
        console.log(err);
      }
    })
  }

  shuffleArray(array:any) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  loadMore() {
   this.hide = true
   this.loader=false
    setTimeout(() => {
      this.hide=false
      this.loader=true
      this.limit + 3 < this.arr.length ? this.limit += 3 : this.limit = this.arr.length
      if(this.limit == this.arr.length) {
        this.hide = true
      }
      
  }, 1000);
}

addToCart(ind:any) {
  // const id:Number = +this.decodedToken.Id
  // if(localStorage.getItem("username") === null) {
  //   this.router.navigateByUrl("/login")
  //   return 
  // }

  console.log(ind);
  for(let i = 0; i < this.arr.length; i++) {
    if(this.arr[i].id == ind) {
      console.log(this.arr[i]);
      this.cartArr.ProductId = this.arr[i].id
      this.cartArr.Price = this.arr[i].price
      this.cartArr.Image = this.arr[i].imagePath
      this.cartArr.Description = this.arr[i].description
      this.cartArr.ProductName = this.arr[i].name
      this.cartArr.UserId = this.id;
      this.cartArr.Quantity = 1

      this.prod.addCart(this.cartArr).subscribe( {
        next:(data:any)=> {
          
        },
        error:err=> {
          console.log(err);
          if(err.status == 200) {
            alert("Item Added!")
          }
          else{
            alert("Item Already in Cart")
          }
          
          
        }
        
      })
      console.log(this.cartArr);
      window.location.reload();
      
      //yha se post kro cartArr ko
      
      
    }
  }
  
}
browseToProduct(id:any) {

  this.router.navigate(['/item'], {queryParams:{data:id}})
}

makeNormal() {
  this.sortOption = "Select Sorting Options"
  this.arr = this.shuffleArray(this.arr)
}

makeSortA2Z() {
  this.sortOption = "A To Z"
  this.arr.sort((a:any,b:any) => a.name.localeCompare(b.name))
}
makeSortH2L() {
  this.sortOption = "Price High To Low"
  this.arr = this.arr.sort((a:any, b:any) => b.price - a.price);
}
makeSortL2H() {
  this.sortOption = "Price Low To High"
  this.arr = this.arr.sort((a:any, b:any) => a.price - b.price);
  // this.arr = 
}
}


