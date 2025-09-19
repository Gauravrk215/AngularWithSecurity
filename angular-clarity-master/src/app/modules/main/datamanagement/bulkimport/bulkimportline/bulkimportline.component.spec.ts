import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkimportlineComponent } from './bulkimportline.component';

describe('BulkimportlineComponent', () => {
  let component: BulkimportlineComponent;
  let fixture: ComponentFixture<BulkimportlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkimportlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkimportlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
