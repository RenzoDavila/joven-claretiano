import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './modules/public/components/contact/contact.component';
import { HomeComponent } from './modules/public/components/home/home.component';
import { BlogComponent } from './modules/public/components/blog/blog.component';
import { BlogPostComponent } from './modules/public/components/blog-post/blog-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-post/:id', component: BlogPostComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
