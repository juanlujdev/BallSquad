import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiResponse, getApiResponseIdentifier } from '../api-response.model';

export type EntityResponseType = HttpResponse<IApiResponse>;
export type EntityArrayResponseType = HttpResponse<IApiResponse[]>;

@Injectable({ providedIn: 'root' })
export class ApiResponseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-responses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiResponse: IApiResponse): Observable<EntityResponseType> {
    return this.http.post<IApiResponse>(this.resourceUrl, apiResponse, { observe: 'response' });
  }

  update(apiResponse: IApiResponse): Observable<EntityResponseType> {
    return this.http.put<IApiResponse>(`${this.resourceUrl}/${getApiResponseIdentifier(apiResponse) as number}`, apiResponse, {
      observe: 'response',
    });
  }

  partialUpdate(apiResponse: IApiResponse): Observable<EntityResponseType> {
    return this.http.patch<IApiResponse>(`${this.resourceUrl}/${getApiResponseIdentifier(apiResponse) as number}`, apiResponse, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IApiResponse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiResponse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApiResponseToCollectionIfMissing(
    apiResponseCollection: IApiResponse[],
    ...apiResponsesToCheck: (IApiResponse | null | undefined)[]
  ): IApiResponse[] {
    const apiResponses: IApiResponse[] = apiResponsesToCheck.filter(isPresent);
    if (apiResponses.length > 0) {
      const apiResponseCollectionIdentifiers = apiResponseCollection.map(apiResponseItem => getApiResponseIdentifier(apiResponseItem)!);
      const apiResponsesToAdd = apiResponses.filter(apiResponseItem => {
        const apiResponseIdentifier = getApiResponseIdentifier(apiResponseItem);
        if (apiResponseIdentifier == null || apiResponseCollectionIdentifiers.includes(apiResponseIdentifier)) {
          return false;
        }
        apiResponseCollectionIdentifiers.push(apiResponseIdentifier);
        return true;
      });
      return [...apiResponsesToAdd, ...apiResponseCollection];
    }
    return apiResponseCollection;
  }
}
