import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTourneysComponent } from './my-tourneys.component';

describe('MyTourneysComponent', () => {
  let component: MyTourneysComponent;
  let fixture: ComponentFixture<MyTourneysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTourneysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
