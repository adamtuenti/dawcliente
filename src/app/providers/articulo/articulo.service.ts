import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  apiUrl = 'http://127.0.0.1:8000/';
  
  constructor( private http:HttpClient) { }

  getCategorias(){
    return this.http.get<any[]>(this.apiUrl+'categorias/?format=json')
  }

  getArticulos(){
    return this.http.get<any[]>(this.apiUrl+'articulos/?format=json')
  }
}
