import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBuildComponent } from './report-build.component';

describe('ReportBuildComponent', () => {
  let component: ReportBuildComponent;
  let fixture: ComponentFixture<ReportBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
