import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarRunnerComponent } from './bar-runner.component';

describe('BarRunnerComponent', () => {
  let component: BarRunnerComponent;
  let fixture: ComponentFixture<BarRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
