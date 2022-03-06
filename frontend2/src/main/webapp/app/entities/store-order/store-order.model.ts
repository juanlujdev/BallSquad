import dayjs from 'dayjs/esm';
import { IPet } from 'app/entities/pet/pet.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

export interface IStoreOrder {
  id?: number;
  orderId?: number | null;
  quantity?: number | null;
  shipDate?: dayjs.Dayjs | null;
  status?: OrderStatus | null;
  complete?: boolean | null;
  petId?: IPet | null;
}

export class StoreOrder implements IStoreOrder {
  constructor(
    public id?: number,
    public orderId?: number | null,
    public quantity?: number | null,
    public shipDate?: dayjs.Dayjs | null,
    public status?: OrderStatus | null,
    public complete?: boolean | null,
    public petId?: IPet | null
  ) {
    this.complete = this.complete ?? false;
  }
}

export function getStoreOrderIdentifier(storeOrder: IStoreOrder): number | undefined {
  return storeOrder.id;
}
