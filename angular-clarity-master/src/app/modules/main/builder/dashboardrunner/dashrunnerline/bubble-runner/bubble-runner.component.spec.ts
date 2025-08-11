import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleRunnerComponent } from './bubble-runner.component';

describe('BubbleRunnerComponent', () => {
  let component: BubbleRunnerComponent;
  let fixture: ComponentFixture<BubbleRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
