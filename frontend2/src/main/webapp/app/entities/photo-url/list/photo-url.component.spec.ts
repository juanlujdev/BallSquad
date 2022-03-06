import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PhotoUrlService } from '../service/photo-url.service';

import { PhotoUrlComponent } from './photo-url.component';

describe('PhotoUrl Management Component', () => {
  let comp: PhotoUrlComponent;
  let fixture: ComponentFixture<PhotoUrlComponent>;
  let service: PhotoUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PhotoUrlComponent],
    })
      .overrideTemplate(PhotoUrlComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PhotoUrlComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PhotoUrlService);

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
    expect(comp.photoUrls?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
