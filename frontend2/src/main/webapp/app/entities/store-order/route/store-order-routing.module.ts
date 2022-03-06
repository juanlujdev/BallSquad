import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StoreOrderComponent } from '../list/store-order.component';
import { StoreOrderDetailComponent } from '../detail/store-order-detail.component';
import { StoreOrderUpdateComponent } from '../update/store-order-update.component';
import { StoreOrderRoutingResolveService } from './store-order-routing-resolve.service';

const storeOrderRoute: Routes = [
  {
    path: '',
    component: StoreOrderComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StoreOrderDetailComponent,
    resolve: {
      storeOrder: StoreOrderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StoreOrderUpdateComponent,
    resolve: {
      storeOrder: StoreOrderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StoreOrderUpdateComponent,
    resolve: {
      storeOrder: StoreOrderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(storeOrderRoute)],
  exports: [RouterModule],
})
export class StoreOrderRoutingModule {}
