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
    if (localStorage.getItem('rol')==='COM'){
      this.router.navigate(['/']);
    }else if(localStorage.getItem('rol')==='VEN'){
      this.router.navigate(['/mis_productos']);
    } else if(localStorage.getItem('rol')==='ADM'){
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  buscarUsuario(f: NgForm) {
    this.res=this.articuloServicio.postComprobarUsuario(f.value);
    this.res.subscribe(data => {
      console.log(data);
      window.location.reload();
      localStorage.setItem('id_usuario', data.id); // id usuario
      localStorage.setItem('rol', data.perfil.rol);
      localStorage.setItem('username', data.username);
      if(data.perfil.rol==='COM'){
        this.router.navigate(['/']);
      }else if(data.perfil.rol==='VEN'){
        this.router.navigate(['/mis_productos']);
      }
     }, error => {
        this.erroneos=true;
      console.log(error);
    });
  }
}