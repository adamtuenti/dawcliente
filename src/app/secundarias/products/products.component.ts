import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../providers/articulo/articulo.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedFile: File
  isShown:boolean = false;
  categorias;
  imagenNombre: any;
  imagen: any;
  imagenData;
  
  constructor(private articuloServicio: ArticuloService, private router:Router) { }

  ngOnInit() {
    this.GetData();

  }

  onFileChanged(event) {
    const file = event.target.files[0]
    var reader = new FileReader();
    /*reader.readAsDataURL(file);
    reader.onload = (_event) => { 
      this.imagen = reader.result; 
    }*/
    //this.imagenData=file;
    /*reader.onload = (function(theFile) {
      return function(e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        this.imagen=base64String;
      };
    })(file);*/

    //reader.readAsBinaryString(file);
    //this.imagen = window.btoa(file);
    this.imagenNombre=file.name;
    reader.onloadend = (e) => {
      this.imagen = reader.result;
      this.imagen=this.imagen.replace(/^data:image.+;base64,/, '');
    }
    reader.readAsDataURL(file);
    
    //this.imagen=(this.imagen.split(','))[1];

    /*let postdata={
      imagen:this.imagen,
      imagen_nombre:this.imagenNombre
    }*/
    
  }

  GetData() {
    this.articuloServicio.getCategorias().subscribe(data => {
        this.categorias = data;
        console.log(this.categorias)
        
      });
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
      this.router.navigateByUrl('/mis_productos')
    },(error=>{
      console.log(error);
    }));

  }

}



  

  

 