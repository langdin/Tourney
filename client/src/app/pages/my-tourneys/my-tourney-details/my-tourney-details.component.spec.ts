import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTourneyDetailsComponent } from './my-tourney-details.component';

describe('MyTourneyDetailsComponent', () => {
  let component: MyTourneyDetailsComponent;
  let fixture: ComponentFixture<MyTourneyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTourneyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTourneyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
