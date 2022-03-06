import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ApiResponseComponent } from './list/api-response.component';
import { ApiResponseDetailComponent } from './detail/api-response-detail.component';
import { ApiResponseUpdateComponent } from './update/api-response-update.component';
import { ApiResponseDeleteDialogComponent } from './delete/api-response-delete-dialog.component';
import { ApiResponseRoutingModule } from './route/api-response-routing.module';

@NgModule({
  imports: [SharedModule, ApiResponseRoutingModule],
  declarations: [ApiResponseComponent, ApiResponseDetailComponent, ApiResponseUpdateComponent, ApiResponseDeleteDialogComponent],
  entryComponents: [ApiResponseDeleteDialogComponent],
})
export class ApiResponseModule {}
