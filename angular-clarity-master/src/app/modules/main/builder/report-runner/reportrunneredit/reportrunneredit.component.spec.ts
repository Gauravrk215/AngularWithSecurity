import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportrunnereditComponent } from './reportrunneredit.component';

describe('ReportrunnereditComponent', () => {
  let component: ReportrunnereditComponent;
  let fixture: ComponentFixture<ReportrunnereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportrunnereditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportrunnereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
