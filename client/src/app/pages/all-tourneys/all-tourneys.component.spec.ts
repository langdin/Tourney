import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTourneysComponent } from './all-tourneys.component';

describe('AllTourneysComponent', () => {
  let component: AllTourneysComponent;
  let fixture: ComponentFixture<AllTourneysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTourneysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
