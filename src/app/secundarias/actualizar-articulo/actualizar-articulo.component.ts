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
  categoria  = new FormControl('');
  message:string;
  articulo;
  imagenNombre: any;
  imagen: any = null;
  categorias: any[];
  form;

  constructor(private articuloServicio: ArticuloService,public activatedRoute: ActivatedRoute, private router: Router, private navCtrl:NgxNavigationWithDataComponent) { 
    
  }



  ngOnInit() {
    console.log("entra !!!!!!!!!!!!")
    
    this.articulo=this.navCtrl.get('articulo')

    this.GetData();
    console.log(this.articulo);
    this.nombre.setValue(this.articulo.nombre);
    this.descrip.setValue(this.articulo.descrip);
    this.categoria.setValue(this.articulo.categoria.id);
    this.precio.setValue(this.articulo.precio);
    this.donacion.setValue(this.articulo.donacion);
  }

  onFileChanged(event) {
    let reader = new FileReader();
    let me = this;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.imagen = file;
      reader.readAsDataURL(file);
      reader.onload = function () {
        //me.modelvalue = reader.result;
        console.log(reader.result);
        me.imagen = reader.result;
          };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
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
      categoria  : this.categoria.value,
      usuario: parseInt(localStorage.getItem("id_usuario"))
    };

    postdata['imagen'] = this.imagen !== null ? {'imagen':this.imagen} : null;
    if (postdata['imagen'] === null) {
      delete postdata['imagen'];
    } 
    console.log(postdata, this.articulo.id);
    
    this.articuloServicio.editArticulo(postdata, this.articulo.id)
    .subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('/mis_productos');
    },(error=>{
      console.log(error);
      alert(error);
    }));

    // window.location.reload();


  }


  

}
