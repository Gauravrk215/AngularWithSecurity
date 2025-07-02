import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionloggerComponent } from './sessionlogger.component';

describe('SessionloggerComponent', () => {
  let component: SessionloggerComponent;
  let fixture: ComponentFixture<SessionloggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionloggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionloggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
