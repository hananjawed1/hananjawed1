import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPersonalDocumentsComponent } from './print-personal-documents.component';

describe('PrintPersonalDocumentsComponent', () => {
  let component: PrintPersonalDocumentsComponent;
  let fixture: ComponentFixture<PrintPersonalDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPersonalDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPersonalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
