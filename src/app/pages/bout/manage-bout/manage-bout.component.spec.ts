import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoutComponent } from './manage-bout.component';

describe('ManageBoutComponent', () => {
  let component: ManageBoutComponent;
  let fixture: ComponentFixture<ManageBoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
