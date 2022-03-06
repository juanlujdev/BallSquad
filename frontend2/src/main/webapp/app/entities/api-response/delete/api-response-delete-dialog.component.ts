import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IApiResponse } from '../api-response.model';
import { ApiResponseService } from '../service/api-response.service';

@Component({
  templateUrl: './api-response-delete-dialog.component.html',
})
export class ApiResponseDeleteDialogComponent {
  apiResponse?: IApiResponse;

  constructor(protected apiResponseService: ApiResponseService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.apiResponseService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
