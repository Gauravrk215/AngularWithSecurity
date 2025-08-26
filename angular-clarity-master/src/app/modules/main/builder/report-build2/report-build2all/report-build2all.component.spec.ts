import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBuild2allComponent } from './report-build2all.component';

describe('ReportBuild2allComponent', () => {
  let component: ReportBuild2allComponent;
  let fixture: ComponentFixture<ReportBuild2allComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBuild2allComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBuild2allComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
