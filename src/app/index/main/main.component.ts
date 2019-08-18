import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  
  urlweb ='http://127.0.0.1:8000/imagenes/';
  articulos=null;

  constructor( private articuloServicio: ArticuloService) { }

  ngOnInit() {
    this.GetData();
    
    console.log("entra en on init");
    
  }

  GetData() {
    this.articuloServicio.getArticulos()
      .subscribe(data => {
        this.articulos = data;
        this.addurl();
      },(error)=>{console.log(error);
        
      
        //console.log(result)
      });
    
  }
  addurl(){
    if(this.articulos!=null){
      for(let articulo of this.articulos){
        for(let imagen of articulo.imagenes){
          imagen.imagen= this.urlweb+imagen.imagen+'?raw=true';
          console.log("pruea");
        }
      }
    }
    
  }

  probar(){
    //this.GetData();
    
    console.log(this.articulos);
  }

}