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

  probar(){
    //this.GetData();
    
    console.log(this.articulos);
  }

}