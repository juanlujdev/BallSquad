import { IPet } from 'app/entities/pet/pet.model';

export interface IPhotoUrl {
  id?: number;
  url?: string | null;
  pet?: IPet | null;
}

export class PhotoUrl implements IPhotoUrl {
  constructor(public id?: number, public url?: string | null, public pet?: IPet | null) {}
}

export function getPhotoUrlIdentifier(photoUrl: IPhotoUrl): number | undefined {
  return photoUrl.id;
}
