import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  res

  constructor(private articuloServicio: ArticuloService, private router:Router) { }

  
  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    
    
    console.log(f.value);

    let postData ={
      "email": f.value.email,
      "first_name": f.value.nombres,
      "last_name": f.value.apellidos,
      "username": f.value.username,
      "password": f.value.contrasenia,
      "perfil": {
        "direccion": f.value.direccion,
        "rol": f.value.rol,
        "cedula": f.value.cedula
      }
    }
    
    this.res=this.articuloServicio.postUsuario(postData);
    this.res.subscribe(data => {
      console.log(data);
      if(data!=null){
        this.router.navigateByUrl('/login')
      }
     }, error => {
      console.log(error);
    });

  }

 
}