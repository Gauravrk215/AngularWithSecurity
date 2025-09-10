import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupiconComponent } from './setupicon.component';

describe('SetupiconComponent', () => {
  let component: SetupiconComponent;
  let fixture: ComponentFixture<SetupiconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupiconComponent]
    });
    fixture = TestBed.createComponent(SetupiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
