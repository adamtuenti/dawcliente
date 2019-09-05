import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxNavigationWithDataComponent } from "ngx-navigation-with-data";

import { ArticuloService } from './providers/articulo/articulo.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainComponent } from './index/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './secundarias/products/products.component';
import { AboutComponent } from './secundarias/about/about.component';
import { LoginComponent } from './secundarias/login/login.component';
import { ContactComponent } from './secundarias/contact/contact.component';
import { AdminComponent } from './secundarias/admin/admin.component';
import { AdminUserComponent } from './secundarias/admin-user/admin-user.component';
import { GestionComponent } from './secundarias/gestion/gestion.component';
import { ReportesComponent } from './secundarias/reportes/reportes.component';
import { PanelControlComponent } from './secundarias/panel-control/panel-control.component';
import { MascotaspublicadasComponent } from './secundarias/mascotaspublicadas/mascotaspublicadas.component';
import { HistorialSolicitudesComponent } from './secundarias/historial-solicitudes/historial-solicitudes.component';
import { ListaMascotasComponent } from './secundarias/lista-mascotas/lista-mascotas.component';
import { ListaProductosComponent } from './secundarias/lista-productos/lista-productos.component';
import { ListaVentasComponent } from './secundarias/lista-ventas/lista-ventas.component';
import { ProductosCategoriaComponent } from './secundarias/productos-categoria/productos-categoria.component';
import { SolicitudesVentaComponent } from './secundarias/solicitudes-venta/solicitudes-venta.component';
import { UsuariosFechaComponent } from './secundarias/usuarios-fecha/usuarios-fecha.component';
import { VentasPordiaComponent } from './secundarias/ventas-pordia/ventas-pordia.component';
import { SignComponent } from './secundarias/sign/sign.component';
import { AdoptaComponent } from './secundarias/adopta/adopta.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MisProductosComponent } from './secundarias/mis-productos/mis-productos.component';
import { ActualizarArticuloComponent } from './secundarias/actualizar-articulo/actualizar-articulo.component';
import { ArticulosFiltradosComponent } from './secundarias/articulos-filtrados/articulos-filtrados.component';
import { DataService } from './data-service.service';


const rutas: Routes = [
 { path: '', component: MainComponent },
 { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-user', component: AdminUserComponent },
  { path: 'gestion', component: GestionComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'panel-control', component: PanelControlComponent },
  { path: 'publicacion-mascotas', component: MascotaspublicadasComponent  },  
  { path: 'solicitudes_venta', component: SolicitudesVentaComponent },  
  { path: 'historial_solicitudes', component: HistorialSolicitudesComponent },  
  { path: 'lista_productos', component: ListaProductosComponent },
  { path: 'lista_ventas', component: ListaVentasComponent },
  { path: 'lista_mascotas', component: ListaVentasComponent },
  { path: 'usuarios_fecha', component: UsuariosFechaComponent },
  { path: 'productos_categoria', component: ProductosCategoriaComponent },
  { path: 'ventas_pordia', component: VentasPordiaComponent },
  { path: 'sign', component: SignComponent },
  { path: 'adopta', component: AdoptaComponent  },
  { path: 'mis_productos', component: MisProductosComponent  },
  { path: 'actualizar_articulo', component: ActualizarArticuloComponent  },
  { path: 'articulos_filtrados', component: ArticulosFiltradosComponent  }
];

@NgModule({
  providers:    [ ArticuloService,NgxNavigationWithDataComponent, DataService],
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(rutas),HttpClientModule,MDBBootstrapModule.forRoot(),ReactiveFormsModule ],
  declarations: [ AppComponent, HeaderComponent, FooterComponent, MainComponent, ProductsComponent, AboutComponent, LoginComponent, ContactComponent, AdminComponent, AdminUserComponent, GestionComponent, ReportesComponent, PanelControlComponent, MascotaspublicadasComponent, HistorialSolicitudesComponent, ListaMascotasComponent, ListaProductosComponent, ListaVentasComponent, ProductosCategoriaComponent, SolicitudesVentaComponent, UsuariosFechaComponent, VentasPordiaComponent, SignComponent, AdoptaComponent, MisProductosComponent, ActualizarArticuloComponent, ArticulosFiltradosComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
