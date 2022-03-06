import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPhotoUrl, PhotoUrl } from '../photo-url.model';
import { PhotoUrlService } from '../service/photo-url.service';

import { PhotoUrlRoutingResolveService } from './photo-url-routing-resolve.service';

describe('PhotoUrl routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PhotoUrlRoutingResolveService;
  let service: PhotoUrlService;
  let resultPhotoUrl: IPhotoUrl | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(PhotoUrlRoutingResolveService);
    service = TestBed.inject(PhotoUrlService);
    resultPhotoUrl = undefined;
  });

  describe('resolve', () => {
    it('should return IPhotoUrl returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPhotoUrl = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPhotoUrl).toEqual({ id: 123 });
    });

    it('should return new IPhotoUrl if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPhotoUrl = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPhotoUrl).toEqual(new PhotoUrl());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PhotoUrl })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPhotoUrl = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPhotoUrl).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
