import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBuild2editComponent } from './report-build2edit.component';

describe('ReportBuild2editComponent', () => {
  let component: ReportBuild2editComponent;
  let fixture: ComponentFixture<ReportBuild2editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBuild2editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBuild2editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
