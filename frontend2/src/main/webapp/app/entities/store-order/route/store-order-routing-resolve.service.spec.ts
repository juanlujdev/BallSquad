import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IStoreOrder, StoreOrder } from '../store-order.model';
import { StoreOrderService } from '../service/store-order.service';

import { StoreOrderRoutingResolveService } from './store-order-routing-resolve.service';

describe('StoreOrder routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StoreOrderRoutingResolveService;
  let service: StoreOrderService;
  let resultStoreOrder: IStoreOrder | undefined;

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
    routingResolveService = TestBed.inject(StoreOrderRoutingResolveService);
    service = TestBed.inject(StoreOrderService);
    resultStoreOrder = undefined;
  });

  describe('resolve', () => {
    it('should return IStoreOrder returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStoreOrder = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStoreOrder).toEqual({ id: 123 });
    });

    it('should return new IStoreOrder if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStoreOrder = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStoreOrder).toEqual(new StoreOrder());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as StoreOrder })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStoreOrder = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStoreOrder).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
