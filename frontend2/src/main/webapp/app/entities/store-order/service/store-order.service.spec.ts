import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { IStoreOrder, StoreOrder } from '../store-order.model';

import { StoreOrderService } from './store-order.service';

describe('StoreOrder Service', () => {
  let service: StoreOrderService;
  let httpMock: HttpTestingController;
  let elemDefault: IStoreOrder;
  let expectedResult: IStoreOrder | IStoreOrder[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StoreOrderService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      orderId: 0,
      quantity: 0,
      shipDate: currentDate,
      status: OrderStatus.PLACED,
      complete: false,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          shipDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a StoreOrder', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          shipDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          shipDate: currentDate,
        },
        returnedFromService
      );

      service.create(new StoreOrder()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StoreOrder', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          orderId: 1,
          quantity: 1,
          shipDate: currentDate.format(DATE_TIME_FORMAT),
          status: 'BBBBBB',
          complete: true,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          shipDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StoreOrder', () => {
      const patchObject = Object.assign(
        {
          orderId: 1,
          quantity: 1,
          shipDate: currentDate.format(DATE_TIME_FORMAT),
          status: 'BBBBBB',
          complete: true,
        },
        new StoreOrder()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          shipDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StoreOrder', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          orderId: 1,
          quantity: 1,
          shipDate: currentDate.format(DATE_TIME_FORMAT),
          status: 'BBBBBB',
          complete: true,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          shipDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a StoreOrder', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addStoreOrderToCollectionIfMissing', () => {
      it('should add a StoreOrder to an empty array', () => {
        const storeOrder: IStoreOrder = { id: 123 };
        expectedResult = service.addStoreOrderToCollectionIfMissing([], storeOrder);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(storeOrder);
      });

      it('should not add a StoreOrder to an array that contains it', () => {
        const storeOrder: IStoreOrder = { id: 123 };
        const storeOrderCollection: IStoreOrder[] = [
          {
            ...storeOrder,
          },
          { id: 456 },
        ];
        expectedResult = service.addStoreOrderToCollectionIfMissing(storeOrderCollection, storeOrder);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StoreOrder to an array that doesn't contain it", () => {
        const storeOrder: IStoreOrder = { id: 123 };
        const storeOrderCollection: IStoreOrder[] = [{ id: 456 }];
        expectedResult = service.addStoreOrderToCollectionIfMissing(storeOrderCollection, storeOrder);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(storeOrder);
      });

      it('should add only unique StoreOrder to an array', () => {
        const storeOrderArray: IStoreOrder[] = [{ id: 123 }, { id: 456 }, { id: 54266 }];
        const storeOrderCollection: IStoreOrder[] = [{ id: 123 }];
        expectedResult = service.addStoreOrderToCollectionIfMissing(storeOrderCollection, ...storeOrderArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const storeOrder: IStoreOrder = { id: 123 };
        const storeOrder2: IStoreOrder = { id: 456 };
        expectedResult = service.addStoreOrderToCollectionIfMissing([], storeOrder, storeOrder2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(storeOrder);
        expect(expectedResult).toContain(storeOrder2);
      });

      it('should accept null and undefined values', () => {
        const storeOrder: IStoreOrder = { id: 123 };
        expectedResult = service.addStoreOrderToCollectionIfMissing([], null, storeOrder, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(storeOrder);
      });

      it('should return initial array if no StoreOrder is added', () => {
        const storeOrderCollection: IStoreOrder[] = [{ id: 123 }];
        expectedResult = service.addStoreOrderToCollectionIfMissing(storeOrderCollection, undefined, null);
        expect(expectedResult).toEqual(storeOrderCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
