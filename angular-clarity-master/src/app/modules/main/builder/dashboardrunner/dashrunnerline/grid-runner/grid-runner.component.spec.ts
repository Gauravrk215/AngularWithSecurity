import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRunnerComponent } from './grid-runner.component';

describe('GridRunnerComponent', () => {
  let component: GridRunnerComponent;
  let fixture: ComponentFixture<GridRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
