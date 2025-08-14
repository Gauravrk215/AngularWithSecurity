import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieRunnerComponent } from './pie-runner.component';

describe('PieRunnerComponent', () => {
  let component: PieRunnerComponent;
  let fixture: ComponentFixture<PieRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
