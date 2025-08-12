import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashrunnerlineComponent } from './dashrunnerline.component';

describe('DashrunnerlineComponent', () => {
  let component: DashrunnerlineComponent;
  let fixture: ComponentFixture<DashrunnerlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashrunnerlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashrunnerlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
