import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  articulo;
  imagenNombre: any;
  imagen: any;
  categorias: any[];
  form;

  constructor(private articuloServicio: ArticuloService,public activatedRoute: ActivatedRoute) { 
    
  }



  ngOnInit() {

    this.articulo=history.state.data
    console.log(this.articulo);
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

  onSubmit(f){
    let postdata=f.value;
    postdata.imagen=this.imagen;
    postdata.imagen_nombre=this.imagenNombre;
    postdata.id_usuario=localStorage.getItem("id_usuario");
    console.log(postdata);
    this.articuloServicio.postNuevoArticulo(postdata)
    .subscribe(res=>{
      console.log(res);
    },(error=>{
      console.log(error);
    }));

  }


  

}
