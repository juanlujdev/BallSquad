import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ApiResponseComponent } from '../list/api-response.component';
import { ApiResponseDetailComponent } from '../detail/api-response-detail.component';
import { ApiResponseUpdateComponent } from '../update/api-response-update.component';
import { ApiResponseRoutingResolveService } from './api-response-routing-resolve.service';

const apiResponseRoute: Routes = [
  {
    path: '',
    component: ApiResponseComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ApiResponseDetailComponent,
    resolve: {
      apiResponse: ApiResponseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ApiResponseUpdateComponent,
    resolve: {
      apiResponse: ApiResponseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ApiResponseUpdateComponent,
    resolve: {
      apiResponse: ApiResponseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(apiResponseRoute)],
  exports: [RouterModule],
})
export class ApiResponseRoutingModule {}
