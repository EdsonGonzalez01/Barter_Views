import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BartersComponent } from './barters.component';

describe('BartersComponent', () => {
  let component: BartersComponent;
  let fixture: ComponentFixture<BartersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BartersComponent]
    });
    fixture = TestBed.createComponent(BartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
