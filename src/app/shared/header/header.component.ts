import { Component, OnInit } from '@angular/core';

import { ArticuloService } from '../../providers/articulo/articulo.service'
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { DataService } from "../../data-service.service";
import { Router } from '@angular/router';

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
  message;
  categoria;

  constructor(private articuloServicio: ArticuloService, private navCtrl:NgxNavigationWithDataComponent,private data: DataService, private router:Router) { 
    this.rol=0;


  }

  ngOnInit() {
    
    this.data.currentMessage.subscribe(message => this.message = message)
    
    this.GetData();
    this.rol=localStorage.getItem("id_rol");
    this.usuario=localStorage.getItem("id_usuario");
  
    console.log(this.usuario);
    console.log(this.rol);

  }

  GetData() {
    this.articuloServicio.getCategorias().subscribe(data => {
        this.categorias = data;
        console.log(this.categorias);
        
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

  categoriaSelect(categoria){
    console.log(categoria);
    this.categoria=categoria;
    this.newMessage(categoria.id_categoria);

    this.router.navigateByUrl('/articulos_filtrados', {skipLocationChange: true}).then(()=>
    this.router.navigate(["articulos_filtrados"]));
    
    //window.location.reload();
  }

  newMessage(categoria_id) {
    
    this.data.changeMessage(categoria_id)
  }

  


}