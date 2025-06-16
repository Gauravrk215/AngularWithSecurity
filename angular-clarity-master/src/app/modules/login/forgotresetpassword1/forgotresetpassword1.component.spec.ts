import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgotresetpassword1Component } from './forgotresetpassword1.component';

describe('Forgotresetpassword1Component', () => {
  let component: Forgotresetpassword1Component;
  let fixture: ComponentFixture<Forgotresetpassword1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Forgotresetpassword1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Forgotresetpassword1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
