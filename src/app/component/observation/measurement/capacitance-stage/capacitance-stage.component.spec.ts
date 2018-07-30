import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitanceStageComponent } from './capacitance-stage.component';

describe('CapacitanceStageComponent', () => {
  let component: CapacitanceStageComponent;
  let fixture: ComponentFixture<CapacitanceStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacitanceStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitanceStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
