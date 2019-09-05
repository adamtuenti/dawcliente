import { Component, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { DataService } from 'src/app/data-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-articulos-filtrados',
  templateUrl: './articulos-filtrados.component.html',
  styleUrls: ['./articulos-filtrados.component.css']
})
export class ArticulosFiltradosComponent implements OnInit  {

  urlweb ='http://127.0.0.1:8000';
  articulos=null;
  articulos2;
  categoria;
  message: string;
  
  mySubscription: any;

  constructor( private articuloServicio: ArticuloService,private navCtrl:NgxNavigationWithDataComponent,private data: DataService,private router:Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    this.articulos=new Array();
  }

  

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.categoria = message)
    console.log("recibido="+this.categoria);
    this.GetData();
    
    console.log("entra en on init");
    
    
    
  }

  GetData() {
    this.articuloServicio.getArticulos()
      .subscribe(data => {


        this.articulos2 = data;
        console.log(this.articulos);
        this.addurl();

        for(let articulo of this.articulos2){
          if(articulo.id_categoria==this.categoria){
            
            this.articulos.push(articulo);
          }
        }
        
        console.log(this.categoria);
        
        
      },(error)=>{console.log(error);
        
      
        //console.log(result)
      });
    
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
    //this.GetData();
    
    console.log(this.articulos);
  }

  
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}