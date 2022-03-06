import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhotoUrl } from '../photo-url.model';

@Component({
  selector: 'jhi-photo-url-detail',
  templateUrl: './photo-url-detail.component.html',
})
export class PhotoUrlDetailComponent implements OnInit {
  photoUrl: IPhotoUrl | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ photoUrl }) => {
      this.photoUrl = photoUrl;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
