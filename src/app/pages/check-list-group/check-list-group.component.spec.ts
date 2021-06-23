import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListGroupComponent } from './check-list-group.component';

describe('CheckListGroupComponent', () => {
  let component: CheckListGroupComponent;
  let fixture: ComponentFixture<CheckListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
