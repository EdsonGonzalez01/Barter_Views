import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInterestComponent } from './show-interest.component';

describe('ShowInterestComponent', () => {
  let component: ShowInterestComponent;
  let fixture: ComponentFixture<ShowInterestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowInterestComponent]
    });
    fixture = TestBed.createComponent(ShowInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
