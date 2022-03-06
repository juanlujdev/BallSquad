import { IUser } from 'app/entities/user/user.model';
import { IAddress } from 'app/entities/address/address.model';

export interface ICustomer {
  id?: number;
  customerId?: number | null;
  username?: IUser | null;
  addresses?: IAddress[] | null;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public customerId?: number | null,
    public username?: IUser | null,
    public addresses?: IAddress[] | null
  ) {}
}

export function getCustomerIdentifier(customer: ICustomer): number | undefined {
  return customer.id;
}
