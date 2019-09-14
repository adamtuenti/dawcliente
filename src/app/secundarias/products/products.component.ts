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
        console.log(this.categorias);
      });
  }

  onSubmit(f){
    let postdata=f.value;
    postdata.imagen={'imagen': this.imagen};
    // postdata.imagen_nombre=this.imagenNombre;
    postdata.usuario=+localStorage.getItem("id_usuario");
    postdata.categoria=+postdata.categoria;
    postdata.precio=+postdata.precio;
    postdata.donacion=+postdata.donacion;
    console.log(postdata);
    this.articuloServicio.postNuevoArticulo(postdata)
    .subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('/mis_productos')
    },(error=>{
      console.log(error);
      alert('Error, verifique la informacion ingresada');
    }));

  }

}



  

  

 