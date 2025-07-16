import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformnewdashComponent } from './editformnewdash.component';

describe('EditformnewdashComponent', () => {
  let component: EditformnewdashComponent;
  let fixture: ComponentFixture<EditformnewdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditformnewdashComponent]
    });
    fixture = TestBed.createComponent(EditformnewdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
