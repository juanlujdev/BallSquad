import { IPet } from 'app/entities/pet/pet.model';

export interface ITag {
  id?: number;
  tagId?: number | null;
  name?: string | null;
  pet?: IPet | null;
}

export class Tag implements ITag {
  constructor(public id?: number, public tagId?: number | null, public name?: string | null, public pet?: IPet | null) {}
}

export function getTagIdentifier(tag: ITag): number | undefined {
  return tag.id;
}
