import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.css']
})
export class CongratsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  removeResources() {
    var token = localStorage.getItem("token")
    localStorage.clear()
    if(token != null) {
      localStorage.setItem("token", token)
    }
    
  }

}
