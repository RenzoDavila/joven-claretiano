import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './modules/public/components/contact/contact.component';
import { HomeComponent } from './modules/public/components/home/home.component';
import { BlogComponent } from './modules/public/components/blog/blog.component';
import { BlogPostComponent } from './modules/public/components/blog-post/blog-post.component';
import { AboutComponent } from './modules/public/components/about/about.component';
import { BlogVerComponent } from './modules/private/components/blog/blog-ver/blog-ver.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioVerComponent } from './modules/private/components/usuario/usuario-ver/usuario-ver.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-post/:id', component: BlogPostComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  // {
  //   path: 'page',
  //   children: [
  //   ]
  // },
  {
    path: 'dashboard',
    children: [
      { path: 'blogs', component: BlogVerComponent},
      { path: 'users', component: UsuarioVerComponent},
      { path: '**', redirectTo: 'blogs', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
