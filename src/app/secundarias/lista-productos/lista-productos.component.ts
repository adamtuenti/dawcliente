import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  articulos = [];
  constructor(private articuloServicio: ArticuloService, 
    private router:Router) { }
  
  ngOnInit() {
    this.getArticulos();
  }

  getArticulos() {
    this.articuloServicio.getArticulos().subscribe(
      data => {
        this.articulos = data;
        console.log(data);
      }
    );
  }

}