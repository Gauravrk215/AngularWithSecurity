import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemparametersComponent } from './systemparameters.component';

describe('SystemparametersComponent', () => {
  let component: SystemparametersComponent;
  let fixture: ComponentFixture<SystemparametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemparametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemparametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
