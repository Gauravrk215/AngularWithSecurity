import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoChartComponent } from './to-do-chart.component';

describe('ToDoChartComponent', () => {
  let component: ToDoChartComponent;
  let fixture: ComponentFixture<ToDoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
