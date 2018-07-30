import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGallery4Component } from './photo-gallery-4.component';

describe('PhotoGallery4Component', () => {
  let component: PhotoGallery4Component;
  let fixture: ComponentFixture<PhotoGallery4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGallery4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGallery4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
