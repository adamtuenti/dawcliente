import { Component, OnInit } from '@angular/core';

import { ArticuloService } from '../../providers/articulo/articulo.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  isShown:boolean = false;
  categorias;
  rol;
  usuario;

  constructor(private articuloServicio: ArticuloService) { 
    this.rol=0;


  }

  ngOnInit() {
    this.GetData();
    this.rol=localStorage.getItem("id_rol");
    this.usuario=localStorage.getItem("id_usuario");
  
    console.log(this.usuario);
    console.log(this.rol);

  }

  GetData() {
    this.articuloServicio.getCategorias().subscribe(data => {
        this.categorias = data;
        
      });
  }
  probar(){
    console.log(this.categorias);
  }

  cerrarSesion(){
    this.usuario=0;
    this.rol=0;
    localStorage.setItem("id_usuario","0");
    localStorage.setItem("id_rol","0");

  }


}