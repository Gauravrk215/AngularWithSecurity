import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenurComponent } from './edit-menur.component';

describe('EditMenurComponent', () => {
  let component: EditMenurComponent;
  let fixture: ComponentFixture<EditMenurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMenurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
