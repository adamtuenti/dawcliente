import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  res

  constructor(private articuloServicio: ArticuloService) { }

  ngOnInit() {
  }

  buscarUsuario(f: NgForm) {
    
    
    console.log(f.value);

    
    
    this.res=this.articuloServicio.getBuscarUsuario(f.value.cedula);
    this.res.subscribe(data => {
      console.log(data);
      if(data.contrasenia==f.value.contrasenia){
        console.log("coinciden")
      }

      

     }, error => {
      console.log(error);
    });

  }
}