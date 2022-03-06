import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPet, getPetIdentifier } from '../pet.model';
import { Pet } from '../../../../../../../build/openapi/model/pet';

export type EntityResponseType = HttpResponse<IPet>;
export type EntityArrayResponseType = HttpResponse<IPet[]>;

@Injectable({ providedIn: 'root' })
export class PetService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  //Method add for me
//   public getAllTasks(){
//     const path='http://localhost:8080/v3/';
//     return this.http.get<Pet[]>(path);
// } /Api/Product?shop=Carmen
   personalMethod(): Observable<EntityResponseType> {
     return this.http.get<IPet>("http://localhost:9000/v3/pet", { observe: 'response' });
   }


  create(pet?: IPet): Observable<EntityResponseType> {
    return this.http.post<IPet>(this.resourceUrl, pet, { observe: 'response' });
  }

  update(pet: IPet): Observable<EntityResponseType> {
    return this.http.put<IPet>(`${this.resourceUrl}/${getPetIdentifier(pet) as number}`, pet, { observe: 'response' });
  }

  partialUpdate(pet: IPet): Observable<EntityResponseType> {
    return this.http.patch<IPet>(`${this.resourceUrl}/${getPetIdentifier(pet) as number}`, pet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPetToCollectionIfMissing(petCollection: IPet[], ...petsToCheck: (IPet | null | undefined)[]): IPet[] {
    const pets: IPet[] = petsToCheck.filter(isPresent);
    if (pets.length > 0) {
      const petCollectionIdentifiers = petCollection.map(petItem => getPetIdentifier(petItem)!);
      const petsToAdd = pets.filter(petItem => {
        const petIdentifier = getPetIdentifier(petItem);
        if (petIdentifier == null || petCollectionIdentifiers.includes(petIdentifier)) {
          return false;
        }
        petCollectionIdentifiers.push(petIdentifier);
        return true;
      });
      return [...petsToAdd, ...petCollection];
    }
    return petCollection;
  }
}
