import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMenurComponent } from './all-menur.component';

describe('AllMenurComponent', () => {
  let component: AllMenurComponent;
  let fixture: ComponentFixture<AllMenurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMenurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMenurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
