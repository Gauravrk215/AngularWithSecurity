import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterRunnerComponent } from './scatter-runner.component';

describe('ScatterRunnerComponent', () => {
  let component: ScatterRunnerComponent;
  let fixture: ComponentFixture<ScatterRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
