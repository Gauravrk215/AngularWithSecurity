import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuaccesscontrolComponent } from './menuaccesscontrol.component';

describe('MenuaccesscontrolComponent', () => {
  let component: MenuaccesscontrolComponent;
  let fixture: ComponentFixture<MenuaccesscontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuaccesscontrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuaccesscontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
