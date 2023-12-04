import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BartersCreateComponent } from './barters-create.component';

describe('BartersCreateComponent', () => {
  let component: BartersCreateComponent;
  let fixture: ComponentFixture<BartersCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BartersCreateComponent]
    });
    fixture = TestBed.createComponent(BartersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
