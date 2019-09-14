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

  constructor( private articuloServicio: ArticuloService,public router: Router, private navCtrl:NgxNavigationWithDataComponent) { 
    
  }

  ngOnInit() {
    if (localStorage.getItem('rol')==='VEN') {
      this.GetData();
    } else {
      this.router.navigate(['/']);
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

  elimiarArticulo(articulo){
    console.log("eliminar");
    this.articuloServicio.deleteArticulo(articulo.id_articulo)
    .subscribe(data => {
      console.log(data);
      window.location.reload();
    },(error)=>{console.log(error);
      
    
      //console.log(result)
    });

  }




  gotoActualizar(articulo){

    this.navCtrl.navigate('actualizar_articulo', {articulo:articulo});
    //this.router.navigate(['/actualizar_articulo'], { state: { nombre: articulo.nombre } });
    
    //this.router.navigateByUrl('/123', { state: { data: articulo } });
  }

}
