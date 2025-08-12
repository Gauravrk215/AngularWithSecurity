import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutRunnerComponent } from './doughnut-runner.component';

describe('DoughnutRunnerComponent', () => {
  let component: DoughnutRunnerComponent;
  let fixture: ComponentFixture<DoughnutRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
