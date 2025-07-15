import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewdashComponent } from './addnewdash.component';

describe('AddnewdashComponent', () => {
  let component: AddnewdashComponent;
  let fixture: ComponentFixture<AddnewdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewdashComponent]
    });
    fixture = TestBed.createComponent(AddnewdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
