import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashrunnerallComponent } from './dashrunnerall.component';

describe('DashrunnerallComponent', () => {
  let component: DashrunnerallComponent;
  let fixture: ComponentFixture<DashrunnerallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashrunnerallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashrunnerallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
