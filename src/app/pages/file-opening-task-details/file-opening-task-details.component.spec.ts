import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOpeningTaskDetailsComponent } from './file-opening-task-details.component';

describe('FileOpeningTaskDetailsComponent', () => {
  let component: FileOpeningTaskDetailsComponent;
  let fixture: ComponentFixture<FileOpeningTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileOpeningTaskDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOpeningTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
