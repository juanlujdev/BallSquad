import { ICustomer } from 'app/entities/customer/customer.model';

export interface IAddress {
  id?: number;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  customer?: ICustomer | null;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public street?: string | null,
    public city?: string | null,
    public state?: string | null,
    public zip?: string | null,
    public customer?: ICustomer | null
  ) {}
}

export function getAddressIdentifier(address: IAddress): number | undefined {
  return address.id;
}
