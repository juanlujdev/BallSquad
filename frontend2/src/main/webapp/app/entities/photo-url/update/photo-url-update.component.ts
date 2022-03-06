import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPhotoUrl, PhotoUrl } from '../photo-url.model';
import { PhotoUrlService } from '../service/photo-url.service';
import { IPet } from 'app/entities/pet/pet.model';
import { PetService } from 'app/entities/pet/service/pet.service';

@Component({
  selector: 'jhi-photo-url-update',
  templateUrl: './photo-url-update.component.html',
})
export class PhotoUrlUpdateComponent implements OnInit {
  isSaving = false;

  petsSharedCollection: IPet[] = [];

  editForm = this.fb.group({
    id: [],
    url: [],
    pet: [],
  });

  constructor(
    protected photoUrlService: PhotoUrlService,
    protected petService: PetService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ photoUrl }) => {
      this.updateForm(photoUrl);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const photoUrl = this.createFromForm();
    if (photoUrl.id !== undefined) {
      this.subscribeToSaveResponse(this.photoUrlService.update(photoUrl));
    } else {
      this.subscribeToSaveResponse(this.photoUrlService.create(photoUrl));
    }
  }

  trackPetById(index: number, item: IPet): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhotoUrl>>): void {
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

  protected updateForm(photoUrl: IPhotoUrl): void {
    this.editForm.patchValue({
      id: photoUrl.id,
      url: photoUrl.url,
      pet: photoUrl.pet,
    });

    this.petsSharedCollection = this.petService.addPetToCollectionIfMissing(this.petsSharedCollection, photoUrl.pet);
  }

  protected loadRelationshipsOptions(): void {
    this.petService
      .query()
      .pipe(map((res: HttpResponse<IPet[]>) => res.body ?? []))
      .pipe(map((pets: IPet[]) => this.petService.addPetToCollectionIfMissing(pets, this.editForm.get('pet')!.value)))
      .subscribe((pets: IPet[]) => (this.petsSharedCollection = pets));
  }

  protected createFromForm(): IPhotoUrl {
    return {
      ...new PhotoUrl(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      pet: this.editForm.get(['pet'])!.value,
    };
  }
}
