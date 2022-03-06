import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApiResponseDetailComponent } from './api-response-detail.component';

describe('ApiResponse Management Detail Component', () => {
  let comp: ApiResponseDetailComponent;
  let fixture: ComponentFixture<ApiResponseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiResponseDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ apiResponse: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ApiResponseDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ApiResponseDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load apiResponse on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.apiResponse).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
