import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BartersListComponent } from './barters-list.component';

describe('BartersListComponent', () => {
  let component: BartersListComponent;
  let fixture: ComponentFixture<BartersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BartersListComponent]
    });
    fixture = TestBed.createComponent(BartersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
