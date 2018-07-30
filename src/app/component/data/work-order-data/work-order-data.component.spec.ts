import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderDataComponent } from './work-order-data.component';

describe('WorkOrderDataModelComponent', () => {
  let component: WorkOrderDataComponent;
  let fixture: ComponentFixture<WorkOrderDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
