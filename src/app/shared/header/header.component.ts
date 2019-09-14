import { Component, OnInit, Output } from '@angular/core';

import { ArticuloService } from '../../providers/articulo/articulo.service'
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { DataService } from "../../data-service.service";
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

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
  categoria = '';
  username = '';


  constructor(private articuloServicio: ArticuloService, 
              private navCtrl:NgxNavigationWithDataComponent,
              private data: DataService, private router:Router) { 
    this.rol=0;
  }

  ngOnInit() {
    
    this.data.currentMessage.subscribe(message => this.message = message)
    
    this.GetData();
    this.rol=localStorage.getItem("rol");
    this.usuario=localStorage.getItem("id_usuario");
    this.username=localStorage.getItem('username');
  
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
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("rol");
    window.location.reload();
  }

  categoriaSelect(categoria){
    this.categoria=categoria;
    this.newMessage(categoria);
    //console.log(this.newMessage);
    this.router.navigateByUrl('/articulos_filtrados', {skipLocationChange: true}).then(()=>
    this.router.navigate(["articulos_filtrados"]));
    
    // window.location.reload();
  }

  newMessage(categoria) {
    this.data.changeMessage(categoria.nombre);
  }

  


}