import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reportrunneredit2Component } from './reportrunneredit2.component';

describe('Reportrunneredit2Component', () => {
  let component: Reportrunneredit2Component;
  let fixture: ComponentFixture<Reportrunneredit2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reportrunneredit2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Reportrunneredit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
