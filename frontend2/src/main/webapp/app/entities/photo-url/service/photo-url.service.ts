import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPhotoUrl, getPhotoUrlIdentifier } from '../photo-url.model';

export type EntityResponseType = HttpResponse<IPhotoUrl>;
export type EntityArrayResponseType = HttpResponse<IPhotoUrl[]>;

@Injectable({ providedIn: 'root' })
export class PhotoUrlService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/photo-urls');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(photoUrl: IPhotoUrl): Observable<EntityResponseType> {
    return this.http.post<IPhotoUrl>(this.resourceUrl, photoUrl, { observe: 'response' });
  }

  update(photoUrl: IPhotoUrl): Observable<EntityResponseType> {
    return this.http.put<IPhotoUrl>(`${this.resourceUrl}/${getPhotoUrlIdentifier(photoUrl) as number}`, photoUrl, { observe: 'response' });
  }

  partialUpdate(photoUrl: IPhotoUrl): Observable<EntityResponseType> {
    return this.http.patch<IPhotoUrl>(`${this.resourceUrl}/${getPhotoUrlIdentifier(photoUrl) as number}`, photoUrl, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPhotoUrl>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPhotoUrl[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPhotoUrlToCollectionIfMissing(photoUrlCollection: IPhotoUrl[], ...photoUrlsToCheck: (IPhotoUrl | null | undefined)[]): IPhotoUrl[] {
    const photoUrls: IPhotoUrl[] = photoUrlsToCheck.filter(isPresent);
    if (photoUrls.length > 0) {
      const photoUrlCollectionIdentifiers = photoUrlCollection.map(photoUrlItem => getPhotoUrlIdentifier(photoUrlItem)!);
      const photoUrlsToAdd = photoUrls.filter(photoUrlItem => {
        const photoUrlIdentifier = getPhotoUrlIdentifier(photoUrlItem);
        if (photoUrlIdentifier == null || photoUrlCollectionIdentifiers.includes(photoUrlIdentifier)) {
          return false;
        }
        photoUrlCollectionIdentifiers.push(photoUrlIdentifier);
        return true;
      });
      return [...photoUrlsToAdd, ...photoUrlCollection];
    }
    return photoUrlCollection;
  }
}
