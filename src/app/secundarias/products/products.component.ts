import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../providers/articulo/articulo.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedFile: File
  isShown:boolean = false;
  categorias;
  
  constructor(private articuloServicio: ArticuloService) { }

  ngOnInit() {
    this.GetData();

  }

  onFileChanged(event) {
    const file = event.target.files[0]
  }

  GetData() {
    this.articuloServicio.getCategorias().subscribe(data => {
        this.categorias = data;
        
      });
  }

}



  

  

 