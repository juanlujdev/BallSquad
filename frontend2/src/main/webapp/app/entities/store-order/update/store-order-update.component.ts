import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IStoreOrder, StoreOrder } from '../store-order.model';
import { StoreOrderService } from '../service/store-order.service';
import { IPet } from 'app/entities/pet/pet.model';
import { PetService } from 'app/entities/pet/service/pet.service';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

@Component({
  selector: 'jhi-store-order-update',
  templateUrl: './store-order-update.component.html',
})
export class StoreOrderUpdateComponent implements OnInit {
  isSaving = false;
  orderStatusValues = Object.keys(OrderStatus);

  petsSharedCollection: IPet[] = [];

  editForm = this.fb.group({
    id: [],
    orderId: [],
    quantity: [],
    shipDate: [],
    status: [],
    complete: [],
    petId: [],
  });

  constructor(
    protected storeOrderService: StoreOrderService,
    protected petService: PetService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ storeOrder }) => {
      if (storeOrder.id === undefined) {
        const today = dayjs().startOf('day');
        storeOrder.shipDate = today;
      }

      this.updateForm(storeOrder);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const storeOrder = this.createFromForm();
    if (storeOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.storeOrderService.update(storeOrder));
    } else {
      this.subscribeToSaveResponse(this.storeOrderService.create(storeOrder));
    }
  }

  trackPetById(index: number, item: IPet): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStoreOrder>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(storeOrder: IStoreOrder): void {
    this.editForm.patchValue({
      id: storeOrder.id,
      orderId: storeOrder.orderId,
      quantity: storeOrder.quantity,
      shipDate: storeOrder.shipDate ? storeOrder.shipDate.format(DATE_TIME_FORMAT) : null,
      status: storeOrder.status,
      complete: storeOrder.complete,
      petId: storeOrder.petId,
    });

    this.petsSharedCollection = this.petService.addPetToCollectionIfMissing(this.petsSharedCollection, storeOrder.petId);
  }

  protected loadRelationshipsOptions(): void {
    this.petService
      .query()
      .pipe(map((res: HttpResponse<IPet[]>) => res.body ?? []))
      .pipe(map((pets: IPet[]) => this.petService.addPetToCollectionIfMissing(pets, this.editForm.get('petId')!.value)))
      .subscribe((pets: IPet[]) => (this.petsSharedCollection = pets));
  }

  protected createFromForm(): IStoreOrder {
    return {
      ...new StoreOrder(),
      id: this.editForm.get(['id'])!.value,
      orderId: this.editForm.get(['orderId'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      shipDate: this.editForm.get(['shipDate'])!.value ? dayjs(this.editForm.get(['shipDate'])!.value, DATE_TIME_FORMAT) : undefined,
      status: this.editForm.get(['status'])!.value,
      complete: this.editForm.get(['complete'])!.value,
      petId: this.editForm.get(['petId'])!.value,
    };
  }
}
