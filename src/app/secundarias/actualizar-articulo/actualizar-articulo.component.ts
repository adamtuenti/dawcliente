import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { DataService } from "../../data-service.service";
@Component({
  selector: 'app-actualizar-articulo',
  templateUrl: './actualizar-articulo.component.html',
  styleUrls: ['./actualizar-articulo.component.css']
})
export class ActualizarArticuloComponent implements OnInit {
  nombre  = new FormControl('');
  descrip  = new FormControl('');
  donacion  = new FormControl('');
  precio  = new FormControl('');
  id_categoria  = new FormControl('');
  message:string;
  articulo;
  imagenNombre: any;
  imagen: any;
  categorias: any[];
  form;

  constructor(private articuloServicio: ArticuloService,public activatedRoute: ActivatedRoute, private router: Router, private navCtrl:NgxNavigationWithDataComponent) { 
    
  }



  ngOnInit() {
    console.log("entra !!!!!!!!!!!!")
    

    //console.log(this.navCtrl.get('nombre'));
    this.articulo=this.navCtrl.get('articulo')

    //this.articulo=history.state.nombre
    //console.log("hola      "+this.router.getCurrentNavigation().extras.state.nombre)
    //console.log(this.articulo);
    this.GetData();
    this.nombre.setValue(this.articulo.nombre);
    this.descrip.setValue(this.articulo.descrip);
    this.id_categoria.setValue(this.articulo.id_categoria);
    this.precio.setValue(this.articulo.precio);
    this.donacion.setValue(this.articulo.donacion);
    
    
    

  }

  onFileChanged(event) {
    const file = event.target.files[0]
    var reader = new FileReader();
    
    this.imagenNombre=file.name;
    reader.onloadend = (e) => {
      this.imagen = reader.result;
      this.imagen=this.imagen.replace(/^data:image.+;base64,/, '');
    }
    reader.readAsDataURL(file);
    
    
    
  }

  GetData() {
    this.articuloServicio.getCategorias().subscribe(data => {
        this.categorias = data;
        console.log(data);
        
      },(error=>{
        console.log(error);
      }));
  }

  actualizar(){
    let postdata={
      nombre  : this.nombre.value,
      descrip  : this.descrip.value,
      donacion  : parseFloat(this.donacion.value),
      precio  : parseFloat(this.precio.value),
      id_categoria  : this.id_categoria.value,
      imagen: this.imagen,
      imagen_nombre: this.imagenNombre,
      id_usuario: parseInt(localStorage.getItem("id_usuario")),
      id_articulo: this.articulo.id_articulo

    };
    console.log(postdata);
    this.articuloServicio.postNuevoArticulo(postdata)
    .subscribe(res=>{
      console.log(res);
    },(error=>{
      console.log(error);
    }));

    window.location.reload();

    this.router.navigateByUrl('/mis_productos');

  }


  

}
