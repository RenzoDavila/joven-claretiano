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
import { PaginationComponent } from './components/pagination/pagination.component';
import { TagCrearEditarComponent } from './components/tag/tag-crear-editar/tag-crear-editar.component';
import { TagVerComponent } from './components/tag/tag-ver/tag-ver.component';



@NgModule({
  declarations: [
    BlogVerComponent,
    BlogCrearEditarComponent,
    UsuarioVerComponent,
    UsuarioCrearEditarComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    PaginationComponent,
    TagCrearEditarComponent,
    TagVerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    PaginationComponent
  ]
})
export class PrivateModule { }
