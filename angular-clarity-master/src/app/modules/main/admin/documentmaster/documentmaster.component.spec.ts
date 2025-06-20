import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentmasterComponent } from './documentmaster.component';

describe('DocumentmasterComponent', () => {
  let component: DocumentmasterComponent;
  let fixture: ComponentFixture<DocumentmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
