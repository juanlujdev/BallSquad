import { IPet } from 'app/entities/pet/pet.model';

export interface ICategory {
  id?: number;
  categoryId?: number | null;
  name?: string | null;
  pets?: IPet[] | null;
}

export class Category implements ICategory {
  constructor(public id?: number, public categoryId?: number | null, public name?: string | null, public pets?: IPet[] | null) {}
}

export function getCategoryIdentifier(category: ICategory): number | undefined {
  return category.id;
}
