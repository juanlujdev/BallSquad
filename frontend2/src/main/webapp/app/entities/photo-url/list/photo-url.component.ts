import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPhotoUrl } from '../photo-url.model';
import { PhotoUrlService } from '../service/photo-url.service';
import { PhotoUrlDeleteDialogComponent } from '../delete/photo-url-delete-dialog.component';

@Component({
  selector: 'jhi-photo-url',
  templateUrl: './photo-url.component.html',
})
export class PhotoUrlComponent implements OnInit {
  photoUrls?: IPhotoUrl[];
  isLoading = false;

  constructor(protected photoUrlService: PhotoUrlService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.photoUrlService.query().subscribe({
      next: (res: HttpResponse<IPhotoUrl[]>) => {
        this.isLoading = false;
        this.photoUrls = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPhotoUrl): number {
    return item.id!;
  }

  delete(photoUrl: IPhotoUrl): void {
    const modalRef = this.modalService.open(PhotoUrlDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.photoUrl = photoUrl;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
