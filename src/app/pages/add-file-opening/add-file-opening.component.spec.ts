import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileOpeningComponent } from './add-file-opening.component';

describe('AddFileOpeningComponent', () => {
  let component: AddFileOpeningComponent;
  let fixture: ComponentFixture<AddFileOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFileOpeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
