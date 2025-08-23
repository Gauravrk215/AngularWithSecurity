import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbuildallComponent } from './reportbuildall.component';

describe('ReportbuildallComponent', () => {
  let component: ReportbuildallComponent;
  let fixture: ComponentFixture<ReportbuildallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportbuildallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbuildallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
