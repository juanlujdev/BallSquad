import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApiResponse } from '../api-response.model';

@Component({
  selector: 'jhi-api-response-detail',
  templateUrl: './api-response-detail.component.html',
})
export class ApiResponseDetailComponent implements OnInit {
  apiResponse: IApiResponse | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ apiResponse }) => {
      this.apiResponse = apiResponse;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
