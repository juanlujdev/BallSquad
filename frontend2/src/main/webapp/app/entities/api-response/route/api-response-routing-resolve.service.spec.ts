import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IApiResponse, ApiResponse } from '../api-response.model';
import { ApiResponseService } from '../service/api-response.service';

import { ApiResponseRoutingResolveService } from './api-response-routing-resolve.service';

describe('ApiResponse routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ApiResponseRoutingResolveService;
  let service: ApiResponseService;
  let resultApiResponse: IApiResponse | undefined;

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
    routingResolveService = TestBed.inject(ApiResponseRoutingResolveService);
    service = TestBed.inject(ApiResponseService);
    resultApiResponse = undefined;
  });

  describe('resolve', () => {
    it('should return IApiResponse returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultApiResponse = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultApiResponse).toEqual({ id: 123 });
    });

    it('should return new IApiResponse if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultApiResponse = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultApiResponse).toEqual(new ApiResponse());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ApiResponse })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultApiResponse = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultApiResponse).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
