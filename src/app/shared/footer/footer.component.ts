import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  id_usuario = '';

  ngOnInit() {
    this.id_usuario = this.readLocalStorageUser();
  }

  readLocalStorageUser(): string {
    return localStorage.getItem('id_usuario') ? localStorage.getItem('id_usuario') : '';
  }

}