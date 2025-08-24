import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbuildqueryComponent } from './reportbuildquery.component';

describe('ReportbuildqueryComponent', () => {
  let component: ReportbuildqueryComponent;
  let fixture: ComponentFixture<ReportbuildqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportbuildqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbuildqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
