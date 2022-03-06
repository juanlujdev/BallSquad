import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStoreOrder, getStoreOrderIdentifier } from '../store-order.model';

export type EntityResponseType = HttpResponse<IStoreOrder>;
export type EntityArrayResponseType = HttpResponse<IStoreOrder[]>;

@Injectable({ providedIn: 'root' })
export class StoreOrderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/store-orders');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(storeOrder: IStoreOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(storeOrder);
    return this.http
      .post<IStoreOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(storeOrder: IStoreOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(storeOrder);
    return this.http
      .put<IStoreOrder>(`${this.resourceUrl}/${getStoreOrderIdentifier(storeOrder) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(storeOrder: IStoreOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(storeOrder);
    return this.http
      .patch<IStoreOrder>(`${this.resourceUrl}/${getStoreOrderIdentifier(storeOrder) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStoreOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStoreOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStoreOrderToCollectionIfMissing(
    storeOrderCollection: IStoreOrder[],
    ...storeOrdersToCheck: (IStoreOrder | null | undefined)[]
  ): IStoreOrder[] {
    const storeOrders: IStoreOrder[] = storeOrdersToCheck.filter(isPresent);
    if (storeOrders.length > 0) {
      const storeOrderCollectionIdentifiers = storeOrderCollection.map(storeOrderItem => getStoreOrderIdentifier(storeOrderItem)!);
      const storeOrdersToAdd = storeOrders.filter(storeOrderItem => {
        const storeOrderIdentifier = getStoreOrderIdentifier(storeOrderItem);
        if (storeOrderIdentifier == null || storeOrderCollectionIdentifiers.includes(storeOrderIdentifier)) {
          return false;
        }
        storeOrderCollectionIdentifiers.push(storeOrderIdentifier);
        return true;
      });
      return [...storeOrdersToAdd, ...storeOrderCollection];
    }
    return storeOrderCollection;
  }

  protected convertDateFromClient(storeOrder: IStoreOrder): IStoreOrder {
    return Object.assign({}, storeOrder, {
      shipDate: storeOrder.shipDate?.isValid() ? storeOrder.shipDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.shipDate = res.body.shipDate ? dayjs(res.body.shipDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((storeOrder: IStoreOrder) => {
        storeOrder.shipDate = storeOrder.shipDate ? dayjs(storeOrder.shipDate) : undefined;
      });
    }
    return res;
  }
}
