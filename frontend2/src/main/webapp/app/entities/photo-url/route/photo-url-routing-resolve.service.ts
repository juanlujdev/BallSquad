import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPhotoUrl, PhotoUrl } from '../photo-url.model';
import { PhotoUrlService } from '../service/photo-url.service';

@Injectable({ providedIn: 'root' })
export class PhotoUrlRoutingResolveService implements Resolve<IPhotoUrl> {
  constructor(protected service: PhotoUrlService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPhotoUrl> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((photoUrl: HttpResponse<PhotoUrl>) => {
          if (photoUrl.body) {
            return of(photoUrl.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PhotoUrl());
  }
}
