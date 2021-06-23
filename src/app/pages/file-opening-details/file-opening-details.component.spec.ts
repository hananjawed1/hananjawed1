import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOpeningDetailsComponent } from './file-opening-details.component';

describe('FileOpeningDetailsComponent', () => {
  let component: FileOpeningDetailsComponent;
  let fixture: ComponentFixture<FileOpeningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileOpeningDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOpeningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
