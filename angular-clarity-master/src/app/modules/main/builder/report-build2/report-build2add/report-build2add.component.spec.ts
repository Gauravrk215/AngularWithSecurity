import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBuild2addComponent } from './report-build2add.component';

describe('ReportBuild2addComponent', () => {
  let component: ReportBuild2addComponent;
  let fixture: ComponentFixture<ReportBuild2addComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBuild2addComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBuild2addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
