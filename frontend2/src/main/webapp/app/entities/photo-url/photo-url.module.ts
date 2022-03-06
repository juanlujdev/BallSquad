import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PhotoUrlComponent } from './list/photo-url.component';
import { PhotoUrlDetailComponent } from './detail/photo-url-detail.component';
import { PhotoUrlUpdateComponent } from './update/photo-url-update.component';
import { PhotoUrlDeleteDialogComponent } from './delete/photo-url-delete-dialog.component';
import { PhotoUrlRoutingModule } from './route/photo-url-routing.module';

@NgModule({
  imports: [SharedModule, PhotoUrlRoutingModule],
  declarations: [PhotoUrlComponent, PhotoUrlDetailComponent, PhotoUrlUpdateComponent, PhotoUrlDeleteDialogComponent],
  entryComponents: [PhotoUrlDeleteDialogComponent],
})
export class PhotoUrlModule {}
