import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// j.lujan 06/03/22
//import { IPet, Pet } from '../pet.model';
//import { PetService } from '../service/pet.service';
//import { Pet } from 'build/openapi';
//import { PetService } from 'build/openapi';
import { Pet, PetService } from '../../../../../../../build/openapi';

@Injectable({ providedIn: 'root' })
export class PetRoutingResolveService implements Resolve<Pet> {
  constructor(protected service: PetService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.getPetById(id).pipe(
         mergeMap((pet: HttpResponse<Pet>) => {
          if (pet.body) {
            return of(pet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pet());
  }
}
