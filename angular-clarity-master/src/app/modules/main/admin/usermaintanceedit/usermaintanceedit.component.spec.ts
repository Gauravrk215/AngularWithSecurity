import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermaintanceeditComponent } from './usermaintanceedit.component';

describe('UsermaintanceeditComponent', () => {
  let component: UsermaintanceeditComponent;
  let fixture: ComponentFixture<UsermaintanceeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermaintanceeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermaintanceeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
