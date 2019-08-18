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

  constructor(private articuloServicio: ArticuloService) { }

  ngOnInit() {
    this.GetData();

  }

  GetData() {
    this.articuloServicio.getCategorias().subscribe(data => {
        this.categorias = data;
        
      });
  }
  probar(){
    console.log(this.categorias);
  }


}