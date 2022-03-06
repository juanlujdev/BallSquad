import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StoreOrderComponent } from './list/store-order.component';
import { StoreOrderDetailComponent } from './detail/store-order-detail.component';
import { StoreOrderUpdateComponent } from './update/store-order-update.component';
import { StoreOrderDeleteDialogComponent } from './delete/store-order-delete-dialog.component';
import { StoreOrderRoutingModule } from './route/store-order-routing.module';

@NgModule({
  imports: [SharedModule, StoreOrderRoutingModule],
  declarations: [StoreOrderComponent, StoreOrderDetailComponent, StoreOrderUpdateComponent, StoreOrderDeleteDialogComponent],
  entryComponents: [StoreOrderDeleteDialogComponent],
})
export class StoreOrderModule {}
