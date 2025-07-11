import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermaintanceComponent } from './usermaintance.component';

describe('UsermaintanceComponent', () => {
  let component: UsermaintanceComponent;
  let fixture: ComponentFixture<UsermaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermaintanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
