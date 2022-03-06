import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IApiResponse, ApiResponse } from '../api-response.model';
import { ApiResponseService } from '../service/api-response.service';

@Component({
  selector: 'jhi-api-response-update',
  templateUrl: './api-response-update.component.html',
})
export class ApiResponseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    type: [],
    message: [],
  });

  constructor(protected apiResponseService: ApiResponseService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ apiResponse }) => {
      this.updateForm(apiResponse);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const apiResponse = this.createFromForm();
    if (apiResponse.id !== undefined) {
      this.subscribeToSaveResponse(this.apiResponseService.update(apiResponse));
    } else {
      this.subscribeToSaveResponse(this.apiResponseService.create(apiResponse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApiResponse>>): void {
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

  protected updateForm(apiResponse: IApiResponse): void {
    this.editForm.patchValue({
      id: apiResponse.id,
      code: apiResponse.code,
      type: apiResponse.type,
      message: apiResponse.message,
    });
  }

  protected createFromForm(): IApiResponse {
    return {
      ...new ApiResponse(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      type: this.editForm.get(['type'])!.value,
      message: this.editForm.get(['message'])!.value,
    };
  }
}
