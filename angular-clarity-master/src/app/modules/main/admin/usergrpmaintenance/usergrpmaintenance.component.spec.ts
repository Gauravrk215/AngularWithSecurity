import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergrpmaintenanceComponent } from './usergrpmaintenance.component';

describe('UsergrpmaintenanceComponent', () => {
  let component: UsergrpmaintenanceComponent;
  let fixture: ComponentFixture<UsergrpmaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergrpmaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergrpmaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
