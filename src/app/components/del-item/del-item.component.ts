import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-del-item',
  templateUrl: './del-item.component.html',
  styleUrls: ['./del-item.component.css']
})
export class DelItemComponent implements OnInit {

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
 
  hide = false
  loader = true

  constructor(private prod:MainServiceService, private router:Router, private route:ActivatedRoute) {

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

delete(id:any) {
  if(confirm("Are you sure?")) {
  localStorage.setItem("category", "del")
  this.prod.deleteProducts(id)
  .subscribe({
    next: data => {
      
    },
    error: err => {
      if(err.status == 200) {
        alert("Product Deleted");
        this.arr = this.arr.filter((prod:any) => prod.id != id);
        // window.location.reload();
      }
    }
  })
}
}
// browseToProduct(id:any) {

// this.router.navigate(['/item'], {queryParams:{data:id}})
// }

}
