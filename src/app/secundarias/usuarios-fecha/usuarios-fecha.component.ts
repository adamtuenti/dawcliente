import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';

@Component({
  selector: 'app-usuarios-fecha',
  templateUrl: './usuarios-fecha.component.html',
  styleUrls: ['./usuarios-fecha.component.css']
})
export class UsuariosFechaComponent implements OnInit {

  constructor(private articuloServicio: ArticuloService) { }

  dataUsuarios: any = [];
  dataCantidadCategorias: any = [];
  dataVentasCategorias: any = [];
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.articuloServicio.getEstadisticasUsuarios().subscribe(
      data => {
        this.dataUsuarios = data;
        console.log(data);
      }
    );
    this.articuloServicio.getEstadisticasCategorias().subscribe(
      data => {
        this.dataCantidadCategorias = data['cantidad'];
        this.dataVentasCategorias = data['suma'];
        console.log(data);
      }
    );
  }

  title = 'Graficos';

  view: any[] = [600, 400];

  // options for the chart

  showXAxis = true;

  showYAxis = true;

  gradient = false;

  showLegend = true;

  showXAxisLabel = true;

  xAxisLabel = 'Country';
  xAxisLabelUsers = 'Tipo Usuarios';
  xAxisLabelCategorias = 'Categorias';

  showYAxisLabel = true;

  yAxisLabel = 'Sales';
  yAxisLabelUsers = 'Cantidad Usuarios';
  yAxisLabelNumeroVendidos = 'Articulos Vendidos';
  yAxisLabelVentas = 'Ventas en dolares';

  timeline = true;

  colorScheme = {

    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']

  };

  //pie

  showLabels = true;


}

