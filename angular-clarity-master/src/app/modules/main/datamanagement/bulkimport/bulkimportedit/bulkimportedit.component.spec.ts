import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkimporteditComponent } from './bulkimportedit.component';

describe('BulkimporteditComponent', () => {
  let component: BulkimporteditComponent;
  let fixture: ComponentFixture<BulkimporteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkimporteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkimporteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
