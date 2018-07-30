import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCompleteComponent } from './activity-complete.component';

describe('ActivityCompleteComponent', () => {
  let component: ActivityCompleteComponent;
  let fixture: ComponentFixture<ActivityCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
