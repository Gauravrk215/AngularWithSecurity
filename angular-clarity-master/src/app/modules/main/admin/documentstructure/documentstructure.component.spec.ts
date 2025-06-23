import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentstructureComponent } from './documentstructure.component';

describe('DocumentstructureComponent', () => {
  let component: DocumentstructureComponent;
  let fixture: ComponentFixture<DocumentstructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentstructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
