import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  arr: any = ["./assets/images/mencard.webp", "./assets/images/womencard.webp", "./assets/images/childcard.webp", "./assets/images/phones.jpg"]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(ind: any) {
    if (ind <= 2) {
      localStorage.setItem("category", "fashion")
      this.router.navigateByUrl("/search-results")
    }
    else {
      localStorage.setItem("category", "electronics")
      this.router.navigateByUrl("/search-results")
    }
  }

}
