import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyworkspaceComponent } from './myworkspace.component';

describe('MyworkspaceComponent', () => {
  let component: MyworkspaceComponent;
  let fixture: ComponentFixture<MyworkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyworkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyworkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
