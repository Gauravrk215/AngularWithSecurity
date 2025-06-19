import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesstypeComponent } from './accesstype.component';

describe('AccesstypeComponent', () => {
  let component: AccesstypeComponent;
  let fixture: ComponentFixture<AccesstypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesstypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
