import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EccomClientSide';
  // flag=false
  loader = true

  constructor(private router: Router) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    })
  }

  // ngOnInit() {
  //   if(localStorage.getItem("token") != null) {
  //     this.flag=true
  //   }
  //   else {
  //     this.flag=false
  //   }
  // }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader = true
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loader = false
      }, 2000)
    }

    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.loader = true
      }, 2000)

      if (event instanceof NavigationError) {
        setTimeout(() => {
          this.loader = true
        }, 2000)
      }


    }
  }

}
