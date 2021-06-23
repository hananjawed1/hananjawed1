import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatusDetailComponent } from './card-status-detail.component';

describe('CardStatusDetailComponent', () => {
  let component: CardStatusDetailComponent;
  let fixture: ComponentFixture<CardStatusDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatusDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
