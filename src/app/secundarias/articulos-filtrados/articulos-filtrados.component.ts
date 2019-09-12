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
    this.data.currentMessage.subscribe(message => this.categoria = message)
    console.log("recibido="+this.categoria);
    this.GetData();  
  }

  GetData() {
    this.articuloServicio.getArticulos()
      .subscribe(data => {
        this.articulos2 = data;
        console.log(this.articulos);
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


  probar(){
    console.log(this.articulos);
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}