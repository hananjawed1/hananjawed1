import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPrivateDocumentsComponent } from './print-private-documents.component';

describe('PrintPrivateDocumentsComponent', () => {
  let component: PrintPrivateDocumentsComponent;
  let fixture: ComponentFixture<PrintPrivateDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPrivateDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPrivateDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
