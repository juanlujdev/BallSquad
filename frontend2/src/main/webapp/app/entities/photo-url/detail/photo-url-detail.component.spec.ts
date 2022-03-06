import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PhotoUrlDetailComponent } from './photo-url-detail.component';

describe('PhotoUrl Management Detail Component', () => {
  let comp: PhotoUrlDetailComponent;
  let fixture: ComponentFixture<PhotoUrlDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoUrlDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ photoUrl: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PhotoUrlDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PhotoUrlDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load photoUrl on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.photoUrl).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
