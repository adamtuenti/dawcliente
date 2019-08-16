import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedFile: File
  
  constructor() { }

  ngOnInit() {
  }

  onFileChanged(event) {
    const file = event.target.files[0]
  }

}