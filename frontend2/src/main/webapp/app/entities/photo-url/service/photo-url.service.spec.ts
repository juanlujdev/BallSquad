import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPhotoUrl, PhotoUrl } from '../photo-url.model';

import { PhotoUrlService } from './photo-url.service';

describe('PhotoUrl Service', () => {
  let service: PhotoUrlService;
  let httpMock: HttpTestingController;
  let elemDefault: IPhotoUrl;
  let expectedResult: IPhotoUrl | IPhotoUrl[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PhotoUrlService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      url: 'AAAAAAA',
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

    it('should create a PhotoUrl', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PhotoUrl()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PhotoUrl', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          url: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PhotoUrl', () => {
      const patchObject = Object.assign({}, new PhotoUrl());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PhotoUrl', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          url: 'BBBBBB',
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

    it('should delete a PhotoUrl', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPhotoUrlToCollectionIfMissing', () => {
      it('should add a PhotoUrl to an empty array', () => {
        const photoUrl: IPhotoUrl = { id: 123 };
        expectedResult = service.addPhotoUrlToCollectionIfMissing([], photoUrl);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(photoUrl);
      });

      it('should not add a PhotoUrl to an array that contains it', () => {
        const photoUrl: IPhotoUrl = { id: 123 };
        const photoUrlCollection: IPhotoUrl[] = [
          {
            ...photoUrl,
          },
          { id: 456 },
        ];
        expectedResult = service.addPhotoUrlToCollectionIfMissing(photoUrlCollection, photoUrl);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PhotoUrl to an array that doesn't contain it", () => {
        const photoUrl: IPhotoUrl = { id: 123 };
        const photoUrlCollection: IPhotoUrl[] = [{ id: 456 }];
        expectedResult = service.addPhotoUrlToCollectionIfMissing(photoUrlCollection, photoUrl);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(photoUrl);
      });

      it('should add only unique PhotoUrl to an array', () => {
        const photoUrlArray: IPhotoUrl[] = [{ id: 123 }, { id: 456 }, { id: 82170 }];
        const photoUrlCollection: IPhotoUrl[] = [{ id: 123 }];
        expectedResult = service.addPhotoUrlToCollectionIfMissing(photoUrlCollection, ...photoUrlArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const photoUrl: IPhotoUrl = { id: 123 };
        const photoUrl2: IPhotoUrl = { id: 456 };
        expectedResult = service.addPhotoUrlToCollectionIfMissing([], photoUrl, photoUrl2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(photoUrl);
        expect(expectedResult).toContain(photoUrl2);
      });

      it('should accept null and undefined values', () => {
        const photoUrl: IPhotoUrl = { id: 123 };
        expectedResult = service.addPhotoUrlToCollectionIfMissing([], null, photoUrl, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(photoUrl);
      });

      it('should return initial array if no PhotoUrl is added', () => {
        const photoUrlCollection: IPhotoUrl[] = [{ id: 123 }];
        expectedResult = service.addPhotoUrlToCollectionIfMissing(photoUrlCollection, undefined, null);
        expect(expectedResult).toEqual(photoUrlCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
