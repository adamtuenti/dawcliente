import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  usuarios: any = [];
  constructor(private articuloServicio: ArticuloService, 
    private router:Router) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.articuloServicio.getUsuarios().subscribe(
      data => {
        this.usuarios = data;
        console.log(data);
      }
    )
  }

}