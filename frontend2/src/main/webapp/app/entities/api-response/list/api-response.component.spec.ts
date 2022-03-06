import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ApiResponseService } from '../service/api-response.service';

import { ApiResponseComponent } from './api-response.component';

describe('ApiResponse Management Component', () => {
  let comp: ApiResponseComponent;
  let fixture: ComponentFixture<ApiResponseComponent>;
  let service: ApiResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApiResponseComponent],
    })
      .overrideTemplate(ApiResponseComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApiResponseComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ApiResponseService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.apiResponses?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
