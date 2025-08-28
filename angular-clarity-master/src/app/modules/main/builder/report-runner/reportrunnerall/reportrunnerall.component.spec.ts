import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportrunnerallComponent } from './reportrunnerall.component';

describe('ReportrunnerallComponent', () => {
  let component: ReportrunnerallComponent;
  let fixture: ComponentFixture<ReportrunnerallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportrunnerallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportrunnerallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
