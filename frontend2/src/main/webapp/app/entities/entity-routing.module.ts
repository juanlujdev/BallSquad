import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'store-order',
        data: { pageTitle: 'StoreOrders' },
        loadChildren: () => import('./store-order/store-order.module').then(m => m.StoreOrderModule),
      },
      {
        path: 'customer',
        data: { pageTitle: 'Customers' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'address',
        data: { pageTitle: 'Addresses' },
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: 'category',
        data: { pageTitle: 'Categories' },
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'tag',
        data: { pageTitle: 'Tags' },
        loadChildren: () => import('./tag/tag.module').then(m => m.TagModule),
      },
      {
        path: 'pet',
        data: { pageTitle: 'Pets' },
        loadChildren: () => import('./pet/pet.module').then(m => m.PetModule),
      },
      {
        path: 'photo-url',
        data: { pageTitle: 'PhotoUrls' },
        loadChildren: () => import('./photo-url/photo-url.module').then(m => m.PhotoUrlModule),
      },
      {
        path: 'api-response',
        data: { pageTitle: 'ApiResponses' },
        loadChildren: () => import('./api-response/api-response.module').then(m => m.ApiResponseModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
