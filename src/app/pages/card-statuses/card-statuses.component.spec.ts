import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatusesComponent } from './card-statuses.component';

describe('CardStatusesComponent', () => {
  let component: CardStatusesComponent;
  let fixture: ComponentFixture<CardStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
