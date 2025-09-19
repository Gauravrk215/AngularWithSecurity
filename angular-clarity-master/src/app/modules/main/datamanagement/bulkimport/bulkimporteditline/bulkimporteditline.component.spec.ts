import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkimporteditlineComponent } from './bulkimporteditline.component';

describe('BulkimporteditlineComponent', () => {
  let component: BulkimporteditlineComponent;
  let fixture: ComponentFixture<BulkimporteditlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkimporteditlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkimporteditlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
