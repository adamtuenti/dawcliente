import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  res
  erroneos

  constructor(private articuloServicio: ArticuloService,private router: Router) {
    this.erroneos=false;
   }

  ngOnInit() {
  }

  buscarUsuario(f: NgForm) {
    
    
    console.log(f.value);

    
    
    this.res=this.articuloServicio.postComprobarUsuario(f.value);
    this.res.subscribe(data => {
      console.log(data);
      window.location.reload();


      localStorage.setItem('id_usuario', data.id_usuario);
      localStorage.setItem('id_rol', data.id_rol);
      if(data.id_rol==1){

        this.router.navigate(['/']);
      }else if(data.id_rol==2){
        this.router.navigate(['/mis_productos'])
      }else if(data.id_rol==3){

      }
     

      

     }, error => {
        this.erroneos=true;

      console.log(error);
    });

  }
}