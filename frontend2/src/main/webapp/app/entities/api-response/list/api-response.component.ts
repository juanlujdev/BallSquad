import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IApiResponse } from '../api-response.model';
import { ApiResponseService } from '../service/api-response.service';
import { ApiResponseDeleteDialogComponent } from '../delete/api-response-delete-dialog.component';

@Component({
  selector: 'jhi-api-response',
  templateUrl: './api-response.component.html',
})
export class ApiResponseComponent implements OnInit {
  apiResponses?: IApiResponse[];
  isLoading = false;

  constructor(protected apiResponseService: ApiResponseService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.apiResponseService.query().subscribe({
      next: (res: HttpResponse<IApiResponse[]>) => {
        this.isLoading = false;
        this.apiResponses = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IApiResponse): number {
    return item.id!;
  }

  delete(apiResponse: IApiResponse): void {
    const modalRef = this.modalService.open(ApiResponseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.apiResponse = apiResponse;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
