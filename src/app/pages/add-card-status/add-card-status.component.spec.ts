import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardStatusComponent } from './add-card-status.component';

describe('AddCardStatusComponent', () => {
  let component: AddCardStatusComponent;
  let fixture: ComponentFixture<AddCardStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCardStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
