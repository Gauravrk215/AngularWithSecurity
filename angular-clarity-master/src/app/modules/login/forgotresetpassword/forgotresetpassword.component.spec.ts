import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotresetpasswordComponent } from './forgotresetpassword.component';

describe('ForgotresetpasswordComponent', () => {
  let component: ForgotresetpasswordComponent;
  let fixture: ComponentFixture<ForgotresetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotresetpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
