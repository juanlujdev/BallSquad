import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStoreOrder } from '../store-order.model';
import { StoreOrderService } from '../service/store-order.service';

@Component({
  templateUrl: './store-order-delete-dialog.component.html',
})
export class StoreOrderDeleteDialogComponent {
  storeOrder?: IStoreOrder;

  constructor(protected storeOrderService: StoreOrderService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.storeOrderService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
