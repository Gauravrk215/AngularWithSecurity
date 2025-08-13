import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRunnerComponent } from './line-runner.component';

describe('LineRunnerComponent', () => {
  let component: LineRunnerComponent;
  let fixture: ComponentFixture<LineRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
