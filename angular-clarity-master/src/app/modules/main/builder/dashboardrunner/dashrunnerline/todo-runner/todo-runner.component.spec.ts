import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRunnerComponent } from './todo-runner.component';

describe('TodoRunnerComponent', () => {
  let component: TodoRunnerComponent;
  let fixture: ComponentFixture<TodoRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
