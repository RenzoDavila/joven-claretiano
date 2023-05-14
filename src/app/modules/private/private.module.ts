import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogVerComponent } from './components/blog/blog-ver/blog-ver.component';
import { BlogCrearEditarComponent } from './components/blog/blog-crear-editar/blog-crear-editar.component';
import { UsuarioVerComponent } from './components/usuario/usuario-ver/usuario-ver.component';
import { UsuarioCrearEditarComponent } from './components/usuario/usuario-crear-editar/usuario-crear-editar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BlogVerComponent,
    BlogCrearEditarComponent,
    UsuarioVerComponent,
    UsuarioCrearEditarComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class PrivateModule { }
