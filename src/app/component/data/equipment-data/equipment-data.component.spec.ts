import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDataComponent } from './equipment-data.component';

describe('EquipmentComponent', () => {
  let component: EquipmentDataComponent;
  let fixture: ComponentFixture<EquipmentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
