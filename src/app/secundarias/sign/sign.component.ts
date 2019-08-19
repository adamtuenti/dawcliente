import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  res

  constructor(private articuloServicio: ArticuloService) { }

  
  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    
    
    console.log(f.value);

    let postData ={
      "cedula": f.value.cedula,
      "contrasenia": f.value.contrasenia,
      "nombres": f.value.nombres,
      "apellidos": f.value.apellidos,
      "email": f.value.email,
      "direccion": f.value.direccion,
      "id_rol": f.value.rol
    }
    
    this.res=this.articuloServicio.postUsuario(postData);
    this.res.subscribe(data => {
      console.log(data);
      if(data!=null){

      }

      

     }, error => {
      console.log(error);
    });

  }

 
}