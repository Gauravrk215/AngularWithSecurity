import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenurComponent } from './add-menur.component';

describe('AddMenurComponent', () => {
  let component: AddMenurComponent;
  let fixture: ComponentFixture<AddMenurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
