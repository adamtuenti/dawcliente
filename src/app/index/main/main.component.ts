import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  
  urlweb ='http://127.0.0.1:8000';
  articulos=null;

  constructor( private articuloServicio: ArticuloService) { 
    
  }

  ngOnInit() {
    this.GetData();
    
    console.log("entra en on init");
    
  }

  GetData() {
    this.articuloServicio.getArticulos()
      .subscribe(data => {
        this.articulos = data;
      },(error)=>{console.log(error);});
  }

  probar(articulo){
    let articulos = [];
    this.articuloServicio.getCarrito(localStorage.getItem('id_usuario')).subscribe(
      data => {
        // Obtiene articulos del carrito
        for (let i = 0; i < data['articulos'].length; i++){
          articulos.push(data['articulos'][i]['id'])
        }
        // agrega articulos a la lista local
        articulos.push(+articulo.id); 
        articulos = [...new Set(articulos)]; // elimina repetidos
        let postData = {
          "usuario": +localStorage.getItem('id_usuario'),
          "articulos": articulos
        }
        this.articuloServicio.addToCart(postData, localStorage.getItem('id_usuario')).subscribe(
          data => {
            alert('Agregado! ' + articulo.nombre);
          }, (error) => alert('Error al agregar')
        );
      }, (error) => console.log(error)
    );
  } 

}