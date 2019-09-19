import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { NgForm } from '@angular/forms';
import * as $ from "jquery"

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
    $("#submit").click(function(){
      var data = {
        name: $("#name").val(),
        city: $("#city").val(),
        email: $("#email").val(),
        issue: $("#issue").val(),
        message: $("#message").val()

      };

      //var csrftoken = getCookie('csrftoken');
      //var headers = new Headers();
      //headers.append('X-CSRFToken', csrftoken);
      
      $.ajax({
        url: 'http://localhost:8000/contact/', 
        data: data,
        dataType: 'json',
        method: 'POST',
        success: function(data){
            console.log("SUBMIT ENVIADO")
        },
        
        //error: function (){ alert('An error occured'); }
      });
      $("#name").val("");
      $("#city").val("");
      $("#email").val("");
      $("#issue").val("");
      $("#message").val("");

    })
  }


}