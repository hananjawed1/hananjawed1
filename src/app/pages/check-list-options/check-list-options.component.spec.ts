import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListOptionsComponent } from './check-list-options.component';

describe('CheckListOptionsComponent', () => {
  let component: CheckListOptionsComponent;
  let fixture: ComponentFixture<CheckListOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
