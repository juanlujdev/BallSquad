import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStoreOrder } from '../store-order.model';

@Component({
  selector: 'jhi-store-order-detail',
  templateUrl: './store-order-detail.component.html',
})
export class StoreOrderDetailComponent implements OnInit {
  storeOrder: IStoreOrder | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ storeOrder }) => {
      this.storeOrder = storeOrder;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
