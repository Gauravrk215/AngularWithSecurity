import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamananementworkflowComponent } from './datamananementworkflow.component';

describe('DatamananementworkflowComponent', () => {
  let component: DatamananementworkflowComponent;
  let fixture: ComponentFixture<DatamananementworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatamananementworkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamananementworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
