import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackListComponent } from './work-pack-list.component';

describe('WorkPackListComponent', () => {
  let component: WorkPackListComponent;
  let fixture: ComponentFixture<WorkPackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
