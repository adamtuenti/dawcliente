import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { ExcelService } from 'src/app/providers/articulo/excel.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {

  pagos: any =  [];

  constructor(private articuloServicio: ArticuloService,
    private excelService:ExcelService, 
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

  saveFile() {
    let datos_exportables = [];
    for (let i = 0; i < this.pagos.length; i++) {
      let obj = {
        'codigo': this.pagos[i].id,
        'comprador': this.pagos[i].pedido.comprador.first_name + this.pagos[i].pedido.comprador.last_name,
        'fecha': this.pagos[i].fecha_pago,
        'cantidad_articulos': this.pagos[i].pedido.articulos.length,
        'total_venta': this.pagos[i].pedido.total_venta,
      }
      datos_exportables.push(obj);
    }
    console.log(datos_exportables);
    this.excelService.exportAsExcelFile(datos_exportables, 'sample');
  }

}