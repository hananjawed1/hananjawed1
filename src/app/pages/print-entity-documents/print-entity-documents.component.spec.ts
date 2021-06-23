import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEntityDocumentsComponent } from './print-entity-documents.component';

describe('PrintEntityDocumentsComponent', () => {
  let component: PrintEntityDocumentsComponent;
  let fixture: ComponentFixture<PrintEntityDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintEntityDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintEntityDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
