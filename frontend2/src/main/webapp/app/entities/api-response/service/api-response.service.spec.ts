import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IApiResponse, ApiResponse } from '../api-response.model';

import { ApiResponseService } from './api-response.service';

describe('ApiResponse Service', () => {
  let service: ApiResponseService;
  let httpMock: HttpTestingController;
  let elemDefault: IApiResponse;
  let expectedResult: IApiResponse | IApiResponse[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ApiResponseService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      code: 0,
      type: 'AAAAAAA',
      message: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ApiResponse', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ApiResponse()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ApiResponse', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          code: 1,
          type: 'BBBBBB',
          message: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ApiResponse', () => {
      const patchObject = Object.assign(
        {
          code: 1,
        },
        new ApiResponse()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ApiResponse', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          code: 1,
          type: 'BBBBBB',
          message: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ApiResponse', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addApiResponseToCollectionIfMissing', () => {
      it('should add a ApiResponse to an empty array', () => {
        const apiResponse: IApiResponse = { id: 123 };
        expectedResult = service.addApiResponseToCollectionIfMissing([], apiResponse);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(apiResponse);
      });

      it('should not add a ApiResponse to an array that contains it', () => {
        const apiResponse: IApiResponse = { id: 123 };
        const apiResponseCollection: IApiResponse[] = [
          {
            ...apiResponse,
          },
          { id: 456 },
        ];
        expectedResult = service.addApiResponseToCollectionIfMissing(apiResponseCollection, apiResponse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ApiResponse to an array that doesn't contain it", () => {
        const apiResponse: IApiResponse = { id: 123 };
        const apiResponseCollection: IApiResponse[] = [{ id: 456 }];
        expectedResult = service.addApiResponseToCollectionIfMissing(apiResponseCollection, apiResponse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apiResponse);
      });

      it('should add only unique ApiResponse to an array', () => {
        const apiResponseArray: IApiResponse[] = [{ id: 123 }, { id: 456 }, { id: 19502 }];
        const apiResponseCollection: IApiResponse[] = [{ id: 123 }];
        expectedResult = service.addApiResponseToCollectionIfMissing(apiResponseCollection, ...apiResponseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const apiResponse: IApiResponse = { id: 123 };
        const apiResponse2: IApiResponse = { id: 456 };
        expectedResult = service.addApiResponseToCollectionIfMissing([], apiResponse, apiResponse2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apiResponse);
        expect(expectedResult).toContain(apiResponse2);
      });

      it('should accept null and undefined values', () => {
        const apiResponse: IApiResponse = { id: 123 };
        expectedResult = service.addApiResponseToCollectionIfMissing([], null, apiResponse, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(apiResponse);
      });

      it('should return initial array if no ApiResponse is added', () => {
        const apiResponseCollection: IApiResponse[] = [{ id: 123 }];
        expectedResult = service.addApiResponseToCollectionIfMissing(apiResponseCollection, undefined, null);
        expect(expectedResult).toEqual(apiResponseCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
