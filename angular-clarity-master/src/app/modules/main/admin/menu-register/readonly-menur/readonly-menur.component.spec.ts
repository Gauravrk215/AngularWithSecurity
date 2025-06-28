import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyMenurComponent } from './readonly-menur.component';

describe('ReadonlyMenurComponent', () => {
  let component: ReadonlyMenurComponent;
  let fixture: ComponentFixture<ReadonlyMenurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadonlyMenurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyMenurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
