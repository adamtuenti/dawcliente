import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data
  tmp
  name
  city
  email
  issue
  message

  constructor(private articuloServicio: ArticuloService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    /*let postData ={
      "name": this.name,
      "city": this.city,
      "email": this.email,
      "issue": this.issue,
      "message": this.message,
    }*/
    console.log(f.value);
    this.data=this.articuloServicio.postContact(f.value);
    this.data.subscribe(data => {
      console.log(data);
      

      

     }, error => {
      console.log(error);
    });

  }




}