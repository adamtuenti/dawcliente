import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { Router,NavigationExtras } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';


@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {
 
  urlweb ='http://127.0.0.1:8000';
  articulos=null;
  rol = localStorage.getItem('rol');
  carrito: any;
  articulo_carrito = [];

  constructor( private articuloServicio: ArticuloService,public router: Router, private navCtrl:NgxNavigationWithDataComponent) { 
    
  }

  ngOnInit() {
    if (this.rol==='VEN') {
      this.GetData();
    } else {
      this.getCarrito();
    }
  }

  GetData() {
    this.articuloServicio.getArticulosComprador(localStorage.getItem('id_usuario'))
      .subscribe(data => {
        this.articulos = data;
        console.log(this.articulos);
        // this.addurl();
      },(error)=>{console.log(error);
      });
  }

  getCarrito() {
    if (this.rol==='COM') {
      this.articuloServicio.getCarrito(localStorage.getItem('id_usuario')).subscribe(
        data => {
          this.carrito = data['articulos'];
          for (let i = 0; i < this.carrito.length; i++) {
            this.articulo_carrito.push(this.carrito[i]['id']);
          }
        }
      );
    }
  }

  eliminarDelCarrito(articulo) {
    let index = this.articulo_carrito.indexOf(articulo.id);
    this.articulo_carrito.splice(index, 1);
    console.log(this.articulo_carrito);
    let postData = {
      "usuario": +localStorage.getItem('id_usuario'),
      "articulos": this.articulo_carrito
    }
    console.log(postData);
    this.articuloServicio.addToCart(postData, localStorage.getItem('id_usuario')).subscribe(
      data => {
        alert('Eliminado ' + articulo.nombre);
        this.getCarrito();
      }
    );
  }


  elimiarArticulo(articulo){
    console.log(articulo);
    this.articuloServicio.deleteArticulo(articulo.id)
    .subscribe(data => {
      console.log(data);
      this.GetData();
    },(error)=>{console.log(error);
    });

  }

  gotoActualizar(articulo){
    this.navCtrl.navigate('actualizar_articulo', {articulo:articulo});
  }

}
