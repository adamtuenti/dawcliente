import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {

  pagos: any =  [];

  constructor(private articuloServicio: ArticuloService, 
    private router:Router) { }

  ngOnInit() {
    this.getPagos();
  }

  getPagos() {
    this.articuloServicio.getPagos().subscribe(
      data => {
        this.pagos = data;
        console.log(data);
      }
    );
  }

}