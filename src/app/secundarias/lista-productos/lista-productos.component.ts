import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { ExcelService } from 'src/app/providers/articulo/excel.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  articulos = [];
  constructor(private articuloServicio: ArticuloService, 
    private excelService:ExcelService,
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

  saveFile() {
    let datos_exportables = [];
    for (let i = 0; i < this.articulos.length; i++) {
      let obj = {
        'codigo': this.articulos[i].id,
        'nombre': this.articulos[i].nombre,
        'precio': this.articulos[i].precio,
        'categoria': this.articulos[i].categoria.nombre,
        'donacion': this.articulos[i].donacion,
        'vendedor': this.articulos[i].usuario.first_name + this.articulos[i].usuario.last_name,
      }
      datos_exportables.push(obj);
    }
    console.log(datos_exportables);
    this.excelService.exportAsExcelFile(datos_exportables, 'sample');
  }

}