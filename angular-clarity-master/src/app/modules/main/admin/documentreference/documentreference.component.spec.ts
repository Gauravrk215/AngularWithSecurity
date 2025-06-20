import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentreferenceComponent } from './documentreference.component';

describe('DocumentreferenceComponent', () => {
  let component: DocumentreferenceComponent;
  let fixture: ComponentFixture<DocumentreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentreferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
