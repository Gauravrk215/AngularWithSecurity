import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbuildaddComponent } from './reportbuildadd.component';

describe('ReportbuildaddComponent', () => {
  let component: ReportbuildaddComponent;
  let fixture: ComponentFixture<ReportbuildaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportbuildaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbuildaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
