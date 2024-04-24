import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  flag=false
  jwtString = localStorage.getItem("token")
  decodedToken:any 
  id:any


  product:any =  {
    "id": "",
    "categoryId": "",
    "name": "",
    "price": "",
    "description": "",
    "quantity": "",
    "imagePath": ""
  }

  cartArr: any = {
    ProductId : 0,
    Quantity : 0,
    Price: 0,
    Image: "",
    Description: "",
    ProductName: "",
    UserId: 0
  }

  category:any

  productId:any
  constructor(private prod:MainServiceService, private route:ActivatedRoute) {
    (localStorage.getItem("token") != null)? this.flag =true: this.flag=false

    if(this.jwtString != null) {
      this.decodedToken = this.prod.getDecodeJwtToken(this.jwtString);
      // this.username = this.decodedToken.Username
      this.id = +this.decodedToken.Id
    }
   }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:any) => {
      console.log(params);
      this.productId=params.data
    })

    this.prod.getProducts().subscribe({
      next:(data:any) => {
        for(let i = 0; i < data.length; i++) {
          if(data[i].id == this.productId) {
            this.product = data[i]
          }
        }
      },
      error:(err) => {
        console.log(err);
        
      }
    })

    if(this.product.categoryId == 4) {
      this.category="Fashion"
    }
    else if(this.product.categoryId == 5) {
      this.category="Electronics"
    }
    else {
      this.category="Home & Decor"
    }
  }

  addToCart() {
    // console.log(this.arr[i]);
      this.cartArr.ProductId = this.product.id
      this.cartArr.Price = this.product.price
      this.cartArr.Image = this.product.imagePath
      this.cartArr.Description = this.product.description
      this.cartArr.ProductName = this.product.name
      this.cartArr.UserId = this.id;
      this.cartArr.Quantity = 1
    this.prod.addCart(this.cartArr).subscribe({
      next:(data:any)=> {
        console.log(data);
        
      },
      error:(err) => {
        
        if(err.status == 200) {
          alert(`${this.product.name} added to Cart`)
        }
        
      }
    })
    window.location.reload();
  }

}
