import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkimportaddComponent } from './bulkimportadd.component';

describe('BulkimportaddComponent', () => {
  let component: BulkimportaddComponent;
  let fixture: ComponentFixture<BulkimportaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkimportaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkimportaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
