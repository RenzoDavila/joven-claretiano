import { TestBed } from '@angular/core/testing';

import { TagCrudService } from './tag-crud.service';

describe('TagCrudService', () => {
  let service: TagCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
