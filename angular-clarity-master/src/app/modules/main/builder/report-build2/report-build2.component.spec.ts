import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBuild2Component } from './report-build2.component';

describe('ReportBuild2Component', () => {
  let component: ReportBuild2Component;
  let fixture: ComponentFixture<ReportBuild2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBuild2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBuild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
