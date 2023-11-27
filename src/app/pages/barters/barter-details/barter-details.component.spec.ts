import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarterDetailsComponent } from './barter-details.component';

describe('BarterDetailsComponent', () => {
  let component: BarterDetailsComponent;
  let fixture: ComponentFixture<BarterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarterDetailsComponent]
    });
    fixture = TestBed.createComponent(BarterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
