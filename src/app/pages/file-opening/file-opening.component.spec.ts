import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOpeningComponent } from './file-opening.component';

describe('FileOpeningComponent', () => {
  let component: FileOpeningComponent;
  let fixture: ComponentFixture<FileOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileOpeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
