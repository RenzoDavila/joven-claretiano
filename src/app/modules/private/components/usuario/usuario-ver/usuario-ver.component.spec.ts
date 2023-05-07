import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioVerComponent } from './usuario-ver.component';

describe('UsuarioVerComponent', () => {
  let component: UsuarioVerComponent;
  let fixture: ComponentFixture<UsuarioVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioVerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
