import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IApiResponse, ApiResponse } from '../api-response.model';
import { ApiResponseService } from '../service/api-response.service';

@Injectable({ providedIn: 'root' })
export class ApiResponseRoutingResolveService implements Resolve<IApiResponse> {
  constructor(protected service: ApiResponseService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApiResponse> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((apiResponse: HttpResponse<ApiResponse>) => {
          if (apiResponse.body) {
            return of(apiResponse.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ApiResponse());
  }
}
