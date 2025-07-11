import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermaintanceaddComponent } from './usermaintanceadd.component';

describe('UsermaintanceaddComponent', () => {
  let component: UsermaintanceaddComponent;
  let fixture: ComponentFixture<UsermaintanceaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermaintanceaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermaintanceaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
