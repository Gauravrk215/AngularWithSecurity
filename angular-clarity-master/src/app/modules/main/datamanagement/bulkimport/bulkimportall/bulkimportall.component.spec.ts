import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkimportallComponent } from './bulkimportall.component';

describe('BulkimportallComponent', () => {
  let component: BulkimportallComponent;
  let fixture: ComponentFixture<BulkimportallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkimportallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkimportallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
