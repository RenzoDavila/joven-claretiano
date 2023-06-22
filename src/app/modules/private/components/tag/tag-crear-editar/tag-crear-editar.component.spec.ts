import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCrearEditarComponent } from './tag-crear-editar.component';

describe('TagCrearEditarComponent', () => {
  let component: TagCrearEditarComponent;
  let fixture: ComponentFixture<TagCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCrearEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
