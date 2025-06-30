import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumaintanceComponent } from './menumaintance.component';

describe('MenumaintanceComponent', () => {
  let component: MenumaintanceComponent;
  let fixture: ComponentFixture<MenumaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenumaintanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
