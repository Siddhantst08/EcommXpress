import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  fashion() {
    localStorage.setItem("category", "fashion")
    this.router.navigateByUrl("/search-results")
  }
  electronics() {
    localStorage.setItem("category", "electronics")
      this.router.navigateByUrl("/search-results")
  }

  home() {
    localStorage.setItem("category", "home")
      this.router.navigateByUrl("/search-results")
  }

}
