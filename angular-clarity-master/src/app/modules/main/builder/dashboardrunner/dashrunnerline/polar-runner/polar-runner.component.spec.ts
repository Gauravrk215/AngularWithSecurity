import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarRunnerComponent } from './polar-runner.component';

describe('PolarRunnerComponent', () => {
  let component: PolarRunnerComponent;
  let fixture: ComponentFixture<PolarRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
