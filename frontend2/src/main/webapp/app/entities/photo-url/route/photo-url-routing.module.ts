import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PhotoUrlComponent } from '../list/photo-url.component';
import { PhotoUrlDetailComponent } from '../detail/photo-url-detail.component';
import { PhotoUrlUpdateComponent } from '../update/photo-url-update.component';
import { PhotoUrlRoutingResolveService } from './photo-url-routing-resolve.service';

const photoUrlRoute: Routes = [
  {
    path: '',
    component: PhotoUrlComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PhotoUrlDetailComponent,
    resolve: {
      photoUrl: PhotoUrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PhotoUrlUpdateComponent,
    resolve: {
      photoUrl: PhotoUrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PhotoUrlUpdateComponent,
    resolve: {
      photoUrl: PhotoUrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(photoUrlRoute)],
  exports: [RouterModule],
})
export class PhotoUrlRoutingModule {}
