import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inner-nav',
  templateUrl: './inner-nav.component.html',
  styleUrls: ['./inner-nav.component.css']
})
export class InnerNavComponent implements OnInit {

  searchText=""
  str=""

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear()
    alert("You have succesfully logged out!")
  }

  searchItem() {
    
    if(localStorage.getItem("category") == "del") {
      this.str = '/del'
    }
    else {
      this.str = '/home-admin'
    }
    
    this.router.navigate([this.str], {queryParams:{data:this.searchText}})
  }

  setLocal() {
    localStorage.setItem("category", "main-admin")
    if(this.router.url == "/home") {
      window.location.reload()
    }
  }

  setDel() {
    localStorage.setItem("category", "del")
  }
}
