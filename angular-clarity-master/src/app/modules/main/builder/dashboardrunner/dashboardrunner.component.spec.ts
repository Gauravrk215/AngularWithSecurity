import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardrunnerComponent } from './dashboardrunner.component';

describe('DashboardrunnerComponent', () => {
  let component: DashboardrunnerComponent;
  let fixture: ComponentFixture<DashboardrunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardrunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardrunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
