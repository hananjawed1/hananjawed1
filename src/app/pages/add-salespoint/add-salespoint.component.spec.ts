import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalespointComponent } from './add-salespoint.component';

describe('AddSalespointComponent', () => {
  let component: AddSalespointComponent;
  let fixture: ComponentFixture<AddSalespointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalespointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalespointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
