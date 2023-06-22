import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagVerComponent } from './tag-ver.component';

describe('TagVerComponent', () => {
  let component: TagVerComponent;
  let fixture: ComponentFixture<TagVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagVerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
