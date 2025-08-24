import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbuildeditComponent } from './reportbuildedit.component';

describe('ReportbuildeditComponent', () => {
  let component: ReportbuildeditComponent;
  let fixture: ComponentFixture<ReportbuildeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportbuildeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbuildeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
