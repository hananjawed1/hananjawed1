import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPointUserComponent } from './sales-point-user.component';

describe('SalesPointUserComponent', () => {
  let component: SalesPointUserComponent;
  let fixture: ComponentFixture<SalesPointUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPointUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPointUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
