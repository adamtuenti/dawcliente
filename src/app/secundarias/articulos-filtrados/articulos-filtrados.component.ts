import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { DataService } from 'src/app/data-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-articulos-filtrados',
  templateUrl: './articulos-filtrados.component.html',
  styleUrls: ['./articulos-filtrados.component.css']
})
export class ArticulosFiltradosComponent implements AfterViewInit  {

  urlweb ='http://127.0.0.1:8000';
  articulos = [];
  articulos2 = [];
  categoria = '';
  message: string;
  rol = localStorage.getItem('rol');
  mySubscription: any;

  constructor(private articuloServicio: ArticuloService, 
              private navCtrl: NgxNavigationWithDataComponent,
              private data: DataService,
              private router:Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngAfterViewInit() {
    this.data.currentMessage.subscribe(message => this.categoria = message);
    this.GetData();  
  }

  GetData() {
    this.articuloServicio.getArticulos()
      .subscribe(data => {
        this.articulos = [];
        this.articulos2 = data;
        this.addurl();
        if (this.categoria !== '') {
          for(let articulo of this.articulos2){
            if(articulo.categoria.nombre==this.categoria){
              this.articulos.push(articulo);
            }
          }
        } else {
          this.articulos = this.articulos2;
        }
      },
      (error)=>{console.log(error);});
  }
  
  addurl(){
    if(this.articulos!=null){
      for(let articulo of this.articulos){
        for(let imagen of articulo.imagenes){
          imagen.imagen= this.urlweb+imagen.imagen;
          console.log("pruea");
        }
      }
    }
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

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  like(articulo) {
    this.articuloServicio.like({'user': +localStorage.getItem('id_usuario')}, articulo.id).subscribe(
      data => {
        this.GetData();
      },
      error => alert(error)
    );
  }

  likedBy(articulo) {
    for (let i = 0; i < articulo.liked_by.length; i++) {
      if (articulo.liked_by[i]['id'] === +localStorage.getItem('id_usuario')){
        return true;
      }
    }
    return false;
  }

  dislike(articulo) {
    this.articuloServicio.dislike({'user': +localStorage.getItem('id_usuario')}, articulo.id).subscribe(
      data => {
        this.GetData();
      },
      error => console.log(error)
    );
  }

}