import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  regFormData: any = {
    CategoryId:"",
    Name: "",
    Price: "",
    Description: "",
    Quantity: "",
    ImagePath: ""
  }

  filePath: any;
  constructor(private prod: MainServiceService) { }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      this.filePath = event.target.files[0];
    }

  }

  postDataReg() {
   
    if (this.filePath == "") {
      alert("Please select a file")
    }
    else {
      if (this.filePath.type == "image/png" || this.filePath.type == "image/jpg" || this.filePath.type == "image/jpeg") {
       
        const formData = new FormData();
        formData.append('file', this.filePath)
        console.log(this.filePath);


        this.prod.uploadFile(formData)
          .subscribe({
            next: (data: any) => {
              this.regFormData.ImagePath = data.dbPath;
              this.prod.addProducts(this.regFormData)
              .subscribe({
                next: (res:any) => {
                  //console.log(data);
                  console.log(res);
                  
                  alert("Congrats, Item Added !!");
                  window.location.reload();
                  
                },
                error: err => {
                  console.log(err);
                }
              })
              //console.log(data.dbPath);
            },
            error: (err:any) => {
              console.log("hi");

              console.log(err)
            }
          })

       
      }
      else {
        alert("Only jpg or png images supported");
      }
    }
  }
}
