import { IStoreOrder } from 'app/entities/store-order/store-order.model';
import { Category, ICategory } from 'app/entities/category/category.model';
import { ITag, Tag } from 'app/entities/tag/tag.model';
import { IPhotoUrl } from 'app/entities/photo-url/photo-url.model';
import { PetStatus } from 'app/entities/enumerations/pet-status.model';

export interface IPet {
  id?: number;
  name?: string;
  //category?: ICategory | null;
  category?: Category;
  //photoUrls?: IPhotoUrl[];
  photoUrls?: Array<string>;
  //tags?: ITag[] | null;
  tags?: Array<Tag>;
  //petId?: number | null;
  //storeOrders?: IStoreOrder[] | null;
  //petStatus?: PetStatus | null;
  status?: Pet.StatusEnum ;
}

export class Pet implements IPet {
  constructor(
    public id?: number,
    public name?: string,
    public category?:Category,
    public photoUrls?: Array<string>,
    public tags?: Array<Tag>,
    public status?: Pet.StatusEnum,
    //public petId?: number | null,
    //public storeOrders?: IStoreOrder[] | null,
  ) {}
}

export function getPetIdentifier(pet: IPet): number | undefined {
  return pet.id;
}
//J.Lujan 05/03/22
export namespace Pet {
  export type StatusEnum = 'available' | 'pending' | 'sold';
  export const StatusEnum = {
      Available: 'available' as StatusEnum,
      Pending: 'pending' as StatusEnum,
      Sold: 'sold' as StatusEnum
  };
}

