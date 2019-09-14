import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  apiUrl = 'http://127.0.0.1:8000/';
  
  constructor( private http:HttpClient) { }

  getCategorias(){
    return this.http.get<any[]>(this.apiUrl+'categorias/')
  }

  getArticulos(){
    return this.http.get<any[]>(this.apiUrl+'api/articulos/')
  }

  postContact(postData) {    
    
    console.log(postData);
    let private_options = { 
      headers: new HttpHeaders(
        { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        ) 
    };
    return this.http.post(this.apiUrl+"contact/",postData,private_options);
    
  }

  postUsuario(postData){
    console.log(postData);
    let private_options = { 
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
        ) 
    };
    return this.http.post(this.apiUrl+"api/usuarios/",postData,private_options);
  }

  getBuscarUsuario(cedula){
    
    return this.http.get(this.apiUrl+"buscarUsuario/?cedula="+cedula);
  }

  postComprobarUsuario(postData){
    let private_options = { 
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
        ) 
    };
    return this.http.post(this.apiUrl+"comprobarUsuario/",postData,private_options);
  }

  getArticulosComprador(id_usuario){
    return this.http.get(this.apiUrl+"articulosComprador/?id_usuario="+id_usuario);
  }

  deleteArticulo(id_articulo){
    console.log(id_articulo);
    return this.http.delete(this.apiUrl+"api/articulos/"+id_articulo+'/');
  }

  postNuevoArticulo(postData){
    return this.http.post<any>(this.apiUrl+"api/articulos/",postData);
  }
  
  editArticulo(postData, id){
    return this.http.put<any>(this.apiUrl+"api/articulos/" + id +'/',postData);
  }
  
}
