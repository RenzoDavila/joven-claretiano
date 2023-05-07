import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCrearEditarComponent } from './blog-crear-editar.component';

describe('BlogCrearEditarComponent', () => {
  let component: BlogCrearEditarComponent;
  let fixture: ComponentFixture<BlogCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCrearEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
