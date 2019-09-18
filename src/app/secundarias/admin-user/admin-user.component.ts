import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/providers/articulo/articulo.service';
import { Router, NavigationEnd } from '@angular/router';
import { ExcelService } from 'src/app/providers/articulo/excel.service';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  usuarios: any = [];
  constructor(private articuloServicio: ArticuloService, 
    private excelService:ExcelService, 
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

  saveFile() {
    let datos_exportables = [];
    for (let i = 0; i < this.usuarios.length; i++) {
      let obj = {
        'codigo': this.usuarios[i].id,
        'nombre': this.usuarios[i].first_name + this.usuarios[i].last_name,
        'correo': this.usuarios[i].email,
        'cedula': this.usuarios[i].perfil.cedula,
        'tipo': this.usuarios[i].perfil.rol,
        'direccion': this.usuarios[i].perfil.direccion
      }
      datos_exportables.push(obj);
    }
    console.log(datos_exportables);
    this.excelService.exportAsExcelFile(datos_exportables, 'sample');
  }


}