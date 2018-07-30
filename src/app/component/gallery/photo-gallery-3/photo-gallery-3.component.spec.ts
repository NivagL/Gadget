import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGallery3Component } from './photo-gallery-3.component';

describe('PhotoGallery3Component', () => {
  let component: PhotoGallery3Component;
  let fixture: ComponentFixture<PhotoGallery3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGallery3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGallery3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
