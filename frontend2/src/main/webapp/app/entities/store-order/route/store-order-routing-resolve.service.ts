import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStoreOrder, StoreOrder } from '../store-order.model';
import { StoreOrderService } from '../service/store-order.service';

@Injectable({ providedIn: 'root' })
export class StoreOrderRoutingResolveService implements Resolve<IStoreOrder> {
  constructor(protected service: StoreOrderService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStoreOrder> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((storeOrder: HttpResponse<StoreOrder>) => {
          if (storeOrder.body) {
            return of(storeOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StoreOrder());
  }
}
