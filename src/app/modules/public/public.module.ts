import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './components/content/content.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';



@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    BlogComponent,
    HeaderComponent,
    FooterComponent,
    BlogPostComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ContentComponent
  ]
})
export class PublicModule { }
