import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPhotoUrl } from '../photo-url.model';
import { PhotoUrlService } from '../service/photo-url.service';

@Component({
  templateUrl: './photo-url-delete-dialog.component.html',
})
export class PhotoUrlDeleteDialogComponent {
  photoUrl?: IPhotoUrl;

  constructor(protected photoUrlService: PhotoUrlService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.photoUrlService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
