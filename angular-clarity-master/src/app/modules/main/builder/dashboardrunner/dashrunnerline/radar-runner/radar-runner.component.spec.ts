import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarRunnerComponent } from './radar-runner.component';

describe('RadarRunnerComponent', () => {
  let component: RadarRunnerComponent;
  let fixture: ComponentFixture<RadarRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
