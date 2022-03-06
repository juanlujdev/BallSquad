import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

// jlujan 05/03/22
//import { IPet, Pet } from '../pet.model';
import { Pet } from '../../../../../../../build/openapi';
//import { PetService } from '../service/pet.service';
import { PetService } from '../../../../../../../build/openapi';
//import { ICategory } from 'app/entities/category/category.model';
import { Category } from '../../../../../../../build/openapi';
import { CategoryService } from 'app/entities/category/service/category.service';
//import { CategoryService } from 'app/entities/category/service/category.service';
//import { PetStatus } from 'app/entities/enumerations/pet-status.model';

@Component({
  selector: 'jhi-pet-update',
  templateUrl: './pet-update.component.html',
})
export class PetUpdateComponent implements OnInit {
  isSaving = false;
  statusValues = Object.keys(Pet.StatusEnum);

  categoriesSharedCollection: Category[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    status: [],
    category: [],
    // j.lujan 05/03/22
    photoUrls: this.fb.array([])
    // tags: [],
  });

  constructor(
    protected petService: PetService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pet }) => {
      this.updateForm(pet);
// j.lujan 05/03/22
      //this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pet = this.createFromForm();
    //const pet = new Pet(1, 'demo doge', new Category(1, "Dogs"), ["demo.com"], [], "pending")
    if (pet.id !== undefined) {
      this.subscribeToSaveResponse(this.petService.updatePet(pet));
    } else {
      this.subscribeToSaveResponse(this.petService.addPet(pet));
    }
  }

  trackCategoryById(index: number, item: Category): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Pet>>): void {
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

  protected updateForm(pet: Pet): void {
    this.editForm.patchValue({
      id: pet.id,
      name: pet.name,
      status: pet.status,
      category: pet.category,
      photoUrls: pet.photoUrls
      // j.lujan 05/03/22
      //tags: pet.tags,
    });

// j.lujan 05/03/22
    // this.categoriesSharedCollection = this.categoryService.addCategoryToCollectionIfMissing(this.categoriesSharedCollection, pet.category);
  }
// j.lujan 05/03/22
  // protected loadRelationshipsOptions(): void {
  //   this.categoryService
  //     .query()
  //     .pipe(map((res: HttpResponse<ICategory[]>) => res.body ?? []))
  //     .pipe(
  //       map((categories: ICategory[]) =>
  //         this.categoryService.addCategoryToCollectionIfMissing(categories, this.editForm.get('category')!.value)
  //       )
  //     )
  //     .subscribe((categories: ICategory[]) => (this.categoriesSharedCollection = categories));
  // }

  protected createFromForm(): Pet {
    return {
      ...new Pet(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      status: this.editForm.get(['status'])!.value,
      category: this.editForm.get(['category'])!.value,
      photoUrls: this.editForm.get(['photoUrls'])!.value
      // j.lujan 05/03/22
      //petId: this.editForm.get(['petId'])!.value,
      // tags: this.editForm.get(['tags'])!.value,
      
    };
  }
  
}

