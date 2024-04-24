import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  

  mail:any = {
    Email: "",
    Subject: "Hey, Kanye Here!",
    Body: ""
  }

  // quote:any =""

  constructor(private prod:MainServiceService) { }

  ngOnInit(): void {
    this.prod.getKanye().subscribe({
      next:(data:any)=>{
        // this.quote = data.quote
        console.log(data.quote);
        
        this.mail.Body = `Here is a Quote for you: "${data.quote}"`
        //console.log(data.quote);
        
        
      },
      error:(err:any)=> {
        console.log(err);
        
      }
     })
  }

  sendKanyeMail() {
    if(this.mail.Email == "") {
      alert("Empty")
      return 
    }

 
   console.log(this.mail);
   
   this.prod.sendMail(this.mail).subscribe({
    next:(data:any)=> {

    },
    error:(err)=>{
      console.log(err);
      
    }
   })

   alert("Email Sent, Check Your Mail")
   
  }

}
