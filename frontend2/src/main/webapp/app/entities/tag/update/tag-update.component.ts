import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITag, Tag } from '../tag.model';
import { TagService } from '../service/tag.service';
import { IPet } from 'app/entities/pet/pet.model';
import { PetService } from 'app/entities/pet/service/pet.service';

@Component({
  selector: 'jhi-tag-update',
  templateUrl: './tag-update.component.html',
})
export class TagUpdateComponent implements OnInit {
  isSaving = false;

  petsSharedCollection: IPet[] = [];

  editForm = this.fb.group({
    id: [],
    tagId: [],
    name: [],
    pet: [],
  });

  constructor(
    protected tagService: TagService,
    protected petService: PetService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tag }) => {
      this.updateForm(tag);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tag = this.createFromForm();
    if (tag.id !== undefined) {
      this.subscribeToSaveResponse(this.tagService.update(tag));
    } else {
      this.subscribeToSaveResponse(this.tagService.create(tag));
    }
  }

  trackPetById(index: number, item: IPet): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITag>>): void {
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

  protected updateForm(tag: ITag): void {
    this.editForm.patchValue({
      id: tag.id,
      tagId: tag.tagId,
      name: tag.name,
      pet: tag.pet,
    });

    this.petsSharedCollection = this.petService.addPetToCollectionIfMissing(this.petsSharedCollection, tag.pet);
  }

  protected loadRelationshipsOptions(): void {
    this.petService
      .query()
      .pipe(map((res: HttpResponse<IPet[]>) => res.body ?? []))
      .pipe(map((pets: IPet[]) => this.petService.addPetToCollectionIfMissing(pets, this.editForm.get('pet')!.value)))
      .subscribe((pets: IPet[]) => (this.petsSharedCollection = pets));
  }

  protected createFromForm(): ITag {
    return {
      ...new Tag(),
      id: this.editForm.get(['id'])!.value,
      tagId: this.editForm.get(['tagId'])!.value,
      name: this.editForm.get(['name'])!.value,
      pet: this.editForm.get(['pet'])!.value,
    };
  }
}
