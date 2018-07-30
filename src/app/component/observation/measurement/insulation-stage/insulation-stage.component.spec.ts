import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulationStageComponent } from './insulation-stage.component';

describe('InsulationStageComponent', () => {
  let component: InsulationStageComponent;
  let fixture: ComponentFixture<InsulationStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulationStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
