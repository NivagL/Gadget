import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitorBankInspectionComponent } from './capacitor-bank-inspection.component';

describe('CapacitorBankInspectionComponent', () => {
  let component: CapacitorBankInspectionComponent;
  let fixture: ComponentFixture<CapacitorBankInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacitorBankInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitorBankInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
